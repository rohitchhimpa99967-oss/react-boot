import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "https://apistudent2.codedonor.in/api/"
});
