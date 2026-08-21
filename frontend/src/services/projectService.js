import api from "./api";

export const getProjects = () => api.get("/projects").then(({ data }) => data.data);
export const getProject = (id) => api.get(`/projects/${id}`).then(({ data }) => data.data);
export const createProject = (values) => api.post("/projects", values).then(({ data }) => data.data);
export const updateProject = (id, values) => api.put(`/projects/${id}`, values).then(({ data }) => data.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then(({ data }) => data);
