import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { complaintService } from "../../services/complaint.service";
import { useCurrentUser } from "../../hooks/useAuth";
import { aiSuggestions as baseSuggestions } from "../services/operations-data";
import type {
  ActivityEvent,
  AISuggestion,
  ComplaintItem,
  KPIStat,
} from "../types/operations";

interface RealtimeState {
  complaints: ComplaintItem[];
  kpis: KPIStat[];
  activity: ActivityEvent[];
  aiSuggestions: AISuggestion[];
  lastUpdated: string;
  isLive: boolean;
  isUpdating: boolean;
  assignComplaint: (complaintId: string) => void;
  startComplaint: (complaintId: string) => void;
  resolveComplaint: (complaintId: string) => void;
  activeComplaintId: string | null;
}

function formatRelativeDate(input?: string) {
  if (!input) return "just now";
  const date = new Date(input);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.round(diffMs / 60000));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function extractLocation(description: string) {
  const match = description.match(/^Location:\s*(.+)$/im);
  return match?.[1]?.trim() || "Location pending";
}

function extractCategory(description: string) {
  const match = description.match(/^Category:\s*(.+)$/im);
  return match?.[1]?.trim() || "General";
}

function mapStatus(status: string) {
  switch (status) {
    case "TRIAGED":
      return "Triaged";
    case "ASSIGNED":
      return "Assigned";
    case "IN_PROGRESS":
      return "In Progress";
    case "RESOLVED":
      return "Resolved";
    case "CLOSED":
      return "Closed";
    case "REJECTED":
      return "Rejected";
    default:
      return "New";
  }
}

function mapActivityType(status: string): ActivityEvent["type"] {
  switch (status) {
    case "ASSIGNED":
      return "assigned";
    case "RESOLVED":
    case "CLOSED":
      return "resolved";
    case "TRIAGED":
      return "classified";
    case "REJECTED":
      return "escalated";
    default:
      return "received";
  }
}

