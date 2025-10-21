// store/slices/talentSocialSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';

type Platform = 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin' | 'spotify' | 'other';

interface TalentSocialAccount {
  id: string;
  talent_profile_id: string;
  platform: Platform;
  handle: string;
  profile_url: string;
  followers_count?: number;
  engagement_rate?: number;
  is_verified?: boolean;
  is_primary?: boolean;
  last_updated: string;
}

interface CreateSocialAccountData {
  talent_profile_id: string;
  platform: Platform;
  handle: string;
  profile_url: string;
  followers_count?: number;
  engagement_rate?: number;
  is_verified?: boolean;
  is_primary?: boolean;
}

interface UpdateSocialAccountData {
  handle?: string;
  profile_url?: string;
  followers_count?: number;
  engagement_rate?: number;
  is_verified?: boolean;
  is_primary?: boolean;
}

interface TalentSocialState {
  socialAccounts: TalentSocialAccount[];
  currentAccount: TalentSocialAccount | null;
  loading: boolean;
  error: string | null;
}

const initialState: TalentSocialState = {
  socialAccounts: [],
  currentAccount: null,
  loading: false,
  error: null,
};

// Async Thunks
export const createSocialAccount = createAsyncThunk(
  'talentSocial/create',
  async ({ userId, data }: { userId: string; data: CreateSocialAccountData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/talents/${userId}/social-accounts`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create social account');
    }
  }
);

export const fetchSocialAccounts = createAsyncThunk(
  'talentSocial/fetchAll',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/talents/${userId}/social-accounts`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch social accounts');
    }
  }
);

export const fetchSocialAccount = createAsyncThunk(
  'talentSocial/fetchOne',
  async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/talents/${userId}/social-accounts/${accountId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch social account');
    }
  }
);

export const updateSocialAccount = createAsyncThunk(
  'talentSocial/update',
  async (
    { userId, accountId, data }: { userId: string; accountId: string; data: UpdateSocialAccountData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/talents/${userId}/social-accounts/${accountId}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update social account');
    }
  }
);

export const setPrimarySocialAccount = createAsyncThunk(
  'talentSocial/setPrimary',
  async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/talents/${userId}/social-accounts/${accountId}/set-primary`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to set primary account');
    }
  }
);

export const deleteSocialAccount = createAsyncThunk(
  'talentSocial/delete',
  async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/talents/${userId}/social-accounts/${accountId}`);
      return accountId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete social account');
    }
  }
);

// Slice
const talentSocialSlice = createSlice({
  name: 'talentSocial',
  initialState,
  reducers: {
    clearSocialAccounts: (state) => {
      state.socialAccounts = [];
      state.currentAccount = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Social Account
      .addCase(createSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
        state.loading = false;
        state.socialAccounts.push(action.payload);
      })
      .addCase(createSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch All Social Accounts
      .addCase(fetchSocialAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialAccounts.fulfilled, (state, action: PayloadAction<TalentSocialAccount[]>) => {
        state.loading = false;
        state.socialAccounts = action.payload;
      })
      .addCase(fetchSocialAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Social Account
      .addCase(fetchSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
        state.loading = false;
        state.currentAccount = action.payload;
      })
      .addCase(fetchSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Social Account
      .addCase(updateSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
        state.loading = false;
        const index = state.socialAccounts.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.socialAccounts[index] = action.payload;
        }
        state.currentAccount = action.payload;
      })
      .addCase(updateSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Set Primary Social Account
      .addCase(setPrimarySocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPrimarySocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
        state.loading = false;
        // Update all accounts - set only the returned one as primary
        state.socialAccounts = state.socialAccounts.map((acc) => ({
          ...acc,
          is_primary: acc.id === action.payload.id,
        }));
      })
      .addCase(setPrimarySocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Social Account
      .addCase(deleteSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSocialAccount.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.socialAccounts = state.socialAccounts.filter((acc) => acc.id !== action.payload);
        if (state.currentAccount?.id === action.payload) {
          state.currentAccount = null;
        }
      })
      .addCase(deleteSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSocialAccounts, clearError } = talentSocialSlice.actions;
export default talentSocialSlice.reducer;