import 'server-only';
import axios from 'axios';

export const serverAxios = axios.create({
    baseURL: process.env.API_BASE,
    timeout: 15000,
});

serverAxios.interceptors.request.use((config) => {
    const token = process.env.API_TOKEN;
    if (token) {
        // axios 1.x позволяет задавать через set()
        if (config.headers?.set) {
            config.headers.set('Authorization', `Bearer ${token}`);
        } else {
            if (!config.headers) config.headers = new axios.AxiosHeaders();
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});
