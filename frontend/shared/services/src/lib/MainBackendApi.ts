import axios from 'axios';

export const mainBackendApi = axios.create({
  baseURL: 'http://localhost:7253',
  headers: {
    'Content-Type': 'application/json',
  },
});

mainBackendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setAuth(token: string) {
  if (token) {
    localStorage.setItem('token', token);
  }
}
