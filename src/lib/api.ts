import axios, { AxiosResponse } from 'axios';
import { Bench, BenchCreate } from '@/types';
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = cookies().get('token')?.value;
    if (token) {
      config.headers['Cookie'] = `token=${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getBenches = async (limit: number = 10, offset: number = 0): Promise<Bench[]> => {
  const response: AxiosResponse<Bench[]> = await api.get(`/benches?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getBench = async (id: number): Promise<Bench> => {
  const response: AxiosResponse<Bench> = await api.get(`/benches/${id}`);
  return response.data;
};

export const getNearestBench = async (latitude: number, longitude: number): Promise<Bench> => {
  const response: AxiosResponse<Bench> = await api.get(`/nearest_bench/?latitude=${latitude}&longitude=${longitude}`);
  return response.data;
};

export const createBench = async (bench: BenchCreate): Promise<Bench> => {
  const response: AxiosResponse<Bench> = await api.post('/create_bench', bench, {withCredentials: true,});
  return response.data;
};

export const deleteBench = async (benchName: string): Promise<{ status_code: string; detail: string }> => {
  const response: AxiosResponse<{ status_code: string; detail: string }> = await api.delete(`/delete_bench?bench_name=${benchName}`);
  return response.data;
};

// Auth endpoints
export const login = async (username: string, password: string): Promise<any> => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  const response: AxiosResponse<any> = await api.post('/auth/jwt/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token = response.data.token
  cookies().set({
    name: 'token',
    value: token,
    expires: Date.now() + 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  return response.data;
};

export const register = async (username: string, email: string, password: string): Promise<any> => {
  const response: AxiosResponse<any> = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/jwt/logout');
  cookies().delete('token');
};


// Users endpoints
export const getMe = async (): Promise<any> => {
  const response = await api.get('/users/me');
  return response.data;
};

export default api;