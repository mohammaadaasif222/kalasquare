import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import {
  getCurrentUser,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  hardDeleteUser,
  getAdminUserList,
  getUserStats,
  getPublicTalents,
  getTalentProfile,
  clearUserError,
  clearUserSuccess,
  setSelectedUser,
  clearSelectedUser,
  clearCurrentUser,
  clearSelectedTalentProfile,
  resetUserState,
  User,
} from '@/lib/redux/features/user/userSlice';
import { updatePassword } from '@/lib/redux/features/auth/authSlice';


export const useAdminUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    adminUserList,
    adminPagination,
    userStats,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.users);

  // Fetch admin user list
  const fetchAdminUsers = useCallback((params?: {
    page?: number;
    limit?: number;
    search?: string;
    user_type?: string;
    talent_type?: string;
    is_premium?: boolean;
    is_active?: boolean;
    email_verified?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    return dispatch(getAdminUserList(params || {}));
  }, [dispatch]);

  // Fetch user statistics
  const fetchUserStats = useCallback(() => {
    return dispatch(getUserStats());
  }, [dispatch]);

  return {
    adminUserList,
    adminPagination,
    userStats,
    isLoading,
    error,
    fetchAdminUsers,
    fetchUserStats,
  };
};

// Hook for public talent browsing
export const useTalents = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    publicTalents,
    talentsPagination,
    selectedTalentProfile,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.users);

  // Fetch public talents
  const fetchTalents = useCallback((params?: {
    page?: number;
    limit?: number;
    search?: string;
    talent_type?: string;
    categories?: string;
    location_city?: string;
    min_followers?: number;
    verified_only?: boolean;
    sortBy?: 'followers' | 'created_at' | 'rating';
    sortOrder?: 'asc' | 'desc';
  }) => {
    return dispatch(getPublicTalents(params || {}));
  }, [dispatch]);

  // Fetch complete talent profile
  const fetchTalentProfile = useCallback((id: string) => {
    return dispatch(getTalentProfile(id));
  }, [dispatch]);

  // Clear selected talent profile
  const clearTalentProfile = useCallback(() => {
    dispatch(clearSelectedTalentProfile());
  }, [dispatch]);

  return {
    publicTalents,
    talentsPagination,
    selectedTalentProfile,
    isLoading,
    error,
    fetchTalents,
    fetchTalentProfile,
    clearTalentProfile,
  };
};

// Hook for public talent list with auto-fetch
export const useTalentList = (
  autoFetch = true,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    talent_type?: string;
    categories?: string;
    location_city?: string;
    min_followers?: number;
    verified_only?: boolean;
    sortBy?: 'followers' | 'created_at' | 'rating';
    sortOrder?: 'asc' | 'desc';
  }
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { publicTalents, talentsPagination, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );
 
  const fetchTalents = useCallback(() => {
    return dispatch(getPublicTalents(params || {}));
  }, [dispatch, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchTalents();
    }
  }, [autoFetch, fetchTalents]);

  return {
    talents: publicTalents,
    pagination: talentsPagination,
    isLoading,
    error,
    refetch: fetchTalents,
  };
};

// Hook for single talent profile
export const useTalentProfile = (talentId?: string, autoFetch = true) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTalentProfile, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );

  const fetchProfile = useCallback(() => {
    if (talentId) {
      return dispatch(getTalentProfile(talentId));
    }
  }, [dispatch, talentId]);

  useEffect(() => {
    if (autoFetch && talentId) {
      fetchProfile();
    }
  }, [autoFetch, talentId, fetchProfile]);

  const clearProfile = useCallback(() => {
    dispatch(clearSelectedTalentProfile());
  }, [dispatch]);

  return {
    profile: selectedTalentProfile,
    isLoading,
    error,
    refetch: fetchProfile,
    clearProfile,
  };
};

// ==================== EXISTING HOOKS ====================

