import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
const storageKey = "devflow-session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem(storageKey) || "null"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(storageKey)));

  useEffect(() => {
    const loadUser = async () => {
      if (!session?.accessToken) return setLoading(false);
      try {
        const { data } = await api.get("/users/me");
        setSession((current) => ({ ...current, user: data.data }));
      } catch {
        localStorage.removeItem(storageKey); setSession(null);
      } finally { setLoading(false); }
    };
    loadUser();
  }, []);

  const persist = (data) => { localStorage.setItem(storageKey, JSON.stringify(data)); setSession(data); };
  const login = async (credentials) => { const { data } = await api.post("/auth/login", credentials); persist(data.data); return data; };
  const register = async (values) => { const { data } = await api.post("/auth/register", values); return data; };
  const logout = async () => { try { await api.post("/auth/logout"); } catch { /* Local logout is still safe. */ } localStorage.removeItem(storageKey); setSession(null); };
  return <AuthContext.Provider value={{ user: session?.user, token: session?.accessToken, loading, login, register, logout, authenticated: Boolean(session?.accessToken) }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
