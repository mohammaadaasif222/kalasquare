// store/features/socials/useSocials.ts
import { useEffect } from 'react';

import {
  fetchSocialAccounts,
  fetchSocialAccount,
  createSocialAccount,
  updateSocialAccount,
  deleteSocialAccount,
  setPrimarySocialAccount,
  fetchByPlatform,
  clearError,
  clearSuccess,
  clearMessages,
  selectSocials,
  selectCurrentSocial,
  selectSocialsLoading,
  selectSocialsError,
  selectSocialsSuccess,
} from '@/lib/redux/features/social/socialSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { CreateSocialAccountDto, Platform, UpdateSocialAccountDto } from '@/types/social.types';

export const useSocials = (talentProfileId?: string) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectSocials);
  const currentAccount = useAppSelector(selectCurrentSocial);
  const loading = useAppSelector(selectSocialsLoading);
  const error = useAppSelector(selectSocialsError);
  const success = useAppSelector(selectSocialsSuccess);

  useEffect(() => {
    if (talentProfileId) {
      dispatch(fetchSocialAccounts(talentProfileId));
    }
  }, [dispatch, talentProfileId]);

  const loadAccounts = (talentId: string) => {
    return dispatch(fetchSocialAccounts(talentId));
  };

  const loadAccount = (accountId: string) => {
    return dispatch(fetchSocialAccount(accountId));
  };

  const createAccount = (data: CreateSocialAccountDto) => {
    return dispatch(createSocialAccount(data));
  };

  const updateAccount = (accountId: string, data: UpdateSocialAccountDto) => {
    return dispatch(updateSocialAccount({ accountId, data }));
  };

  const deleteAccount = (accountId: string) => {
    return dispatch(deleteSocialAccount(accountId));
  };

  const setPrimary = (accountId: string) => {
    return dispatch(setPrimarySocialAccount(accountId));
  };

  const loadByPlatform = (talentId: string, platform: Platform) => {
    return dispatch(fetchByPlatform({ talentProfileId: talentId, platform }));
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  const clearSuccessMessage = () => {
    dispatch(clearSuccess());
  };

  const clearAllMessages = () => {
    dispatch(clearMessages());
  };

  return {
    accounts,
    currentAccount,
    loading,
    error,
    success,
    loadAccounts,
    loadAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    setPrimary,
    loadByPlatform,
    clearErrorMessage,
    clearSuccessMessage,
    clearAllMessages,
  };
};