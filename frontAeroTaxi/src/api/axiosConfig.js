import axios from "axios";

// Vite usa import.meta.env
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("❌ No se encontró VITE_API_URL en el archivo .env");
}

console.log("🌍 BASE_URL:", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },



});

// Interceptor para agregar token automáticamente (excepto login/register/verify)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicAuthEndpoint = /\/api\/auth\/(login|register|verify|register\/email)/.test(
      config.url || ""
    );

    if (token && !isPublicAuthEndpoint) {
    console.log("xxxx entro al if xxxx");
    console.log(config)
    console.log(token);
    console.log("xxxxxxx");
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("xxxx token xxxx");
    console.log(token);
    console.log("xxxx token xxxx");

    console.log("xxx URL xxx");
    console.log(config.url);
    console.log("xxx URL xxx");

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
