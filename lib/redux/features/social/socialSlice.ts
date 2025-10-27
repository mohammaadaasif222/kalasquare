// // store/slices/talentSocialSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axiosInstance from '@/lib/api/axios';

// type Platform = 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin' | 'spotify' | 'other';

// interface TalentSocialAccount {
//   id: string;
//   talent_profile_id: string;
//   platform: Platform;
//   handle: string;
//   profile_url: string;
//   followers_count?: number;
//   engagement_rate?: number;
//   is_verified?: boolean;
//   is_primary?: boolean;
//   last_updated: string;
// }

// interface CreateSocialAccountData {
//   talent_profile_id: string;
//   platform: Platform;
//   handle: string;
//   profile_url: string;
//   followers_count?: number;
//   engagement_rate?: number;
//   is_verified?: boolean;
//   is_primary?: boolean;
// }

// interface UpdateSocialAccountData {
//   handle?: string;
//   profile_url?: string;
//   followers_count?: number;
//   engagement_rate?: number;
//   is_verified?: boolean;
//   is_primary?: boolean;
// }

// interface TalentSocialState {
//   socialAccounts: TalentSocialAccount[];
//   currentAccount: TalentSocialAccount | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TalentSocialState = {
//   socialAccounts: [],
//   currentAccount: null,
//   loading: false,
//   error: null,
// };

// // Async Thunks
// export const createSocialAccount = createAsyncThunk(
//   'talentSocial/create',
//   async ({ userId, data }: { userId: string; data: CreateSocialAccountData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/talents/${userId}/social-accounts`, data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to create social account');
//     }
//   }
// );

// export const fetchSocialAccounts = createAsyncThunk(
//   'talentSocial/fetchAll',
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/talents/${userId}/social-accounts`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch social accounts');
//     }
//   }
// );

// export const fetchSocialAccount = createAsyncThunk(
//   'talentSocial/fetchOne',
//   async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/talents/${userId}/social-accounts/${accountId}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch social account');
//     }
//   }
// );

// export const updateSocialAccount = createAsyncThunk(
//   'talentSocial/update',
//   async (
//     { userId, accountId, data }: { userId: string; accountId: string; data: UpdateSocialAccountData },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.patch(`/talents/${userId}/social-accounts/${accountId}`, data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to update social account');
//     }
//   }
// );

// export const setPrimarySocialAccount = createAsyncThunk(
//   'talentSocial/setPrimary',
//   async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.patch(`/talents/${userId}/social-accounts/${accountId}/set-primary`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to set primary account');
//     }
//   }
// );

// export const deleteSocialAccount = createAsyncThunk(
//   'talentSocial/delete',
//   async ({ userId, accountId }: { userId: string; accountId: string }, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/talents/${userId}/social-accounts/${accountId}`);
//       return accountId;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to delete social account');
//     }
//   }
// );

// // Slice
// const talentSocialSlice = createSlice({
//   name: 'talentSocial',
//   initialState,
//   reducers: {
//     clearSocialAccounts: (state) => {
//       state.socialAccounts = [];
//       state.currentAccount = null;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Social Account
//       .addCase(createSocialAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
//         state.loading = false;
//         state.socialAccounts.push(action.payload);
//       })
//       .addCase(createSocialAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Fetch All Social Accounts
//       .addCase(fetchSocialAccounts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSocialAccounts.fulfilled, (state, action: PayloadAction<TalentSocialAccount[]>) => {
//         state.loading = false;
//         state.socialAccounts = action.payload;
//       })
//       .addCase(fetchSocialAccounts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Fetch Single Social Account
//       .addCase(fetchSocialAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
//         state.loading = false;
//         state.currentAccount = action.payload;
//       })
//       .addCase(fetchSocialAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Update Social Account
//       .addCase(updateSocialAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateSocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
//         state.loading = false;
//         const index = state.socialAccounts.findIndex((acc) => acc.id === action.payload.id);
//         if (index !== -1) {
//           state.socialAccounts[index] = action.payload;
//         }
//         state.currentAccount = action.payload;
//       })
//       .addCase(updateSocialAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Set Primary Social Account
//       .addCase(setPrimarySocialAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(setPrimarySocialAccount.fulfilled, (state, action: PayloadAction<TalentSocialAccount>) => {
//         state.loading = false;
//         // Update all accounts - set only the returned one as primary
//         state.socialAccounts = state.socialAccounts.map((acc) => ({
//           ...acc,
//           is_primary: acc.id === action.payload.id,
//         }));
//       })
//       .addCase(setPrimarySocialAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Delete Social Account
//       .addCase(deleteSocialAccount.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteSocialAccount.fulfilled, (state, action: PayloadAction<string>) => {
//         state.loading = false;
//         state.socialAccounts = state.socialAccounts.filter((acc) => acc.id !== action.payload);
//         if (state.currentAccount?.id === action.payload) {
//           state.currentAccount = null;
//         }
//       })
//       .addCase(deleteSocialAccount.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearSocialAccounts, clearError } = talentSocialSlice.actions;
// export default talentSocialSlice.reducer;



