import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import AppLayout from "@/components/AppLayout";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TestStart from "./pages/TestStart";
import CognitiveTest from "./pages/CognitiveTest";
import SpeechTest from "./pages/SpeechTest";
import EyeTrackingTest from "./pages/EyeTrackingTest";
import WritingTest from "./pages/WritingTest";
import Report from "./pages/Report";
import CaregiverAlerts from "./pages/CaregiverAlerts";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminPanel from "./pages/AdminPanel";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth flow - no bottom nav */}
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />

            {/* App screens with bottom nav */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/test" element={<TestStart />} />
              <Route path="/test/cognitive" element={<CognitiveTest />} />
              <Route path="/test/speech" element={<SpeechTest />} />
              <Route path="/test/eye" element={<EyeTrackingTest />} />
              <Route path="/test/writing" element={<WritingTest />} />
              <Route path="/report" element={<Report />} />
              <Route path="/caregiver" element={<CaregiverAlerts />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
