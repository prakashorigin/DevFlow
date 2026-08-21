import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";

export default function PublicRoute() {
  const { authenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return authenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
