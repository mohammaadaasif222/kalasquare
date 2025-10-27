// lib/redux/features/auth/authAPI.ts
import axios from '@/lib/api/axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}` ;
// Get current authenticated user
export const getAdminUserList = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  user_type?: string;
  talent_type?: string;
  is_premium?: boolean;
  is_active?: boolean;
  email_verified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.user_type) queryParams.append('user_type', params.user_type);
  if (params.talent_type) queryParams.append('talent_type', params.talent_type);
  if (params.is_premium !== undefined) queryParams.append('is_premium', params.is_premium.toString());
  if (params.is_active !== undefined) queryParams.append('is_active', params.is_active.toString());
  if (params.email_verified !== undefined) queryParams.append('email_verified', params.email_verified.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  const response = await axios.get(`${API_URL}/users/admin/list?${queryParams.toString()}`);
  return response.data;
};

export const getPublicTalents = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  talent_type?: string;
  categories?: string;
  location_city?: string;
  min_followers?: number;
  verified_only?: boolean;
  sortBy?: 'followers' | 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.talent_type) queryParams.append('talent_type', params.talent_type);
  if (params.categories) queryParams.append('categories', params.categories);
  if (params.location_city) queryParams.append('location_city', params.location_city);
  if (params.min_followers) queryParams.append('min_followers', params.min_followers.toString());
  if (params.verified_only) queryParams.append('verified_only', params.verified_only.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const response = await axios.get(`${API_URL}/users/talents?${queryParams.toString()}`);
  return response.data;
};
export const getTalentProfile = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/talents/${id}`);
  return response.data;
};


export const getCurrentUser = async (userId:string, queryParams?: string) => {
  const url = queryParams ? `${API_URL}/users/${userId}?${queryParams}` : `${API_URL}/users/${userId}`;
  const { data } = await axios.get(url);
  return data;
};

// Get user by ID
export const getUserById = async (id: string, queryParams?: string) => {
  const url = queryParams ? `${API_URL}/users/${id}?${queryParams}` : `${API_URL}/users/${id}`;
  const { data } = await axios.get(url);
  return data;
};

// Get all users
export const getAllUsers = async (params?: any) => {
  const { data } = await axios.get(`${API_URL}/users`, { params });
  return data;
};

// Create user
export const createUser = async (userData: any) => {
  const { data } = await axios.post(`${API_URL}/users`, userData);
  console.log(data)
  return data;
};

// Update user
export const updateUser = async (id: string, userData: any) => {
  const { data } = await axios.patch(`${API_URL}/users/${id}`, userData);
  return data;
};

// Soft delete user
export const deleteUser = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/users/soft/${id}`);
  return data;
};

// Hard delete user
export const hardDeleteUser = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/users/hard/${id}`);
  return data;
};

// Get user stats
export const getUserStats = async () => {
  const { data } = await axios.get(`${API_URL}/users/stats/summary`);
  return data;
};

