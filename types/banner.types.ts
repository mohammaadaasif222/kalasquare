export enum BannerType {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  CARD ="CARD"
}

export interface Banner {
  id: string;
  title: string;
  description: string | null;
  url: string;
  link: string
  position:number
  type: BannerType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerInput {
  title: string;
  description?: string;
  position:number
  url: string;
  link: string
  type: BannerType;
}

export interface UpdateBannerInput {
  title?: string;
  description?: string;
  url?: string;
  position?:number
  link?: string
  type?: BannerType;
}