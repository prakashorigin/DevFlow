import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Issues from "./pages/issues/Issues";
import CodeReview from "./pages/ai/CodeReview";
import BugAnalyzer from "./pages/ai/BugAnalyzer";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/projects" element={<Projects />} />

            <Route path="/tasks" element={<Tasks />} />

            <Route path="/issues" element={<Issues />} />

            <Route path="/ai/code-review" element={<CodeReview />} />

            <Route path="/ai/bug-analyzer" element={<BugAnalyzer />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
