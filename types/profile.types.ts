import { AvailabilityStatus, ExperienceLevel, TalentType } from "@/hooks/use-talent"

export interface UserProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  display_name?: string
  bio?: string
  dob?: string
  gender?: string,
  highest_education: string
  profile_image_url?: string
  banner_image_url?: string
  location_city?: string
  location_state?: string
  location_country?: string
  website_url?: string
  cintaId?: string
  whatsapp?: string
  languages?: any
  time_zone?: string
  created_at: string
  updated_at: string
  user: {
    email: string
    phone: string
  }
}

export interface CreateProfileData {
  user_id: string
  first_name: string
  last_name: string
  display_name?: string
  bio?: string
  dob?: string
  gender?: string
  profile_image_url?: string
  banner_image_url?: string
  location_city?: string
  location_state?: string
  location_country?: string
  website_url?: string
  languages?: any
  cintaId?: string
  highest_education: string
  whatsapp?: string
}

export interface UpdateProfileData {
  first_name?: string
  last_name?: string
  display_name?: string
  bio?: string
  dob?: string
  gender?: string
  profile_image_url?: string
  banner_image_url?: string
  location_city?: string
  location_state?: string
  pin_code?:string
  location_country?: string
  website_url?: string
  languages?: any
  cintaId?: string
  whatsapp:string
  highest_education: string
}

export interface CreateTalentDto {
  user_id: string
  talent_type: TalentType
  categories: any
  specializations?: any
  experience_level: ExperienceLevel
  years_of_experience?: number
  rate_per_live?: number
  rate_per_video?: number
  rate_per_post?: number
  currency?: string
  availability_status?: AvailabilityStatus
  portfolio_description?: string
  achievements?: string
  awards?: any
  certifications?: any
  collaboration_preferences?: any
  manager_contact?: string
}

export interface UpdateTalentDto {
  talent_type?: string
  categories?: any
  specializations?: any
  experience_level?: ExperienceLevel
  years_of_experience?: number
  rate_per_live?: number
  rate_per_video?: number
  rate_per_post?: number
  currency?: string
  availability_status?: AvailabilityStatus
  portfolio_description?: string
  achievements?: string
  awards?: any
  certifications?: any
  collaboration_preferences?: any
  education?: any
  manager_contact?: string
}
