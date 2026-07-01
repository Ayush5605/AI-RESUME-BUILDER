import axios from "axios";

console.log(import.meta.env.VITE_BASE_URL)

const api=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL || "http://localhost:4040/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;