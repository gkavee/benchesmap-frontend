import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      deleteCookie('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/jwt/login', { email, password });
  if (response.data.access_token) {
    setCookie('token', response.data.access_token);
  }
  return response;
};

export const register = (email: string, password: string) => 
  api.post('/auth/register', { email, password });

export const getBenches = () => api.get('/benches');

export const logout = () => {
  deleteCookie('token');
};

export { api };