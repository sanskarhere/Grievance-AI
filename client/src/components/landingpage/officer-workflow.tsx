import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  UserCircle,
  Clock,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

const taskQueue = [
  {
    id: "CMP-2847",
    title: "Pothole repair on MG Road near City Mall",
    priority: "High",
    department: "PWD",
    location: "Zone A, Sector 12",
    sla: "2h 15m",
    status: "urgent",
    aiSuggestion: "Coordinate with traffic dept for road closure",
  },
  {
    id: "CMP-2846",
    title: "Water supply disruption in Residential Area",
    priority: "Medium",
    department: "Water Supply",
    location: "Zone B, Sector 8",
    sla: "4h 30m",
    status: "normal",
    aiSuggestion: "Schedule maintenance team for inspection",
  },
  {
    id: "CMP-2845",
    title: "Street light malfunction on Park Street",
    priority: "Low",
    department: "Electricity",
    location: "Zone C, Sector 5",
    sla: "8h 45m",
    status: "normal",
    aiSuggestion: "Route to nearest electrical contractor",
  },
];

const escalationAlerts = [
  {
    id: 1,
    message: "CMP-2832 exceeded SLA by 2 hours",
    time: "5 mins ago",
    type: "warning",
  },
  {
    id: 2,
    message: "High priority complaint auto-escalated",
    time: "12 mins ago",
    type: "alert",
  },
];

export function OfficerWorkflow() {
  return (
    <section
      id="workflow"
      className="py-20 px-6 relative overflow-hidden dark:bg-linear-to-b dark:from-transparent dark:to-cyan-950/20 bg-linear-to-b from-white to-cyan-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            Officer Interface
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Smart Officer Workflow
          </h2>
          <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            AI-assisted task management with intelligent routing and real-time updates
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task Queue */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900">
                Task Queue
              </h3>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {taskQueue.length} Active
              </Badge>
            </div>

            {taskQueue.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono dark:text-cyan-400 text-cyan-600">
                        {task.id}
                      </span>
                      <Badge
                        className={
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : task.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {task.department}
                      </Badge>
                    </div>
                    <h4 className="font-semibold dark:text-white text-gray-900 mb-2">
                      {task.title}
                    </h4>
                  </div>
                  {task.status === "urgent" && (
                    <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                  )}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                    <span className="text-sm dark:text-gray-400 text-gray-600">
                      {task.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                    <span
                      className={`text-sm font-semibold ${
                        task.status === "urgent"
                          ? "text-red-400"
                          : "dark:text-gray-400 text-gray-600"
                      }`}
                    >
                      SLA: {task.sla}
                    </span>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="p-3 rounded-xl dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/20 border-cyan-200 mb-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs dark:text-cyan-300 text-cyan-700 font-semibold mb-1">
                        AI Recommendation
                      </p>
                      <p className="text-sm dark:text-cyan-200 text-cyan-800">
                        {task.aiSuggestion}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Accept Task
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="dark:bg-white/5 dark:border-white/10"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="dark:hover:bg-white/5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar - Alerts & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Officer Profile */}
            <div className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <UserCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold dark:text-white text-gray-900">
                    Officer Sharma
                  </p>
                  <p className="text-sm dark:text-gray-400 text-gray-600">
                    PWD Department
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl dark:bg-white/5 bg-gray-50">
                  <p className="text-2xl font-bold dark:text-white text-gray-900">
                    47
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    Completed
                  </p>
                </div>
                <div className="text-center p-3 rounded-xl dark:bg-white/5 bg-gray-50">
                  <p className="text-2xl font-bold dark:text-cyan-400 text-cyan-600">
                    12
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    In Progress
                  </p>
                </div>
              </div>
            </div>

            {/* Escalation Alerts */}
            <div className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-white text-gray-900">
                  Escalation Alerts
                </h3>
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              </div>

              <div className="space-y-3">
                {escalationAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-xl dark:bg-red-500/10 bg-red-50 border dark:border-red-500/20 border-red-200"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm dark:text-red-200 text-red-800">
                          {alert.message}
                        </p>
                        <p className="text-xs dark:text-red-400 text-red-600 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Tracking */}
            <div className="p-6 rounded-2xl dark:bg-white/5 dark:border-white/10 bg-white border border-gray-200 backdrop-blur-xl">
              <h3 className="font-semibold dark:text-white text-gray-900 mb-4">
                Today's Overview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    Assigned
                  </span>
                  <span className="font-semibold dark:text-white text-gray-900">
                    23
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    Completed
                  </span>
                  <span className="font-semibold text-green-400">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    In Progress
                  </span>
                  <span className="font-semibold text-cyan-400">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    Pending
                  </span>
                  <span className="font-semibold text-yellow-400">3</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-white/10 border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">
                    Avg. Resolution Time
                  </span>
                  <span className="font-semibold dark:text-white text-gray-900">
                    2.3h
                  </span>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.2)",
                  "0 0 40px rgba(6, 182, 212, 0.4)",
                  "0 0 20px rgba(6, 182, 212, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-6 rounded-2xl dark:bg-linear-to-br dark:from-cyan-500/10 dark:to-purple-500/10 bg-linear-to-br from-cyan-50 to-purple-50 border dark:border-cyan-500/20 border-cyan-200 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="font-semibold dark:text-white text-gray-900">
                  AI Assistant Active
                </p>
              </div>
              <p className="text-sm dark:text-gray-300 text-gray-700">
                Your AI assistant is monitoring tasks and will suggest optimal
                actions based on priority and resource availability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
