export interface StructuredRecommendation {
  id: string | number;
  slug: string;
  name: string;
  price: number;
  regularPrice?: number;
  discount?: number;
  category: string;
  image: string;
  affiliateUrl: string;
  affiliateNetwork: string;
  whyMatches: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  recommendations?: StructuredRecommendation[];
}
