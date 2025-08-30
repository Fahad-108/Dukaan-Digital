import axios from "axios";

const api = axios.create({
  baseURL: "https://dukaan-digital-topaz.vercel.app/",
  headers: { "Content-Type": "application/json" },
});

// Request: Har request ke saath token bhejna
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: Agar token expire ho jaye to logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
