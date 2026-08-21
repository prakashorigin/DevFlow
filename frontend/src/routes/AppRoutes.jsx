import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import NotFound from "../pages/NotFound";
import Analytics from "../pages/analytics/Analytics";
import BugAnalyzer from "../pages/ai/BugAnalyzer";
import CodeReview from "../pages/ai/CodeReview";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Issues from "../pages/issues/Issues";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import Projects from "../pages/projects/Projects";
import Settings from "../pages/settings/Settings";
import Tasks from "../pages/tasks/Tasks";
import Team from "../pages/team/Team";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ForgotPassword resetMode />} />
    </Route>
    <Route element={<ProtectedRoute />}><Route element={<AppLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/issues/:id" element={<Issues />} />
      <Route path="/ai/code-review" element={<CodeReview />} />
      <Route path="/ai/bug-analyzer" element={<BugAnalyzer />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/team" element={<Team />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route></Route>
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
