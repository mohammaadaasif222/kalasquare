// store/slices/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';
import { CreateProfileData, ProfileState, UpdateProfileData, UserProfile } from '@/types/profile.types';
import * as profileAPI from './profileAPI';

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: false,
  error: null,
};

// Async Thunks
export const createProfile = createAsyncThunk(
  'profile/create',
  async (data: CreateProfileData, { rejectWithValue }) => {
    try {
      const result = await profileAPI.create(data);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create profile');
    }
  }
);

export const fetchProfileByUserId = createAsyncThunk(
  'profile/fetchByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await profileAPI.getProfile(userId);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async ({ userId, data }: { userId: string; data: UpdateProfileData }, { rejectWithValue }) => {
    try {
      const result = await profileAPI.update(userId, data);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/profiles/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
  }
);

export const searchProfiles = createAsyncThunk(
  'profile/search',
  async (filters: { city?: string; state?: string; country?: string; display_name?: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/profiles/search', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search profiles');
    }
  }
);

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Profile
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Search Profiles
      .addCase(searchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProfiles.fulfilled, (state, action: PayloadAction<UserProfile[]>) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;