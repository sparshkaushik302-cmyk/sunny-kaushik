import { Product } from '../types/product';

/**
 * WooCommerce REST API Product payload shape (v3)
 */
export interface WooCommerceProductRaw {
  id: number;
  name: string;
  slug: string;
  permalink?: string;
  type?: string; // 'simple' | 'grouped' | 'external' | 'variable'
  status?: string;
  featured?: boolean;
  catalog_visibility?: string;
  description?: string;
  short_description?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  date_created?: string;
  date_modified?: string;
  on_sale?: boolean;
  purchasable?: boolean;
  total_sales?: number;
  virtual?: boolean;
  downloadable?: boolean;
  external_url?: string;
  button_text?: string;
  tax_status?: string;
  manage_stock?: boolean;
  stock_quantity?: number | null;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  average_rating?: string;
  rating_count?: number;
  categories?: Array<{ id: number; name: string; slug: string }>;
  tags?: Array<{ id: number; name: string; slug: string }>;
  images?: Array<{ id: number; src: string; name?: string; alt?: string }>;
  attributes?: Array<{ id: number; name: string; options: string[] }>;
  meta_data?: Array<{ id: number; key: string; value: unknown }>;
}

/**
 * Cleans HTML tags from WooCommerce rich text fields like description
 */
function stripHtml(html?: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

/**
 * Maps raw WooCommerce REST API product object to the clean frontend Product model
 */
export function mapWooCommerceProduct(wc: WooCommerceProductRaw): Product {
  const regPrice = parseFloat(wc.regular_price || wc.price || '0') || 0;
  const salePriceVal = wc.sale_price ? parseFloat(wc.sale_price) : undefined;
  const currentPrice = salePriceVal !== undefined && salePriceVal > 0 ? salePriceVal : regPrice;

  // Calculate discount percentage
  let discount = 0;
  if (regPrice > 0 && salePriceVal !== undefined && salePriceVal < regPrice) {
    discount = Math.round(((regPrice - salePriceVal) / regPrice) * 100);
  }

  // Extract metadata helpers
  const getMeta = (key: string): string => {
    const item = wc.meta_data?.find((m) => m.key === key);
    return item && typeof item.value === 'string' ? item.value : '';
  };

  // Extract affiliate URL (external products use external_url or meta_data)
  const affiliateUrl = 
    wc.external_url || 
    getMeta('_affiliate_url') || 
    getMeta('affiliate_url') || 
    getMeta('amazon_url') || 
    `https://www.amazon.in/dp/PRODUCT_ID/?tag=kanhabazaar-21`;

  const affiliateNetwork = getMeta('affiliate_network') || 'Amazon Associates';
  const brand = getMeta('brand') || 'Curated';
  const whySelected = getMeta('why_selected') || getMeta('_why_selected') || 'Carefully vetted for quality, durability, and practical everyday utility.';

  // Image & gallery mapping
  const images = wc.images && wc.images.length > 0
    ? wc.images.map((img) => img.src)
    : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

  // Features from attributes or short description bullets
  const featureAttr = wc.attributes?.find((a) => a.name.toLowerCase().includes('feature'));
  const features = featureAttr && featureAttr.options.length > 0
    ? featureAttr.options
    : ['Premium Quality Build', 'Verified Utility & Value', 'Easy Maintenance'];

  const categoryNames = wc.categories?.map((c) => c.name) || ['General'];
  const primaryCategorySlug = wc.categories?.[0]?.slug || 'general';

  const tagNames = wc.tags?.map((t) => t.name) || [];

  return {
    id: wc.id,
    name: wc.name || 'Untitled Product',
    slug: wc.slug || `product-${wc.id}`,
    description: stripHtml(wc.description) || stripHtml(wc.short_description) || 'Curated product selection.',
    shortDescription: stripHtml(wc.short_description) || stripHtml(wc.description).slice(0, 140) + '...',
    image: images[0],
    gallery: images,
    price: currentPrice,
    regularPrice: regPrice > 0 ? regPrice : currentPrice,
    salePrice: salePriceVal,
    discount,
    currency: '₹',
    rating: parseFloat(wc.average_rating || '4.5') || 4.5,
    reviewCount: wc.rating_count || 120,
    category: primaryCategorySlug,
    categories: categoryNames,
    tags: tagNames,
    features,
    affiliateUrl,
    affiliateNetwork,
    amazonUrl: affiliateUrl.includes('amazon') ? affiliateUrl : undefined,
    featured: Boolean(wc.featured),
    trending: Boolean(wc.total_sales && wc.total_sales > 50) || Boolean(wc.featured),
    bestSeller: Boolean(wc.total_sales && wc.total_sales > 100),
    deal: discount > 15 || Boolean(wc.on_sale),
    stockStatus: wc.stock_status || 'instock',
    brand,
    sku: wc.sku || `SKU-${wc.id}`,
    createdAt: wc.date_created || new Date().toISOString(),
    updatedAt: wc.date_modified || new Date().toISOString(),
    whySelected
  };
}
