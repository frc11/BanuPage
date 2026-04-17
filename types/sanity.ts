export interface HeroSectionData {
  _id: string;
  title: string;
  subtitle: string;
  videoUrls: string[];
}

export interface BrandData {
  _id: string;
  name: string;
  logoUrl?: string;
}

export interface PerfumeData {
  _id: string;
  name: string;
  slug: string;
  badge?: string;
  inspiredBy?: string;
  price: {
    basePrice: number;
    discountPrice?: number;
    isOnSale: boolean;
  };
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  performance: {
    longevity: number;
    projection: number;
  };
  tags: string[];
  isFeatured: boolean;
  imageUrl?: string;
  gallery?: string[];
  brand?: {
    title: string;
    logoUrl?: string;
  };
}

export interface TrustItemData {
  _id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItemData {
  _id: string;
  question: string;
  answer: string;
}

export interface ReviewData {
  _id: string;
  author: string;
  rating: number;
  text: string;
}
