import axios from "axios";
import { showTokenExpiredMessage } from "../utils/showSnackbarExternally";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "";
    if (
      error.response?.status === 401 &&
      (message.includes(
        "Tu sesión ha expirado. Por favor inicia sesión nuevamente."
      ) ||
        message.includes("jwt expired"))
    ) {
      localStorage.removeItem("token");
      localStorage.setItem("token_expired", "1");
      showTokenExpiredMessage();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
