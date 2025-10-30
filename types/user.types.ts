// types/user.types.ts
export type UserType = 'artist' | 'influencer' | 'brand' | 'agency' | 'venue' | 'admin' | 'user';


export interface AuthState {
  user: User | null;
  admin: User | null;
  token: string | null;
  adminToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface GoogleLoginCredentials {
  token: string
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  user_type: UserType;
}

export interface AuthResponse {
  user: User;
  admin?: User;
  adminToken?: string
  token: string;
  message: string;
}
export interface GoogleAuthResponse {
  user: User;
  action: string;
  token: string;
  message: string;
}




export interface User {
  id: string;
  email: string;
  phone?: string;
  user_type: UserType;
  picture?: string;
  google_id?: string;
  is_premium?: boolean;
  premium_expires_at?: string;
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  phone?: string;
  user_type: UserType;
}

export interface UpdateUserPayload {
  email?: string;
  phone?: string;
  user_type?: UserType;
  name?: string;
  picture?: string;
  is_premium?: boolean;
  premium_expires_at?: string;
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
}

export interface GoogleLoginPayload {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export interface UserApiResponse {
  message: string;
  user: User;
}

export interface UpdatedUserApiResponse {
  message: string;
  updated: User;
}

// Global Window interface for Google Sign-In
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleSignInConfig) => void;
          renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export interface GoogleSignInConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

export interface GoogleButtonConfig {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  width?: number;
  logo_alignment?: 'left' | 'center';
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

export { };