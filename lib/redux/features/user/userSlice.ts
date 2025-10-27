import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as userAPI from './userAPI';
import { UserProfile } from '@/types/profile.types';
import { TalentProfile } from '@/types/talent.types';

export interface User {
  id: string;
  email: string;
  phone?: string;
  user_type: string;
  is_premium?: boolean;
  premium_expires_at?: string;
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  profile?: UserProfile;
  talentProfile?: TalentProfile;
}

// Admin user list item type
export interface AdminUserListItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  user_type: string;
  talent_type: string;
  categories: any[];
  status: string;
  followers: number;
  is_premium: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  verify_badge: boolean;
  location: string;
  created_at: string;
  last_login: string | null;
}

// Public talent list item type
export interface PublicTalentItem {
  id: string;
  display_name: string;
  profile_image_url: string | null;
  bio: string | null;
  talent_type: any;
  categories: any[];
  specializations: any[];
  verify_badge: boolean;
  experience_level: any;
  location: string | null;
  followers: number;
  primary_platform: any;
  social_accounts: any[];
  rates: {
    per_live: any;
    per_video: any;
    per_post: any;
    currency: string | null;
  };
}

// Complete talent profile type
export interface CompleteTalentProfile {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  profile_image_url: string | null;
  banner_image_url: string | null;
  location: {
    city: string | null;
    state: string | null;
    country: string | null;
  };
  website_url: string | null;
  languages: any;
  gender: string | null;
  whatsapp: string | null;
  is_premium: boolean;
  member_since: string;
  talent_type: any;
  categories: any[];
  specializations: any[];
  experience_level: any;
  years_of_experience: number | null;
  availability_status: any;
  verify_badge: boolean;
  rates: any;
  portfolio_description: string | null;
  achievements: string | null;
  awards: any[];
  certifications: any[];
  collaboration_preferences: any[];
  total_followers: number;
  social_accounts: any[];
  rating: {
    average: number;
    count: number;
  };
  recent_reviews: any[];
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

interface UserStats {
  total: number;
  active: number;
  premium: number;
  inactive: number;
  byType: Array<{ type: string | null; count: number }>;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  selectedUser: User | null;
  pagination: PaginationMeta | null;
  
  // Admin specific
  adminUserList: AdminUserListItem[];
  adminPagination: PaginationMeta | null;
  userStats: UserStats | null;
  
  // Public talents
  publicTalents: PublicTalentItem[];
  talentsPagination: PaginationMeta | null;
  selectedTalentProfile: CompleteTalentProfile | null;
  
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  success: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  selectedUser: null,
  pagination: null,
  
  adminUserList: [],
  adminPagination: null,
  userStats: null,
  
  publicTalents: [],
  talentsPagination: null,
  selectedTalentProfile: null,
  
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  success: null,
};

// ==================== NEW ASYNC THUNKS ====================

// Admin: Get all users list
export const getAdminUserList = createAsyncThunk(
  'users/admin/list',
  async (params: {
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
  } = {}, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAdminUserList(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin user list');
    }
  }
);

// Admin: Get user statistics
export const getUserStats = createAsyncThunk(
  'users/admin/stats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserStats();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user statistics');
    }
  }
);

// Public: Get talent listing
export const getPublicTalents = createAsyncThunk(
  'users/talents/list',
  async (params: {
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
  } = {}, { rejectWithValue }) => {
    try {
      const response = await userAPI.getPublicTalents(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch talents');
    }
  }
);

// Public: Get complete talent profile
export const getTalentProfile = createAsyncThunk(
  'users/talents/profile',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getTalentProfile(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch talent profile');
    }
  }
);

// ==================== EXISTING ASYNC THUNKS ====================

export const getCurrentUser = createAsyncThunk(
  'users/getCurrent',
  async ({
    userId,
    params = {},
  }: {
    userId: string;
    params?: { profile?: boolean; talent?: boolean; socials?: boolean };
  }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.profile) queryParams.append('profile', 'true');
      if (params.talent) queryParams.append('talent', 'true');
      if (params.socials) queryParams.append('socials', 'true');

      const response = await userAPI.getCurrentUser(userId, queryParams.toString());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch current user');
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getById',
  async ({ id, params }: { id: string; params?: { profile?: boolean; talent?: boolean; socials?: boolean } }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.profile) queryParams.append('profile', 'true');
      if (params?.talent) queryParams.append('talent', 'true');
      if (params?.socials) queryParams.append('socials', 'true');

      const response = await userAPI.getUserById(id, queryParams.toString());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (params: {
    skip?: number;
    take?: number;
    includeProfiles?: boolean;
    user_type?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAllUsers(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (data: { email: string; password: string; phone?: string; user_type: string }, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, data }: { id: string; data: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUser(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const hardDeleteUser = createAsyncThunk(
  'users/hardDelete',
  async (id: string, { rejectWithValue }) => {
    try {
      await userAPI.hardDeleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to permanently delete user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.success = null;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearSelectedTalentProfile: (state) => {
      state.selectedTalentProfile = null;
    },
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ==================== NEW ADMIN CASES ====================
      // Get admin user list
      .addCase(getAdminUserList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminUserList = action.payload.data;
        state.adminPagination = action.payload.meta;
        state.error = null;
      })
      .addCase(getAdminUserList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get user stats
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload;
        state.error = null;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ==================== NEW PUBLIC TALENT CASES ====================
      // Get public talents
      .addCase(getPublicTalents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublicTalents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicTalents = action.payload.data;
        state.talentsPagination = action.payload.meta;
        state.error = null;
      })
      .addCase(getPublicTalents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get talent profile
      .addCase(getTalentProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTalentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTalentProfile = action.payload;
        state.error = null;
      })
      .addCase(getTalentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ==================== EXISTING CASES ====================
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get user by ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<{ data: User[]; meta?: any }>) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.meta || null;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.isCreating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isCreating = false;
        state.users.unshift(action.payload);
        state.success = 'User created successfully';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isUpdating = false;
        state.users = state.users.map((u) => u.id === action.payload.id ? action.payload : u);
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
        state.success = 'User updated successfully';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isDeleting = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
        state.success = 'User deleted successfully';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })

      // Hard delete user
      .addCase(hardDeleteUser.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(hardDeleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isDeleting = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
        state.success = 'User permanently deleted';
      })
      .addCase(hardDeleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearUserError,
  clearUserSuccess,
  setSelectedUser,
  clearSelectedUser,
  setCurrentUser,
  clearCurrentUser,
  clearSelectedTalentProfile,
  resetUserState
} = userSlice.actions;

export default userSlice.reducer;