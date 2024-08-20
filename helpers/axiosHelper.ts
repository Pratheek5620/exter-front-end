import axios, { AxiosResponse } from 'axios';
import { getUser } from './auth_helper';

interface User {
  access_token: string;
}

// Create an Axios instance with common configurations
const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor to add authorization header
api.interceptors.request.use(async (config) => {
  const user: User | null = await getUser();
  if (user && user.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors (optional)
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors globally, e.g., display error notifications
  return Promise.reject(error);
});

export const callApi = (endpoint: string): Promise<AxiosResponse<any>> => {
  return api.get(endpoint);
};