// Main hook for user operations
export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    users,
    currentUser,
    selectedUser,
    pagination,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    success,
  } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch current user with optional relations
  const fetchCurrentUser = useCallback((params?: { profile?: boolean; talent?: boolean; socials?: boolean }) => {
    return dispatch(getCurrentUser({ userId: user?.id ?? "", params: params || {} }));
  }, [dispatch, user?.id]);

  // Fetch user by ID
  const fetchUserById = useCallback((id: string, params?: { profile?: boolean; talent?: boolean; socials?: boolean }) => {
    return dispatch(getUserById({ id, params }));
  }, [dispatch]);

  // Fetch all users
  const fetchUsers = useCallback((params?: { skip?: number; take?: number; includeProfiles?: boolean; user_type?: string }) => {
    return dispatch(getAllUsers(params || {}));
  }, [dispatch]);

  // Create new user
  const create = useCallback((data: { email: string; password: string; phone?: string; user_type: string }) => {
    return dispatch(createUser(data));
  }, [dispatch]);

  // Update user
  const update = useCallback((id: string, data: Partial<User>) => {
    return dispatch(updateUser({ id, data }));
  }, [dispatch]);

  // Soft delete user
  const remove = useCallback((id: string) => {
    return dispatch(deleteUser(id));
  }, [dispatch]);

  // Hard delete user
  const permanentDelete = useCallback((id: string) => {
    return dispatch(hardDeleteUser(id));
  }, [dispatch]);

  // Clear error message
  const clearUserErrorMessage = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Clear success message
  const clearSuccessMessage = useCallback(() => {
    dispatch(clearUserSuccess());
  }, [dispatch]);

  // Set selected user
  const selectUser = useCallback((user: User | null) => {
    dispatch(setSelectedUser(user));
  }, [dispatch]);

  // Clear selected user
  const clearSelected = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  // Logout (clear current user)
  const logout = useCallback(() => {
    dispatch(clearCurrentUser());
    localStorage.removeItem('authToken');
  }, [dispatch]);

  // Reset entire state
  const reset = useCallback(() => {
    dispatch(resetUserState());
  }, [dispatch]);

  return {
    // State
    users,
    currentUser,
    selectedUser,
    pagination,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    success,

    // Actions
    fetchCurrentUser,
    fetchUserById,
    fetchUsers,
    create,
    update,
    remove,
    permanentDelete,
    selectUser,
    clearSelected,
    clearUserErrorMessage,
    clearSuccessMessage,
    logout,
    reset,
  };
};

// Hook specifically for current authenticated user
export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading, error } = useSelector((state: RootState) => state.users);

  const fetchUser = useCallback((userId: string, params?: { profile?: boolean; talent?: boolean; socials?: boolean }) => {
    return dispatch(getCurrentUser({ userId, params: params || {} }));
  }, [dispatch]);

  const updateCurrentUser = useCallback((data: Partial<User>) => {
    if (!currentUser?.id) return;
    return dispatch(updateUser({ id: currentUser.id, data }));
  }, [dispatch, currentUser?.id]);

  return {
    currentUser,
    isLoading,
    error,
    fetchUser,
    updateCurrentUser,
  };
};

// Hook for auth operations
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, message, error } = useSelector((state: RootState) => state.auth);

  const updatePasw = useCallback((id: string, password: string) => {
    return dispatch(updatePassword({ id, password }));
  }, [dispatch]);

  return {
    isLoading,
    error,
    message,
    updatePasw
  };
};

// Hook for user list with auto-fetch
export const useUserList = (autoFetch = true, params?: { skip?: number; take?: number; includeProfiles?: boolean; user_type?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, pagination, isLoading, error } = useSelector((state: RootState) => state.users);

  const fetchUsers = useCallback(() => {
    return dispatch(getAllUsers(params || {}));
  }, [dispatch, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [autoFetch, fetchUsers]);

  return {
    users,
    pagination,
    isLoading,
    error,
    refetch: fetchUsers,
  };
};

// Hook for selected user operations
export const useSelectedUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, isLoading, isUpdating, isDeleting, error } = useSelector((state: RootState) => state.users);

  const select = useCallback((user: User | null) => {
    dispatch(setSelectedUser(user));
  }, [dispatch]);

  const fetchById = useCallback((id: string, params?: { profile?: boolean; talent?: boolean; socials?: boolean }) => {
    return dispatch(getUserById({ id, params }));
  }, [dispatch]);

  const update = useCallback((data: Partial<User>) => {
    if (!selectedUser?.id) return;
    return dispatch(updateUser({ id: selectedUser.id, data }));
  }, [dispatch, selectedUser?.id]);

  const remove = useCallback(() => {
    if (!selectedUser?.id) return;
    return dispatch(deleteUser(selectedUser.id));
  }, [dispatch, selectedUser?.id]);

  const clear = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  return {
    selectedUser,
    isLoading,
    isUpdating,
    isDeleting,
    error,
    select,
    fetchById,
    update,
    remove,
    clear,
  };
};