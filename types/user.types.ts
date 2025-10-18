// types/user.types.ts
export type UserType = 'artist' | 'influencer' | 'brand' | 'agency' | 'venue' | 'admin' |"user";

export interface User {
  id: string;
  email: string;
  name: string;
  user_type: UserType;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface GoogleLoginCredentials {
  token:string
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  user_type: UserType;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
export interface GoogleAuthResponse {
  user: User;
  action: string;
  token: string;
  message: string;
}