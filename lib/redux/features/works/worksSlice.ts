// // src/store/slices/workSamplesSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Types
// export enum WorkSampleType {
//   video = 'video',
//   image = 'image',
//   reel = 'reel',
//   other = 'other',
// }

// export interface WorkSample {
//   id: string;
//   talentProfileId: string;
//   title: string;
//   type: WorkSampleType;
//   url: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateWorkSamplePayload {
//   talentProfileId: string;
//   title: string;
//   type: WorkSampleType;
//   url: string;
// }

// export interface UpdateWorkSamplePayload {
//   id: string;
//   data: Partial<CreateWorkSamplePayload>;
// }

// export interface QueryWorkSampleParams {
//   talentProfileId?: string;
//   type?: WorkSampleType;
// }

// interface WorkSamplesState {
//   items: WorkSample[];
//   currentWorkSample: WorkSample | null;
//   loading: boolean;
//   error: string | null;
// }

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// // Async thunks
// export const fetchWorkSamples = createAsyncThunk(
//   'workSamples/fetchAll',
//   async (params: QueryWorkSampleParams, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<WorkSample[]>(`${API_BASE_URL}/work-samples`, { params });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch work samples');
//     }
//   }
// );

// export const fetchWorkSampleById = createAsyncThunk(
//   'workSamples/fetchById',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<WorkSample>(`${API_BASE_URL}/work-samples/${id}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch work sample');
//     }
//   }
// );

// export const fetchWorkSamplesByTalentProfile = createAsyncThunk(
//   'workSamples/fetchByTalentProfile',
//   async (talentProfileId: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<WorkSample[]>(
//         `${API_BASE_URL}/work-samples/talent-profile/${talentProfileId}`
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch work samples');
//     }
//   }
// );

// export const createWorkSample = createAsyncThunk(
//   'workSamples/create',
//   async (payload: CreateWorkSamplePayload, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<WorkSample>(`${API_BASE_URL}/work-samples`, payload);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to create work sample');
//     }
//   }
// );

// export const updateWorkSample = createAsyncThunk(
//   'workSamples/update',
//   async ({ id, data }: UpdateWorkSamplePayload, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch<WorkSample>(`${API_BASE_URL}/work-samples/${id}`, data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to update work sample');
//     }
//   }
// );

// export const deleteWorkSample = createAsyncThunk(
//   'workSamples/delete',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/work-samples/${id}`);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to delete work sample');
//     }
//   }
// );

// // Initial state
// const initialState: WorkSamplesState = {
//   items: [],
//   currentWorkSample: null,
//   loading: false,
//   error: null,
// };

// // Slice
// const workSamplesSlice = createSlice({
//   name: 'workSamples',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearCurrentWorkSample: (state) => {
//       state.currentWorkSample = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch all work samples
//     builder
//       .addCase(fetchWorkSamples.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWorkSamples.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWorkSamples.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Fetch work sample by ID
//     builder
//       .addCase(fetchWorkSampleById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWorkSampleById.fulfilled, (state, action: PayloadAction<WorkSample>) => {
//         state.loading = false;
//         state.currentWorkSample = action.payload;
//       })
//       .addCase(fetchWorkSampleById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Fetch by talent profile
//     builder
//       .addCase(fetchWorkSamplesByTalentProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWorkSamplesByTalentProfile.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWorkSamplesByTalentProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Create work sample
//     builder
//       .addCase(createWorkSample.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createWorkSample.fulfilled, (state, action: PayloadAction<WorkSample>) => {
//         state.loading = false;
//         state.items.unshift(action.payload);
//       })
//       .addCase(createWorkSample.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Update work sample
//     builder
//       .addCase(updateWorkSample.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateWorkSample.fulfilled, (state, action: PayloadAction<WorkSample>) => {
//         state.loading = false;
//         const index = state.items.findIndex((item) => item.id === action.payload.id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//         if (state.currentWorkSample?.id === action.payload.id) {
//           state.currentWorkSample = action.payload;
//         }
//       })
//       .addCase(updateWorkSample.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Delete work sample
//     builder
//       .addCase(deleteWorkSample.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteWorkSample.fulfilled, (state, action: PayloadAction<string>) => {
//         state.loading = false;
//         state.items = state.items.filter((item) => item.id !== action.payload);
//         if (state.currentWorkSample?.id === action.payload) {
//           state.currentWorkSample = null;
//         }
//       })
//       .addCase(deleteWorkSample.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Selectors
// export const selectAllWorkSamples = (state: { workSamples: WorkSamplesState }) => state.workSamples.items;
// export const selectCurrentWorkSample = (state: { workSamples: WorkSamplesState }) => state.workSamples.currentWorkSample;
// export const selectWorkSamplesLoading = (state: { workSamples: WorkSamplesState }) => state.workSamples.loading;
// export const selectWorkSamplesError = (state: { workSamples: WorkSamplesState }) => state.workSamples.error;

// export const { clearError, clearCurrentWorkSample } = workSamplesSlice.actions;
// export default workSamplesSlice.reducer;




