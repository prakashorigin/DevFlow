import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";
export default function ProtectedRoute() { const { authenticated, loading } = useAuth(); if (loading) return <LoadingScreen />; return authenticated ? <Outlet /> : <Navigate to="/login" replace />; }
