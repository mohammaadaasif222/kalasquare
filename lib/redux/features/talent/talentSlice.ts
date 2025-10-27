// store/slices/talentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';
import { CreateTalentDto, UpdateTalentDto } from '@/types/profile.types';
import { AvailabilityStatus, ExperienceLevel, TalentType } from '@/hooks/use-talent';
import { TalentProfile } from '@/types/talent.types';



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
  async (data: CreateTalentDto, { rejectWithValue }) => {
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
  async ({ userId, data }: { userId: string; data: UpdateTalentDto }, { rejectWithValue }) => {
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