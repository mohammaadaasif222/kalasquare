export interface WorkSampleType {
  VIDEO:"video"
  IMAGE:"image"
  REEL:'reel'
  OTHER:"others"
}

export interface WorkStatus {
  PENDING:"pending"
  APPROVED:"approved"
  REJECTED:"rejected"
}

export interface WorkSample {
  talentProfileId:string;         
  title:string
  type:WorkSampleType
  url:string
  status:string
  createdAt:string
  updatedAt:string
}