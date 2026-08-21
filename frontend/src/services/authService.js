import api from "./api";

export const signIn = (credentials) => api.post("/auth/login", credentials).then(({ data }) => data);
export const signUp = (values) => api.post("/auth/register", values).then(({ data }) => data);
export const signOut = () => api.post("/auth/logout").then(({ data }) => data);
export const requestPasswordReset = (identifier) => api.post("/auth/forgot-password", { identifier }).then(({ data }) => data);
export const resetPassword = (values) => api.post("/auth/reset-password", values).then(({ data }) => data);
