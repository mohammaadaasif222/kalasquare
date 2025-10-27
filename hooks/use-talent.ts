// hooks/useTalent.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  createTalent,
  fetchTalentByUserId,
  fetchAllTalents,
  updateTalent,
  updateAvailability,
  deleteTalent,
  clearTalent,
  clearError,
} from '@/lib/redux/features/talent/talentSlice';
import { CreateTalentDto, UpdateTalentDto } from '@/types/profile.types';

export type TalentType = 'artist' | 'influencer' | 'both' |'actor';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'professional' | 'expert';
export type AvailabilityStatus = 'available' | 'busy' | 'booked' | 'inactive';


interface TalentFilters {
  talent_type?: TalentType;
  experience_level?: ExperienceLevel;
  availability_status?: AvailabilityStatus;
  min_rate?: number;
  max_rate?: number;
}

/**
 * Main hook for managing talent profiles
 * Provides access to talent state and all CRUD operations
 */
export const useTalent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { talent, talents, loading, error } = useSelector((state: RootState) => state.talent);

  const handleCreateTalent = useCallback(
    async (data: CreateTalentDto) => {
      const result = await dispatch(createTalent(data));
      return result;
    },
    [dispatch]
  );

  const handleFetchTalentByUserId = useCallback(
    async (userId: string) => {
      const result = await dispatch(fetchTalentByUserId(userId));
      return result;
    },
    [dispatch]
  );

  const handleFetchAllTalents = useCallback(
    async (filters: TalentFilters = {}) => {
      const result = await dispatch(fetchAllTalents(filters));
      return result;
    },
    [dispatch]
  );

  const handleUpdateTalent = useCallback(
    async (userId: string, data: UpdateTalentDto) => {
      const result = await dispatch(updateTalent({ userId, data }));
      return result;
    },
    [dispatch]
  );

  const handleUpdateAvailability = useCallback(
    async (userId: string, status: AvailabilityStatus) => {
      const result = await dispatch(updateAvailability({ userId, status }));
      return result;
    },
    [dispatch]
  );

  const handleDeleteTalent = useCallback(
    async (userId: string) => {
      const result = await dispatch(deleteTalent(userId));
      return result;
    },
    [dispatch]
  );

  const handleClearTalent = useCallback(() => {
    dispatch(clearTalent());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    talent,
    talents,
    loading,
    error,
    
    // Actions
    createTalent: handleCreateTalent,
    fetchTalentByUserId: handleFetchTalentByUserId,
    fetchAllTalents: handleFetchAllTalents,
    updateTalent: handleUpdateTalent,
    updateAvailability: handleUpdateAvailability,
    deleteTalent: handleDeleteTalent,
    clearTalent: handleClearTalent,
    clearError: handleClearError,
  };
};

/**
 * Hook for accessing talent state only (read-only)
 * Useful for components that only need to display data
 */
export const useTalentState = () => {
  const { talent, talents, loading, error } = useSelector((state: RootState) => state.talent);
  
  return {
    talent,
    talents,
    loading,
    error,
  };
};

/**
 * Hook for creating a new talent profile
 * Isolated hook for components that only handle creation
 */
export const useCreateTalent = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.talent);

  const create = useCallback(
    async (data: CreateTalentDto) => {
      const result = await dispatch(createTalent(data));
      return result;
    },
    [dispatch]
  );

  return {
    createTalent: create,
    loading,
    error,
  };
};

/**
 * Hook for updating an existing talent profile
 * Isolated hook for components that only handle updates
 */
export const useUpdateTalent = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.talent);

  const update = useCallback(
    async (userId: string, data: UpdateTalentDto) => {
      const result = await dispatch(updateTalent({ userId, data }));
      return result;
    },
    [dispatch]
  );

  const updateStatus = useCallback(
    async (userId: string, status: AvailabilityStatus) => {
      const result = await dispatch(updateAvailability({ userId, status }));
      return result;
    },
    [dispatch]
  );

  return {
    updateTalent: update,
    updateAvailability: updateStatus,
    loading,
    error,
  };
};

/**
 * Hook for fetching talent profiles
 * Isolated hook for components that only need to fetch data
 */
export const useFetchTalent = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { talents, loading, error } = useSelector((state: RootState) => state.talent);

  const fetchByUserId = useCallback(
    async (userId: string) => {
      const result = await dispatch(fetchTalentByUserId(userId));
      return result;
    },
    [dispatch]
  );

  const fetchAll = useCallback(
    async (filters: TalentFilters = {}) => {
      const result = await dispatch(fetchAllTalents(filters));
      return result;
    },
    [dispatch]
  );

  return {
    fetchTalentByUserId: fetchByUserId,
    fetchAllTalents: fetchAll,
    talents,
    loading,
    error,
  };
};

/**
 * Hook for deleting a talent profile
 * Isolated hook for components that handle deletion
 */
export const useDeleteTalent = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.talent);

  const remove = useCallback(
    async (userId: string) => {
      const result = await dispatch(deleteTalent(userId));
      return result;
    },
    [dispatch]
  );

  return {
    deleteTalent: remove,
    loading,
    error,
  };
};

/**
 * Hook for accessing the current user's talent profile
 * Assumes you have a way to get the current user ID
 */
export const useCurrentTalent = (userId?: string) => {
    const dispatch = useDispatch<AppDispatch>();
  const { talent, loading, error } = useSelector((state: RootState) => state.talent);

  const fetchCurrent = useCallback(async () => {
    if (userId) {
      const result = await dispatch(fetchTalentByUserId(userId));
      return result;
    }
  }, [dispatch, userId]);

  return {
    talent,
    loading,
    error,
    fetchCurrent,
  };
};

/**
 * Hook for availability management
 * Specialized hook for components that only manage availability status
 */
export const useTalentAvailability = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { talent, loading, error } = useSelector((state: RootState) => state.talent);

  const setAvailability = useCallback(
    async (userId: string, status: AvailabilityStatus) => {
      const result = await dispatch(updateAvailability({ userId, status }));
      return result;
    },
    [dispatch]
  );

  return {
    currentStatus: talent?.availability_status,
    setAvailability,
    loading,
    error,
  };
};