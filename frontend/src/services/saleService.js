import api from "../API";

export const createSale = (data) => api.post('/sales', data);
export const getSales = (data) => api.post('/sales/all', data);
export const deleteSale = (id) => api.delete(`/sales/${id}`);