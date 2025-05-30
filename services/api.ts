import axios from 'axios';

let authToken: string | null = null;

const api = axios.create({
    baseURL: 'https://europowerengineerapi.europowercrm.in/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor – add Authorization header if token exists
api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

// Response interceptor – optional for debugging
api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log('AXIOS ERROR:', err.message);
        return Promise.reject(err);
    }
);

// ✅ Correct token setter
export const setAuthToken = (token: string | null) => {
    authToken = token;

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


export default api;
