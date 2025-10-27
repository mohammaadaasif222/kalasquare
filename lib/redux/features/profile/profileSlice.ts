import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';
import { CreateProfileData, UpdateProfileData } from '@/types/profile.types';
import * as profileAPI from './profileAPI';
import { UserProfile } from '@/types/profile';

interface ProfileState {
  profile: UserProfile | null;
  profiles: UserProfile[];
  loading: boolean;
  error: null | string;
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: false,
  error: null,
};

// ✅ Create Profile
export const createProfile = createAsyncThunk<UserProfile, CreateProfileData>(
  'profile/create',
  async (data, { rejectWithValue }) => {
    try {
      const result = await profileAPI.create(data);
      return result as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create profile');
    }
  }
);

// ✅ Fetch Profile by User ID
export const fetchProfileByUserId = createAsyncThunk<UserProfile, string>(
  'profile/fetchByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const result = await profileAPI.getProfile(userId);
      return result as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// ✅ Fetch Logged-in User Profile
export const fetchProfile = createAsyncThunk<UserProfile>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const result = await profileAPI.getMe();
      return result as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// ✅ Update Profile
export const updateProfile = createAsyncThunk<UserProfile, { userId: string; data: UpdateProfileData }>(
  'profile/update',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const result = await profileAPI.update(userId, data);
      return result as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// ✅ Delete Profile
export const deleteProfile = createAsyncThunk<string, string>(
  'profile/delete',
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/profiles/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
  }
);

// ✅ Search Profiles
export const searchProfiles = createAsyncThunk<UserProfile[], { city?: string; state?: string; country?: string; display_name?: string }>(
  'profile/search',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/profiles/search', { params: filters });
      return response.data as UserProfile[];
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

      // Fetch Profile by User ID
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

      // Fetch Logged-in Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
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
