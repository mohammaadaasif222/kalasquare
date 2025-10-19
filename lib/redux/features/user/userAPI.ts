// lib/redux/features/auth/authAPI.ts
import axios from '@/lib/api/axios';


const API_URL = 'https://api.netprofit25.in/api/users';

export const createUser = async (data: any) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getAllUsers = async (params?: Record<string, any>) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const hardDeleteUser = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}/hard`);
  return res.data;
};