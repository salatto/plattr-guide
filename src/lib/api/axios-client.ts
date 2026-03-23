import axios from "axios";

export const clientAxios = axios.create({
    baseURL: "/api",
    timeout: 15000,
});
