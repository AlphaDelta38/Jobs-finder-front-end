import axios from 'axios';

const userAPI = axios.create({
    baseURL: 'https://jobs-finder-back-end.onrender.com',
});

userAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default userAPI;
