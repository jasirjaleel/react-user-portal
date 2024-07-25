// import axios from 'axios'
// import { ACCESS_TOKEN } from './constants'

// const api = axios.create({
//     baseURL:import.meta.env.VITE_API_URL
// })

// api.interceptors.request.use(
//     (config) =>{
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

// export default api

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// User registration
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register/`, userData);
};

// User login
export const loginUser = (loginData) => {
  return axios.post(`${API_URL}/login/`, loginData);
};

// Get user details
export const getUserDetails = ( token) => {
  return axios.get(`${API_URL}/user/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Update user details
export const updateUserDetails = (userData, token) => {

  return axios.put(`${API_URL}/user/update/`, userData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const refreshToken = (refreshToken) => {
  return axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
};

export const uploadImage = (imageFile, accessToken) => {
    console.log(imageFile, accessToken)
    const formData = new FormData();
    formData.append('profile_pic', imageFile);
  
    return axios.post(`${API_URL}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  };