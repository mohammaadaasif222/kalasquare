"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store"; // adjust path as per your setup
import {
  createProfile,
  updateProfile,
  clearError,
} from "@/lib/redux/features/profile/profileSlice";
import { useState } from "react";
import { CreateProfileData, UpdateProfileData } from "@/types/profile.types";

interface UseProfileApiReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  submitProfile: (data: CreateProfileData | UpdateProfileData, userId?: string) => Promise<void>;
  resetState: () => void;
}


export function useProfileApi(): UseProfileApiReturn {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const [success, setSuccess] = useState(false);

  const submitProfile = async (data: CreateProfileData | UpdateProfileData, userId?: string) => {
    setSuccess(false);
    const { 
      first_name,
      last_name,
      display_name,
      bio,
      profile_image_url,
      banner_image_url,

      // Location & Contact
      location_city,
      location_state,
      location_country,
      website_url,
      languages,
    } = data
    const payload = {
      first_name,
      last_name,
      display_name,
      bio,
      profile_image_url,
      banner_image_url,

      // Location & Contact
      location_city,
      location_state,
      location_country,
      website_url,
      languages,
  
    }
    try {
      let action;
      if (userId) {
        // Updating existing profile
        action = await dispatch(updateProfile({ userId, data: payload }));
      } else {
        // Creating new profile
        action = await dispatch(createProfile(payload as CreateProfileData));
      }

      if (action.meta.requestStatus === "fulfilled") {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error("[useProfileApi] Error submitting profile:", err);
    }
  };

  const resetState = () => {
    dispatch(clearError());
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    submitProfile,
    resetState,
  };
}