// store/features/socials/socialsSlice.ts




import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CreateSocialAccountDto, Platform, SocialAccount, UpdateSocialAccountDto } from '@/types/social.types';
import axiosInstance from '@/lib/api/axios';


interface SocialsState {
  accounts: SocialAccount[];
  currentAccount: SocialAccount | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: SocialsState = {
  accounts: [],
  currentAccount: null,
  loading: false,
  error: null,
  success: null,
};

// Async thunks
export const fetchSocialAccounts = createAsyncThunk(
  'socials/fetchByTalentId',
  async (talentProfileId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/socials/talent/${talentProfileId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const fetchSocialAccount = createAsyncThunk(
  'socials/fetchOne',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/socials/${accountId}`);
      if (!response.ok) throw new Error('Failed to fetch social account');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const createSocialAccount = createAsyncThunk(
  'socials/create',
  async (data: CreateSocialAccountDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/socials`, data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const updateSocialAccount = createAsyncThunk(
  'socials/update',
  async ({ accountId, data }: { accountId: string; data: UpdateSocialAccountDto }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/socials/${accountId}`, data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const deleteSocialAccount = createAsyncThunk(
  'socials/delete',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/socials/${accountId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete social account');
      return accountId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const setPrimarySocialAccount = createAsyncThunk(
  'socials/setPrimary',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/socials/${accountId}/primary`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to set primary account');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const fetchByPlatform = createAsyncThunk(
  'socials/fetchByPlatform',
  async ({ talentProfileId, platform }: { talentProfileId: string; platform: Platform }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/socials/talent/${talentProfileId}/platform/${platform}`);
      if (!response.ok) throw new Error('Failed to fetch accounts by platform');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Slice
const socialsSlice = createSlice({
  name: 'socials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all accounts
      .addCase(fetchSocialAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchSocialAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single account
      .addCase(fetchSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAccount = action.payload;
      })
      .addCase(fetchSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create account
      .addCase(createSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createSocialAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
        state.success = 'Social account created successfully';
      })
      .addCase(createSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update account
      .addCase(updateSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateSocialAccount.fulfilled, (state, action) => {
        state.loading = false;
        // const index = state.accounts.findIndex(acc => acc.id === action.payload.id);
        // if (index !== -1) {
        //   state.accounts[index] = action.payload;
        // }
        state.success = 'Social account updated successfully';
      })
      .addCase(updateSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete account
      .addCase(deleteSocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteSocialAccount.fulfilled, (state, action) => {
        state.loading = false;
        // state.accounts = state.accounts.filter(acc => acc.id !== action.payload);
        state.success = 'Social account deleted successfully';
      })
      .addCase(deleteSocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Set primary
      .addCase(setPrimarySocialAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(setPrimarySocialAccount.fulfilled, (state, action) => {
        state.loading = false;
        // state.accounts = state.accounts.map(acc => ({
        //   ...acc,
        //   is_primary: acc.id === action.payload.id,
        // }));
        state.success = 'Primary account updated successfully';
      })
      .addCase(setPrimarySocialAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch by platform
      .addCase(fetchByPlatform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByPlatform.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchByPlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess, clearMessages } = socialsSlice.actions;

// Selectors
export const selectSocials = (state: RootState) => state.socials.accounts;
export const selectCurrentSocial = (state: RootState) => state.socials.currentAccount;
export const selectSocialsLoading = (state: RootState) => state.socials.loading;
export const selectSocialsError = (state: RootState) => state.socials.error;
export const selectSocialsSuccess = (state: RootState) => state.socials.success;

export default socialsSlice.reducer;