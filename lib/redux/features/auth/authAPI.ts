// lib/redux/features/auth/authAPI.ts
import axios from '@/lib/api/axios';
import { LoginCredentials, RegisterData, AuthResponse, GoogleLoginCredentials, GoogleAuthResponse } from '@/types/user.types';
import { API_ENDPOINTS } from '@/lib/utils/constants';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post(API_ENDPOINTS.LOGIN, credentials);
  return data;
};
export const googleLogin = async (credentials: GoogleLoginCredentials): Promise<GoogleAuthResponse> => {
  const { data } = await axios.post(API_ENDPOINTS.GOOGLE_LOGIN, credentials);
  return data;
};

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  const { data } = await axios.post(API_ENDPOINTS.REGISTER, registerData);
  return data;
};

export const logout = async (): Promise<void> => {
  await axios.post(API_ENDPOINTS.LOGOUT);
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await axios.get(API_ENDPOINTS.ME);
  return data;
};