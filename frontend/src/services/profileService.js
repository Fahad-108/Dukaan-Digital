import api from "../API"

export const getProfile = ()=> api.get('/profile')
export const updateProfile = (data)=> api.put(`/profile/update`, data)
export const deleteProfile = ()=> api.delete(`/profile/delete`)