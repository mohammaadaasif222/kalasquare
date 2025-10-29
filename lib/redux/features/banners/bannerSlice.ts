import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Banner, BannerType, CreateBannerInput, UpdateBannerInput } from '@/types/banner.types';
import axiosInstance from '@/lib/api/axios';
import axios from 'axios';
interface BannerState {
  banners: Banner[];
  currentBanner: Banner | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  currentBanner: null,
  loading: false,
  error: null,
};


// Async Thunks
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (type?: BannerType) => {
    const url = type ? `/banners?type=${type}` : `/banners`;
    const response = await axiosInstance.get(url);
    return response.data;
  }
);

export const fetchBannerById = createAsyncThunk(
  'banner/fetchBannerById',
  async (id: string) => {
    const response = await axiosInstance.get(`/banners/${id}`);
    return response.data;
  }
);

export const createBanner = createAsyncThunk(
  'banner/createBanner',
  async (data: CreateBannerInput) => {
    const response = await axiosInstance.post(`/banners`,data);
    return response.data;
  }
);

export const updateBanner = createAsyncThunk(
  'banner/updateBanner',
  async ({ id, data }: { id: string; data: UpdateBannerInput }) => {
    const response = await axiosInstance.patch(`/banners/${id}`, data);
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  'banner/deleteBanner',
  async (id: string) => {
    await axiosInstance.delete(`/banners/${id}`);
    return id;
  }
);

// Slice
const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBanner: (state) => {
      state.currentBanner = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all banners
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banners';
      });

    // Fetch single banner
    builder
      .addCase(fetchBannerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBannerById.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.loading = false;
        state.currentBanner = action.payload;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch banner';
      });

    // Create banner
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.loading = false;
        state.banners.unshift(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create banner';
      });

    // Update banner
    builder
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.loading = false;
        const index = state.banners.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        if (state.currentBanner?.id === action.payload.id) {
          state.currentBanner = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update banner';
      });

    // Delete banner
    builder
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.banners = state.banners.filter((b) => b.id !== action.payload);
        if (state.currentBanner?.id === action.payload) {
          state.currentBanner = null;
        }
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete banner';
      });
  },
});

export const { clearError, clearCurrentBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
