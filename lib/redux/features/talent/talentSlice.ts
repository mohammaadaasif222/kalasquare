// store/slices/talentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';

type TalentType = 'artist' | 'influencer' | 'both';
type ExperienceLevel = 'beginner' | 'intermediate' | 'professional' | 'expert';
type AvailabilityStatus = 'available' | 'busy' | 'booked' | 'inactive';

interface TalentProfile {
  id: string;
  user_id: string;
  talent_type: TalentType;
  categories: any;
  specializations?: any;
  experience_level: ExperienceLevel;
  years_of_experience?: number;
  rate_per_hour?: number;
  rate_per_project?: number;
  rate_per_post?: number;
  currency?: string;
  availability_status?: AvailabilityStatus;
  portfolio_description?: string;
  achievements?: string;
  awards?: any;
  certifications?: any;
  equipment_owned?: any;
  collaboration_preferences?: any;
  created_at: string;
  updated_at: string;
  socialAccounts?: any[];
}

interface CreateTalentData {
  user_id: string;
  talent_type: TalentType;
  categories: any;
  specializations?: any;
  experience_level: ExperienceLevel;
  years_of_experience?: number;
  rate_per_hour?: number;
  rate_per_project?: number;
  rate_per_post?: number;
  currency?: string;
  availability_status?: AvailabilityStatus;
  portfolio_description?: string;
  achievements?: string;
  awards?: any;
  certifications?: any;
  equipment_owned?: any;
  collaboration_preferences?: any;
}

interface UpdateTalentData {
  talent_type?: TalentType;
  categories?: any;
  specializations?: any;
  experience_level?: ExperienceLevel;
  years_of_experience?: number;
  rate_per_hour?: number;
  rate_per_project?: number;
  rate_per_post?: number;
  currency?: string;
  availability_status?: AvailabilityStatus;
  portfolio_description?: string;
  achievements?: string;
  awards?: any;
  certifications?: any;
  equipment_owned?: any;
  collaboration_preferences?: any;
}

interface TalentFilters {
  talent_type?: TalentType;
  experience_level?: ExperienceLevel;
  availability_status?: AvailabilityStatus;
  min_rate?: number;
  max_rate?: number;
}

interface TalentState {
  talent: TalentProfile | null;
  talents: TalentProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: TalentState = {
  talent: null,
  talents: [],
  loading: false,
  error: null,
};

// Async Thunks
export const createTalent = createAsyncThunk(
  'talent/create',
  async (data: CreateTalentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/talents', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create talent profile');
    }
  }
);

export const fetchTalentByUserId = createAsyncThunk(
  'talent/fetchByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/talents/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch talent profile');
    }
  }
);

export const fetchAllTalents = createAsyncThunk(
  'talent/fetchAll',
  async (filters: TalentFilters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/talents', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch talents');
    }
  }
);

export const updateTalent = createAsyncThunk(
  'talent/update',
  async ({ userId, data }: { userId: string; data: UpdateTalentData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/talents/${userId}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update talent profile');
    }
  }
);

export const updateAvailability = createAsyncThunk(
  'talent/updateAvailability',
  async ({ userId, status }: { userId: string; status: AvailabilityStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/talents/${userId}/availability`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update availability');
    }
  }
);

export const deleteTalent = createAsyncThunk(
  'talent/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/talents/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete talent profile');
    }
  }
);

// Slice
const talentSlice = createSlice({
  name: 'talent',
  initialState,
  reducers: {
    clearTalent: (state) => {
      state.talent = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Talent
      .addCase(createTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTalent.fulfilled, (state, action: PayloadAction<TalentProfile>) => {
        state.loading = false;
        state.talent = action.payload;
      })
      .addCase(createTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Talent by User ID
      .addCase(fetchTalentByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalentByUserId.fulfilled, (state, action: PayloadAction<TalentProfile>) => {
        state.loading = false;
        state.talent = action.payload;
      })
      .addCase(fetchTalentByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch All Talents
      .addCase(fetchAllTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTalents.fulfilled, (state, action: PayloadAction<TalentProfile[]>) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(fetchAllTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Talent
      .addCase(updateTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTalent.fulfilled, (state, action: PayloadAction<TalentProfile>) => {
        state.loading = false;
        state.talent = action.payload;
      })
      .addCase(updateTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Availability
      .addCase(updateAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvailability.fulfilled, (state, action: PayloadAction<TalentProfile>) => {
        state.loading = false;
        state.talent = action.payload;
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Talent
      .addCase(deleteTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTalent.fulfilled, (state) => {
        state.loading = false;
        state.talent = null;
      })
      .addCase(deleteTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTalent, clearError } = talentSlice.actions;
export default talentSlice.reducer;