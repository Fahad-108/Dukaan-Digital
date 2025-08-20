import api from "../API";

export const addProduct = (data) => api.post('/product', data);
export const getProducts = () => api.get('/product');
export const getProductById = (id) => api.get(`/product/${id}`)
export const updateProduct = (id, data) => api.put(`/product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/product/${id}`); 