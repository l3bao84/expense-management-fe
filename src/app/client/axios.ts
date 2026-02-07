import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://l3bao84-expense-management.onrender.com/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API error:", error.response);
        return Promise.reject(error);
    }
);

export default axiosClient;
