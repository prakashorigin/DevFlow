import api from "./api";

export const getCurrentUser = () => api.get("/users/me").then(({ data }) => data.data);
export const updateCurrentUser = (values) => api.put("/users/me", values).then(({ data }) => data.data);
export const changePassword = (values) => api.put("/users/me/password", values).then(({ data }) => data);
export const getTeamMembers = () => api.get("/team").then(({ data }) => data.data);
export const inviteMember = (values) => api.post("/team/invite", values).then(({ data }) => data.data);
