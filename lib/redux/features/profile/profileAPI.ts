// lib/redux/features/auth/authAPI.ts
import axios from '@/lib/api/axios';
import { LoginCredentials, RegisterData, AuthResponse, GoogleLoginCredentials, GoogleAuthResponse } from '@/types/user.types';
import { API_ENDPOINTS } from '@/lib/utils/constants';
import { CreateProfileData, UpdateProfileData, UserProfile } from '@/types/profile.types';

export const create = async (profileData: CreateProfileData): Promise<UserProfile> => {
  const { data } = await axios.post(API_ENDPOINTS.CREATE_PROFILE, profileData);
  return data;
};


export const update = async (userId: string, updateData: UpdateProfileData): Promise<UserProfile> => {
  const { data } = await axios.post(`${API_ENDPOINTS}/${userId}`, updateData);
  return data;
};

export const logout = async (): Promise<void> => {
  await axios.post(API_ENDPOINTS.LOGOUT);
};

export const getProfile = async (userId: string): Promise<UserProfile> => {
  const { data } = await axios.get(`${API_ENDPOINTS.GET_PROFILE}/${userId}`);
  return data;
};