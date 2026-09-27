import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
