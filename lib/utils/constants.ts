// lib/utils/constants.ts
import { UserType } from '@/types/user.types';

export const USER_TYPES: Record<UserType, string> = {
  artist: 'Artist',
  influencer: 'Influencer',
  brand: 'Brand',
  agency: 'Agency',
  venue: 'Venue',
  admin: 'Admin',
};

export const DASHBOARD_ROUTES: Record<UserType, string> = {
  artist: '/artist',
  influencer: '/influencer',
  brand: '/brand',
  agency: '/agency',
  venue: '/venue',
  admin: '/admin',
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
  LOGIN: '/api/auth/login',
  GOOGLE_LOGIN: '/api/auth/google',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/user',
  REFRESH_TOKEN: '/api/auth/refresh',
};