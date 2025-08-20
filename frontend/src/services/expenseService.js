import api from "../API";

export const addExpense = (data) => api.post('/expenses', data);
export const getExpense = () => api.get('/expenses');
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);