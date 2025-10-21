// lib/utils/constants.ts
import { UserType } from '@/types/user.types';

export const USER_TYPES: Record<UserType, string> = {
  artist: 'Artist',
  influencer: 'Influencer',
  brand: 'Brand',
  agency: 'Agency',
  venue: 'Venue',
  admin: 'Admin',
  user:'user'
};

export const DASHBOARD_ROUTES: Record<UserType, string> = {
  artist: '/artist',
  influencer: '/influencer',
  brand: '/brand',
  agency: '/agency',
  venue: '/venue',
  admin: '/admin',
  user:"user"
};

export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/login',
  '/register',
];

export const AUTH_ROUTES = ['/login', '/register'];

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  GOOGLE_LOGIN: '/auth/google',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/user',
  REFRESH_TOKEN: '/auth/refresh',
  CREATE_PROFILE:'/profiles',
  GET_PROFILE:'/profiles',
  UPDATE_PROFILE:'/profiles',
  DELETE_PROFILE:'/profiles'
};