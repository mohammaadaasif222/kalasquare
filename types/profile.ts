import { AvailabilityStatus, ExperienceLevel, TalentType } from "@/hooks/use-talent"

export interface ProfileFormData {
  first_name: string
  last_name: string
  display_name: string
  gender: string
  dob: string
  bio: string
  profile_image_url: string
  banner_image_url: string
  highest_education: string
  cintaId: string
  whatsapp: string
  location_city: string
  location_state: string
  location_country: string
  website_url: string
  languages: string
  talent_type: TalentType
  categories: string[]
  specializations: string[]
  experience_level: ExperienceLevel
  years_of_experience: number
  manager_contact: string
  rate_per_live: string
  rate_per_video: string
  rate_per_post: string
  currency: string
  availability_status: AvailabilityStatus
  portfolio_description: string
  achievements: string
  awards: Array<{ url: string; name: string }>
  certifications: Array<{ url: string; name: string }>
  collaboration_preferences: string
}


export interface UserProfile extends ProfileFormData {
  id: string
  user_id: string
  user:{
    email:string,
    phone:string
  }
  created_at: string
  updated_at: string
}
