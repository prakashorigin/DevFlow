import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import * as projectService from "../services/projectService";
import { apiMessage } from "../utils/helpers";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const { authenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshProjects = useCallback(async () => {
    if (!authenticated) { setProjects([]); setLoading(false); return; }
    setLoading(true);
    try { setProjects(await projectService.getProjects()); setError(""); }
    catch (err) { setError(apiMessage(err, "Unable to load projects.")); }
    finally { setLoading(false); }
  }, [authenticated]);

  useEffect(() => { refreshProjects(); }, [refreshProjects]);
  const addProject = async (values) => { const project = await projectService.createProject(values); setProjects((current) => [project, ...current]); return project; };
  const saveProject = async (id, values) => { const project = await projectService.updateProject(id, values); setProjects((current) => current.map((item) => item._id === id ? project : item)); return project; };
  const removeProject = async (id) => { await projectService.deleteProject(id); setProjects((current) => current.filter((item) => item._id !== id)); };

  return <ProjectContext.Provider value={{ projects, loading, error, refreshProjects, addProject, saveProject, removeProject }}>{children}</ProjectContext.Provider>;
}