export function useRealtimeComplaints(): RealtimeState {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { data, dataUpdatedAt } = useQuery({
    queryKey: ["officer", "complaints"],
    queryFn: () => complaintService.list({ page: 1, limit: 50 }),
    refetchInterval: 15000,
  });

  const statusMutation = useMutation({
    mutationFn: ({ complaintId, payload }: { complaintId: string; payload: Record<string, unknown> }) =>
      complaintService.update(complaintId, payload as never),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["officer", "complaints"] });
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["citizen", "profile"] });
    },
  });

  const complaints = useMemo<ComplaintItem[]>(() => {
    const items = data?.items ?? [];

    return items.map((complaint: any) => {
      const priority = String(complaint.priority || "MEDIUM").toLowerCase();
      const statusHistory = complaint.statusHistory?.[0];

      return {
        id: complaint.id,
        title: complaint.title,
        ward: complaint.department?.name || "General ward",
        location: extractLocation(complaint.description),
        category: extractCategory(complaint.description),
        confidence: Math.min(
          1,
          Math.max(
            0.45,
            Number(complaint.predictions?.[0]?.priorityConfidence || complaint.prediction?.priority_confidence || 75) / 100,
          ),
        ),
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        slaMinutes: Math.max(
          0,
          1440 - Math.round((Date.now() - new Date(complaint.createdAt).getTime()) / 60000),
        ),
        status: mapStatus(complaint.status),
        assignedOfficer: complaint.assignedOfficer?.name || "Unassigned",
        createdAt: formatRelativeDate(complaint.createdAt),
        summary: complaint.description.slice(0, 160),
        aiRecommendation:
          complaint.status === "RESOLVED" || complaint.status === "CLOSED"
            ? "Work completed and ready for citizen confirmation."
            : complaint.department?.name
              ? `Route work through ${complaint.department.name} and keep the citizen updated.`
              : "Assign an officer and route the complaint to the right department.",
        tags: [
          complaint.priority?.toLowerCase?.() || "medium",
          complaint.department?.name?.toLowerCase?.() || "unrouted",
        ],
        comments: statusHistory?.note
          ? [
              {
                id: statusHistory.id,
                author: complaint.assignedOfficer?.name || "Operations Desk",
                message: statusHistory.note,
                createdAt: formatRelativeDate(statusHistory.createdAt),
                type: "note" as const,
              },
            ]
          : [],
      };
    });
  }, [data?.items]);

  const kpis = useMemo<KPIStat[]>(() => {
    const active = complaints.filter((item) => !["Resolved", "Closed", "Rejected"].includes(item.status)).length;
    const highPriority = complaints.filter((item) => ["High", "Critical"].includes(item.priority)).length;
    const slaRisk = complaints.filter((item) => item.slaMinutes <= 180 && !["Resolved", "Closed"].includes(item.status)).length;
    const resolved = complaints.filter((item) => ["Resolved", "Closed"].includes(item.status)).length;
    const escalations = complaints.filter((item) => item.status === "Rejected").length;
    const resolutionRate = complaints.length ? Math.round((resolved / complaints.length) * 100) : 0;

    return [
      { id: "active", label: "Active Complaints", value: active, trend: 0, trendLabel: "live queue", intent: "warning", icon: Activity },
      { id: "priority", label: "High Priority", value: highPriority, trend: 0, trendLabel: "needs attention", intent: "negative", icon: AlertTriangle },
      { id: "sla", label: "SLA Risk Cases", value: slaRisk, trend: 0, trendLabel: "under 3 hours", intent: "warning", icon: Clock },
      { id: "resolved", label: "Resolved", value: resolved, trend: 0, trendLabel: "completed cases", intent: "positive", icon: CheckCircle2 },
      { id: "escalations", label: "Escalations", value: escalations, trend: 0, trendLabel: "rejected cases", intent: "warning", icon: ShieldAlert },
      { id: "resolution", label: "Resolution Rate", value: resolutionRate, unit: "%", trend: 0, trendLabel: "overall closure", intent: "positive", icon: Layers },
    ];
  }, [complaints]);

  const activity = useMemo<ActivityEvent[]>(() => {
    const items = data?.items ?? [];

    return items
      .map((complaint: any) => {
        const latest = complaint.statusHistory?.[0];
        return {
          id: latest?.id || complaint.id,
          type: mapActivityType(complaint.status),
          title: `Complaint ${mapStatus(complaint.status)}`,
          description: latest?.note || complaint.title,
          createdAt: formatRelativeDate(latest?.createdAt || complaint.updatedAt || complaint.createdAt),
          actor: complaint.assignedOfficer?.name || complaint.department?.name || "Citizen Portal",
        };
      })
      .slice(0, 8);
  }, [data?.items]);

  const lastUpdated = dataUpdatedAt ? formatRelativeDate(new Date(dataUpdatedAt).toISOString()) : "just now";

  const assignComplaint = (complaintId: string) => {
    if (!currentUser?.id) return;
    statusMutation.mutate({
      complaintId,
      payload: {
        status: "assigned",
        assignedOfficerId: currentUser.id,
        note: `Assigned to ${currentUser.name || "current officer"}`,
      },
    });
  };

  const startComplaint = (complaintId: string) => {
    statusMutation.mutate({
      complaintId,
      payload: {
        status: "in_progress",
        note: "Officer has started working on this complaint.",
      },
    });
  };

  const resolveComplaint = (complaintId: string) => {
    statusMutation.mutate({
      complaintId,
      payload: {
        status: "resolved",
        note: "Work completed by the assigned officer.",
      },
    });
  };

  return useMemo(
    () => ({
      complaints,
      kpis,
      activity,
      aiSuggestions: baseSuggestions,
      lastUpdated,
      isLive: true,
      isUpdating: statusMutation.isPending,
      assignComplaint,
      startComplaint,
      resolveComplaint,
      activeComplaintId: statusMutation.variables?.complaintId ?? null,
    }),
    [activity, complaints, kpis, lastUpdated, statusMutation.isPending, statusMutation.variables?.complaintId]
  );
}
