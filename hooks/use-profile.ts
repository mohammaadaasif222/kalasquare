// hooks/useProfile.ts
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {
    CreateProfileData,
    UpdateProfileData,
    UserProfile,
} from '@/types/profile.types';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { clearProfile, createProfile, deleteProfile, fetchProfile, fetchProfileByUserId, searchProfiles, updateProfile } from '@/lib/redux/features/profile/profileSlice';
import { clearError } from '@/lib/redux/features/auth/authSlice';
import { fetchTalentByUserId } from '@/lib/redux/features/talent/talentSlice';

// Main profile hook
export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, profiles, loading, error } = useSelector(
        (state: RootState) => state.profile
    );

    useEffect(() => {
        handleFetchMe()
    }, [dispatch])

    const handleCreateProfile = useCallback(
        async (data: CreateProfileData) => {
            const result = await dispatch(createProfile(data));
            return result;
        },
        [dispatch]
    );
    const handleFetchProfile = useCallback(
        async (userId: string) => {
            const result = await dispatch(fetchTalentByUserId(userId));
            return result;
        },
        [dispatch]
    );
    const handleFetchMe = useCallback(
        async () => {
            const result = await dispatch(fetchProfile());
            return result;
        },
        [dispatch]
    );

    const handleUpdateProfile = useCallback(
        async (userId: string, data: UpdateProfileData) => {
            const result = await dispatch(updateProfile({ userId, data }));
            return result;
        },
        [dispatch]
    );

    const handleDeleteProfile = useCallback(
        async (userId: string) => {
            const result = await dispatch(deleteProfile(userId));
            return result;
        },
        [dispatch]
    );

    const handleSearchProfiles = useCallback(
        async (filters: {
            city?: string;
            state?: string;
            country?: string;
            display_name?: string;
        }) => {
            const result = await dispatch(searchProfiles(filters));
            return result;
        },
        [dispatch]
    );

    const handleClearProfile = useCallback(() => {
        dispatch(clearProfile());
    }, [dispatch]);

    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        profile,
        profiles,
        loading,
        error,
        createProfile: handleCreateProfile,
        fetchProfile: handleFetchProfile,
        updateProfile: handleUpdateProfile,
        deleteProfile: handleDeleteProfile,
        searchProfiles: handleSearchProfiles,
        clearProfile: handleClearProfile,
        clearError: handleClearError,
    };
};

// Hook for current profile only
export const useCurrentProfile = () => {
    const { profile, loading, error } = useSelector(
        (state: RootState) => state.profile
    );

    return {
        profile,
        loading,
        error,
        isLoaded: !loading && profile !== null,
        hasError: error !== null,
    };
};

// Hook for profile list/search
export const useProfileList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profiles, loading, error } = useSelector(
        (state: RootState) => state.profile
    );

    const handleSearch = useCallback(
        async (filters: {
            city?: string;
            state?: string;
            country?: string;
            display_name?: string;
        }) => {
            return await dispatch(searchProfiles(filters));
        },
        [dispatch]
    );

    return {
        profiles,
        loading,
        error,
        searchProfiles: handleSearch,
        isEmpty: profiles.length === 0,
        count: profiles.length,
    };
};

// Hook for profile mutations (create, update, delete)
export const useProfileMutations = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.profile);

    const create = useCallback(
        async (data: CreateProfileData) => {
            const result = await dispatch(createProfile(data));
            if (createProfile.fulfilled.match(result)) {
                return { success: true, data: result.payload };
            }
            return { success: false, error: result.payload as string };
        },
        [dispatch]
    );

    const update = useCallback(
        async (userId: string, data: UpdateProfileData) => {
            const result = await dispatch(updateProfile({ userId, data }));
            if (updateProfile.fulfilled.match(result)) {
                return { success: true, data: result.payload };
            }
            return { success: false, error: result.payload as string };
        },
        [dispatch]
    );

    const remove = useCallback(
        async (userId: string) => {
            const result = await dispatch(deleteProfile(userId));
            if (deleteProfile.fulfilled.match(result)) {
                return { success: true };
            }
            return { success: false, error: result.payload as string };
        },
        [dispatch]
    );

    return {
        create,
        update,
        delete: remove,
        loading,
        error,
        isProcessing: loading,
    };
};

// Hook for optimistic profile operations
export const useOptimisticProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading } = useSelector((state: RootState) => state.profile);

    const updateOptimistic = useCallback(
        async (userId: string, data: UpdateProfileData) => {
            // Return current profile immediately for optimistic UI
            const optimisticProfile = profile
                ? { ...profile, ...data }
                : null;

            // Dispatch actual update
            const result = await dispatch(updateProfile({ userId, data }));

            return {
                optimisticProfile,
                result,
                success: updateProfile.fulfilled.match(result),
            };
        },
        [dispatch, profile]
    );

    return {
        profile,
        loading,
        updateOptimistic,
    };
};

// Type-safe selector hooks
export const useProfileSelector = <T,>(
    selector: (profile: UserProfile | null) => T
): T => {
    const { profile } = useSelector((state: RootState) => state.profile);
    return selector(profile);
};

export const useProfilesSelector = <T,>(
    selector: (profiles: UserProfile[]) => T
): T => {
    const { profiles } = useSelector((state: RootState) => state.profile);
    return selector(profiles);
};