import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (config.headers && typeof config.headers.set === 'function') {
            config.headers.set("Authorization", `Bearer ${token}`);
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear invalid or expired token
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            
            // Avoid redirect loop if already on login or register page
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
