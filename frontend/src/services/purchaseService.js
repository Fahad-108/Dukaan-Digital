import api from "../API";

export const addPurchase = (data)=> api.post(`/purchase`, data);
export const getPurchases = (data) => api.post('/purchase/all',data );  
export const deletePurchase = (id) => api.delete(`/purchase/${id}`);