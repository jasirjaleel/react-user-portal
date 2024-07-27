import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all users (with pagination and search)
export const getAllUsers = (token, page = 1, search = '') => {
  return axios.get(`${API_URL}/admin/users/`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, search }
  });
};

// Get single user by ID
export const getUserById = (id, token) => {
  return axios.get(`${API_URL}/admin/users/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Create a new user
export const createUser = (userData, token) => {
  return axios.post(`${API_URL}/admin/users/`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Update user by ID
export const updateUser = (id, userData, token) => {
  return axios.put(`${API_URL}/admin/users/${id}/`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Delete user by ID
export const deleteUser = (id, token) => {
  return axios.delete(`${API_URL}/admin/users/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const uploadImage = async (userId, imageFile, token) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('userId', userId);
  
      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  };