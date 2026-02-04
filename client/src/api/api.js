import axios from "axios";

const api = axios.create({
  baseURL: "https://doctor-saas-system.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "Server Error" });
  }
);

export default api;
