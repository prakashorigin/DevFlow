import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import SplashScreen from "./components/common/SplashScreen";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Issues from "./pages/issues/Issues";
import CodeReview from "./pages/ai/CodeReview";
import BugAnalyzer from "./pages/ai/BugAnalyzer";
import Analytics from "./pages/analytics/Analytics";
import Team from "./pages/team/Team";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => { if (!sessionStorage.getItem("devflow-intro")) setShowSplash(true); }, []);
  const finishSplash = () => { sessionStorage.setItem("devflow-intro", "1"); setShowSplash(false); };
  return <ThemeProvider><AuthProvider><BrowserRouter><AnimatePresence>{showSplash && <SplashScreen onComplete={finishSplash} />}</AnimatePresence><Routes>
    <Route path="/login" element={<Login />} /><Route path="/signup" element={<Register />} /><Route path="/register" element={<Navigate to="/signup" replace />} /><Route path="/forgot-password" element={<ForgotPassword />} /><Route path="/reset-password" element={<ForgotPassword resetMode />} />
    <Route element={<ProtectedRoute />}><Route element={<AppLayout />}><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<Projects />} /><Route path="/tasks" element={<Tasks />} /><Route path="/issues" element={<Issues />} /><Route path="/issues/:id" element={<Issues />} /><Route path="/ai/code-review" element={<CodeReview />} /><Route path="/ai/bug-analyzer" element={<BugAnalyzer />} /><Route path="/analytics" element={<Analytics />} /><Route path="/team" element={<Team />} /><Route path="/notifications" element={<Notifications />} /><Route path="/profile" element={<Profile />} /><Route path="/settings" element={<Settings />} /></Route></Route>
    <Route path="*" element={<NotFound />} />
  </Routes></BrowserRouter></AuthProvider></ThemeProvider>;
}
export default App;