import { WorkSampleType, WorkStatus } from '@/components/works/work-sample';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/api/axios';
// Types
export interface WorkSample {
  id: string;
  talentProfileId: string;
  type: WorkSampleType;
  status: WorkStatus;
  title?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkSampleDto {
  talentProfileId: string;
  type: WorkSampleType;
  title?: string;
  url?: string;
}

export interface UpdateWorkSampleDto {
  type?: WorkSampleType;
  title?: string;
  url?: string;
  status?: WorkStatus;
}

export interface QueryWorkSampleDto {
  talentProfileId?: string;
  type?: WorkSampleType;
  status?: WorkStatus;
}

interface WorkSampleState {
  workSamples: WorkSample[];
  currentWorkSample: WorkSample | null;
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: WorkSampleState = {
  workSamples: [],
  currentWorkSample: null,
  loading: false,
  error: null,
  count: 0,
};

// Async Thunks
export const createWorkSample = createAsyncThunk(
  'workSample/create',
  async (data: CreateWorkSampleDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/work-samples', data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkSamples = createAsyncThunk(
  'workSample/fetchAll',
  async (query: QueryWorkSampleDto, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (query?.talentProfileId) params.append('talentProfileId', query.talentProfileId);
      if (query?.type) params.append('type', query.type as any);
      if (query?.status) params.append('status', query.status as any);

      const response = await axiosInstance.get(`/work-samples?${params.toString()}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkSampleById = createAsyncThunk(
  'workSample/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/work-samples/${id}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkSamplesByTalentProfile = createAsyncThunk(
  'workSample/fetchByTalentProfile',
  async (
    {
      talentProfileId,
      queryParams = {},
    }: { talentProfileId: string; queryParams?: Record<string, any> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/work-samples/talent/${talentProfileId}`,
        { params: queryParams } // Axios handles query params automatically
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchWorkSamplesByType = createAsyncThunk(
  'workSample/fetchByType',
  async (type: WorkSampleType, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/work-samples/type/${type}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch work samples');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkSamplesByStatus = createAsyncThunk(
  'workSample/fetchByStatus',
  async (status: WorkStatus, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/work-samples/status/${status}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch work samples');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWorkSample = createAsyncThunk(
  'workSample/update',
  async ({ id, data }: { id: string; data: UpdateWorkSampleDto }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/work-samples/${id}`, data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWorkSampleStatus = createAsyncThunk(
  'workSample/updateStatus',
  async ({ id, status }: { id: string; status: WorkStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/work-samples/${id}/status`, { status });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkSample = createAsyncThunk(
  'workSample/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/work-samples/${id}`)
      return { id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkSamplesByTalentProfile = createAsyncThunk(
  'workSample/deleteByTalentProfile',
  async (talentProfileId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/work-samples/talent/${talentProfileId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to delete work samples');
      }
      return { talentProfileId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const countWorkSamples = createAsyncThunk(
  'workSample/count',
  async (query: QueryWorkSampleDto, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (query?.talentProfileId) params.append('talentProfileId', query.talentProfileId);
      if (query?.type) params.append('type', query.type as any);
      if (query?.status) params.append('status', query.status as any);

      const response = await fetch(`/api/work-samples/count?${params.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to count work samples');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const workSampleSlice = createSlice({
  name: 'workSample',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentWorkSample: (state) => {
      state.currentWorkSample = null;
    },
    resetWorkSamples: (state) => {
      state.workSamples = [];
      state.currentWorkSample = null;
      state.error = null;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createWorkSample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkSample.fulfilled, (state, action: PayloadAction<WorkSample>) => {
        state.loading = false;
        state.workSamples.unshift(action.payload);
      })
      .addCase(createWorkSample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All
      .addCase(fetchWorkSamples.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSamples.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
        state.loading = false;
        state.workSamples = action.payload;
      })
      .addCase(fetchWorkSamples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By ID
      .addCase(fetchWorkSampleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSampleById.fulfilled, (state, action: PayloadAction<WorkSample>) => {
        state.loading = false;
        state.currentWorkSample = action.payload;
      })
      .addCase(fetchWorkSampleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By Talent Profile
      .addCase(fetchWorkSamplesByTalentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSamplesByTalentProfile.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
        state.loading = false;
        state.workSamples = action.payload;
      })
      .addCase(fetchWorkSamplesByTalentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By Type
      .addCase(fetchWorkSamplesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSamplesByType.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
        state.loading = false;
        state.workSamples = action.payload;
      })
      .addCase(fetchWorkSamplesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By Status
      .addCase(fetchWorkSamplesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSamplesByStatus.fulfilled, (state, action: PayloadAction<WorkSample[]>) => {
        state.loading = false;
        state.workSamples = action.payload;
      })
      .addCase(fetchWorkSamplesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateWorkSample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkSample.fulfilled, (state, action: PayloadAction<WorkSample>) => {
        state.loading = false;
        const index = state.workSamples.findIndex((ws) => ws.id === action.payload.id);
        if (index !== -1) {
          state.workSamples[index] = action.payload;
        }
        if (state.currentWorkSample?.id === action.payload.id) {
          state.currentWorkSample = action.payload;
        }
      })
      .addCase(updateWorkSample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Status
      .addCase(updateWorkSampleStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkSampleStatus.fulfilled, (state, action: PayloadAction<WorkSample>) => {
        state.loading = false;
        const index = state.workSamples.findIndex((ws) => ws.id === action.payload.id);
        if (index !== -1) {
          state.workSamples[index] = action.payload;
        }
        if (state.currentWorkSample?.id === action.payload.id) {
          state.currentWorkSample = action.payload;
        }
      })
      .addCase(updateWorkSampleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteWorkSample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkSample.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.workSamples = state.workSamples.filter((ws) => ws.id !== action.payload.id);
        if (state.currentWorkSample?.id === action.payload.id) {
          state.currentWorkSample = null;
        }
      })
      .addCase(deleteWorkSample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete By Talent Profile
      .addCase(deleteWorkSamplesByTalentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkSamplesByTalentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.workSamples = state.workSamples.filter(
          (ws) => ws.talentProfileId !== action.payload.talentProfileId
        );
      })
      .addCase(deleteWorkSamplesByTalentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Count
      .addCase(countWorkSamples.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countWorkSamples.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(countWorkSamples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentWorkSample, resetWorkSamples } = workSampleSlice.actions;
export default workSampleSlice.reducer;