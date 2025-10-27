import { AvailabilityStatus, ExperienceLevel, TalentType } from "@/hooks/use-talent";

export interface TalentProfile {
  id: string;
  talent_type: TalentType;
  categories: any;
  specializations?: any;
  experience_level: ExperienceLevel;
  years_of_experience?: number;
  rate_per_live?: number;
  rate_per_video?: number;
  rate_per_post?: number;
  currency?: string;
  availability_status?: AvailabilityStatus;
  portfolio_description?: string;
  achievements?: string;
  awards?: any;
  certifications?: any;
  equipment_owned?: any;
  collaboration_preferences?: any;
  created_at: string;
  updated_at: string;
  socialAccounts?: any[];
  verify_badge:boolean
}