import api from "../API";

export const getReport = (data) => api.post('/report', data); 