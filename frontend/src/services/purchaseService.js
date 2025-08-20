import api from "../API";

export const addPurchase = (data)=> api.post(`/purchase`, data);