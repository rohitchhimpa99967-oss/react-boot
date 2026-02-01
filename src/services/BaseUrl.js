import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "https://apistudent2.codedonor.in/api/"
});
baseUrl.interceptors.request.use((config)=>{
    const token =localStorage.getItem("token")
    if (token) {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})