import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  addMaterial: (productId, data) => api.post(`/products/${productId}/materials`, data),
};

export const materialsApi = {
  getAll: () => api.get('/raw-materials'),
  create: (data) => api.post('/raw-materials', data),
  update: (id, data) => api.put(`/raw-materials/${id}`, data),
  delete: (id) => api.delete(`/raw-materials/${id}`),
};

export const productionApi = {
  getSuggestion: () => api.get('/production/suggestion'),
};

export default api;
