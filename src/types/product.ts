export interface Product {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  price: number;
  regularPrice: number;
  salePrice?: number;
  discount: number; // percentage discount e.g. 25
  currency: string; // e.g. "₹" or "INR"
  rating: number; // e.g. 4.6
  reviewCount: number; // e.g. 1420
  category: string; // primary category slug or name
  categories: string[]; // all category names
  tags: string[];
  features: string[];
  affiliateUrl: string; // Dynamic affiliate URL per product
  affiliateNetwork: string; // e.g. "Amazon Associates"
  amazonUrl?: string; // specific Amazon link if applicable
  featured: boolean;
  trending: boolean;
  bestSeller: boolean;
  deal: boolean;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  brand: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
  whySelected?: string; // Editorial curated note
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  productCount?: number;
  featured?: boolean;
}

export type SortOption = 
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'discount';

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  brand?: string;
  featured?: boolean;
  trending?: boolean;
  deal?: boolean;
  searchQuery?: string;
  sortBy?: SortOption;
}
