import api from "./api";

export const getTasks = () => api.get("/tasks").then(({ data }) => data.data);
export const createTask = (values) => api.post("/tasks", values).then(({ data }) => data.data);
export const updateTask = (id, values) => api.put(`/tasks/${id}`, values).then(({ data }) => data.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(({ data }) => data);
