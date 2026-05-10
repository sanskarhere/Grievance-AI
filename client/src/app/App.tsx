import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { OfficerOperations } from "./pages/OfficerOperations";
import { GovernanceDashboard } from "./pages/GovernanceDashboard";
import { IntelligenceCenter } from "./pages/IntelligenceCenter";
import { RealTimeMonitoring } from "./pages/RealTimeMonitoring";
import { SuperAdminPanel } from "./pages/SuperAdminPanel";
import { SettingsPage } from "./pages/SettingsPage";
import { ManageCitizens } from "./pages/ManageCitizens";
import { AuthPage } from "./pages/AuthPage";
import { CitizenDashboard } from "./pages/CitizenDashboard";
import { ComplaintPage } from "./pages/ComplaintPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboard />}>
            <Route path="complaint/:id" element={<ComplaintPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="operations" replace />} />
            <Route path="operations" element={<OfficerOperations />} />
            <Route path="governance" element={<GovernanceDashboard />} />
            <Route path="citizens" element={<ManageCitizens />} />
            <Route path="intelligence" element={<IntelligenceCenter />} />
            <Route path="monitoring" element={<RealTimeMonitoring />} />
            <Route path="admin" element={<SuperAdminPanel />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Add other dashboard routes here as they are created */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
