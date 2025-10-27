// Types
export enum Platform {
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  LINKEDIN = 'linkedin',
  SPOTIFY = 'spotify',
}

export interface SocialAccount {
  id: string;
  talent_profile_id: string;
  platform: Platform;
  handle: string;
  profile_url: string;
  followers_count: number;
  engagement_rate?: number;
  is_verified: boolean;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateSocialAccountDto {
  talent_profile_id: string;
  platform: Platform;
  handle: string;
  profile_url: string;
  followers_count?: number;
  engagement_rate?: number;
  is_verified?: boolean;
  is_primary?: boolean;
}

export interface UpdateSocialAccountDto {
  talent_profile_id: string;
  handle?: string;
  profile_url?: string;
  followers_count?: number;
  engagement_rate?: number;
  is_verified?: boolean;
  is_primary?: boolean;
}