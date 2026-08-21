import axios from "axios";

const api = axios.create({
  // Keep this fallback aligned with backend/.env.example. VITE_API_URL still
  // takes precedence for deployed environments.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:6002/api",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem("devflow-session") || "null");
  if (session?.accessToken) config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

// Browser network errors otherwise reach the form as an empty Axios error,
// which made a CORS/incorrect-port problem look like a failed registration.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && error.request) {
      error.userMessage = "Cannot reach the DevFlow API. Start the backend and check VITE_API_URL.";
    }
    return Promise.reject(error);
  },
);

export default api;
