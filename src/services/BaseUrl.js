import axios from "axios";

export const baseUrl = axios.create({
    // baseURL: "https://apistudent2.codedonor.in/api/"
    // baseURL:"https://localhost:7185/api/"
    baseURL:"https://myrestaurentclean.runasp.net/api/"
});
baseUrl.interceptors.request.use((config)=>{
    const token =localStorage.getItem("token")
    if (token) {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})