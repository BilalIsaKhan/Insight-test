// src/services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (user) {
      const userId = JSON.parse(user).id;
      config.headers['userId'] = userId; // Custom header if needed
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
