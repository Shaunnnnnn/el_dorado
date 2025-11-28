import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const projectApi = {
  create: (data: { name: string; businessGoals?: string }) =>
    api.post('/project/create', data),
  getAll: () => api.get('/project/all'),
  getOne: (id: string) => api.get(`/project/${id}`),
  update: (id: string, data: any) => api.patch(`/project/${id}`, data),
  delete: (id: string) => api.delete(`/project/${id}`),
};

export const aiApi = {
  generateStructure: (data: { businessGoals: string; projectId: string }) =>
    api.post('/ai/generate-site-structure', data),
  generateCopy: (data: { projectId: string; pageId: string; sectionType: string }) =>
    api.post('/ai/generate-copy', data),
  generateComponents: (projectId: string) =>
    api.post('/ai/generate-components', { projectId }),
  refine: (projectId: string, feedback: string) =>
    api.post('/ai/refine', { projectId, feedback }),
};

export const chatApi = {
  sendMessage: (data: { projectId: string; message: string }) =>
    api.post('/chat/message', data),
  getHistory: (projectId: string) =>
    api.get(`/chat/history/${projectId}`),
  clearHistory: (projectId: string) =>
    api.delete(`/chat/history/${projectId}`),
};
