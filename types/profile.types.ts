
export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  bio?: string;
  profile_image_url?: string;
  banner_image_url?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  website_url?: string;
  languages?: any;
  time_zone?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData {
  user_id: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  bio?: string;
  profile_image_url?: string;
  banner_image_url?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  website_url?: string;
  languages?: any;
  time_zone?: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  bio?: string;
  profile_image_url?: string;
  banner_image_url?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  website_url?: string;
  languages?: any;
  time_zone?: string;
}

export interface ProfileState {
  profile: UserProfile | null;
  profiles: UserProfile[];
  loading: boolean;
  error: string | null;
}

export interface ProfileResponse{
    
}