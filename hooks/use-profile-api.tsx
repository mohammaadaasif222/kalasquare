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
      gender,
      profile_image_url,
      banner_image_url,
      whatsapp,
      highest_education,
      dob,
      location_city,
      location_state,
      location_country,
      website_url,
      languages,
    } = data;

    const payload: UpdateProfileData = {
      first_name,
      last_name,
      display_name,
      bio,
      gender,
      profile_image_url,
      banner_image_url,
      whatsapp: whatsapp ?? "",               // ✅ ensures non-undefined
      highest_education: highest_education ?? "", // ✅ ensures non-undefined
      dob,
      location_city,
      location_state,
      location_country,
      website_url,
      languages,
    };

    try {
      let action;
      if (userId) {
        // Updating existing profile
        action = await dispatch(updateProfile({ userId, data: payload }));
      } else {
        // Creating new profile
        action = await dispatch(createProfile(payload as CreateProfileData));
      }

      setSuccess(action.meta.requestStatus === "fulfilled");
    } catch (err) {
      console.error("[useProfileApi] Error submitting profile:", err);
      setSuccess(false);
    }
  };


  const resetState = () => {
    dispatch(clearError());
    setSuccess(false);
  };

  return {
    loading,
    error: "",
    success,
    submitProfile,
    resetState,
  };
}
