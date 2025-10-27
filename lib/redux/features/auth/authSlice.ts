// lib/redux/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  GoogleLoginCredentials,
  User,
} from '@/types/user.types';
import * as authAPI from './authAPI';
import * as userAPI from '../user/userAPI';
import Cookies from 'js-cookie';

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      message: null,
    };
  }

  try {
    const serializedUser = localStorage.getItem('user');
    const token = Cookies.get('token');

    if (serializedUser && token) {
      return {
        user: JSON.parse(serializedUser),
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        message: null
      };
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null
  };
};

const initialState: AuthState = loadAuthState();

// Async thunks
export const updatePassword = createAsyncThunk(
  'auth/updatepassword',
  async (credentials: { id: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.updatePassword(credentials);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);

      // Persist to localStorage and cookies
      localStorage.setItem('user', JSON.stringify(response.user));
      Cookies.set('token', response.token, { expires: 7 });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/google',
  async (credentials: GoogleLoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleLogin(credentials);

      // Persist to localStorage and cookies
      localStorage.setItem('user', JSON.stringify(response.user));
      Cookies.set('token', response.token, { expires: 7 });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(data);

      // Persist to localStorage and cookies
      localStorage.setItem('user', JSON.stringify(response.user));
      Cookies.set('token', response.token, { expires: 7 });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
 
      localStorage.removeItem('user');
      Cookies.remove('token');
      localStorage.clear()
    } catch (error: any) {
      // Even if API call fails, clear local data
      localStorage.removeItem('user');
      Cookies.remove('token');
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async ({ id, data }: { id: any; data: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUser(id, data);
      return response.updated;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user already exists in state
      const state = getState() as { auth: AuthState };
      if (state.auth.user && state.auth.isAuthenticated) {
        return { user: state.auth.user, token: state.auth.token! };
      }

      const token = Cookies.get('token');
      const cachedUser = localStorage.getItem('user');

      if (!token) {
        throw new Error('No token found');
      }

      // If we have cached user data, return it immediately
      if (cachedUser) {
        return { user: JSON.parse(cachedUser), token };
      }

      // Otherwise fetch from API
      const response = await authAPI.getCurrentUser();

      // Cache the user data
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      localStorage.removeItem('user');
      Cookies.remove('token');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Persist to storage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      Cookies.set('token', action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear storage
      localStorage.removeItem('user');
      Cookies.remove('token');
    },
    rehydrateAuth: (state) => {
      // Manually rehydrate from storage
      const cachedUser = localStorage.getItem('user');
      const token = Cookies.get('token');

      if (cachedUser && token) {
        state.user = JSON.parse(cachedUser);
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message ="Password updated successfull!"
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even on error
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        // Update localStorage with the new user data
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        // Only set loading if we don't have user data
        if (!state.user) {
          state.isLoading = true;
        }
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, setCredentials, logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;