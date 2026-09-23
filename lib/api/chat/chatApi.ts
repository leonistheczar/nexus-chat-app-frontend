import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const {getToken} = useAuth();
export const useApi= () => {
    const api = axios.create({
        baseURL: process.env.DEVELOPMENT_BASE_URL,
        headers:{
            "Content-Type": "application/json",
        },
        withCredentials: true
    });
    // Attach auth token with each protected request
    api.interceptors.request.use(async (config) => {
    const token = await getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }  
        return config;
    })
}