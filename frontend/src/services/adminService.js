import api from "../API";

export const getadminDashboard = () => api.get('/admin');
export const changeStatus = (id) => api.post(`/admin/status/${id}`);
export const deleteShop = (id) => api.delete(`/admin/${id}`);
export const editUserProfile = (id, data) => api.put(`/admin/profile/${id}`, data);