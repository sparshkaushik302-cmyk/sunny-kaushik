import { Product, Category, FilterState } from '../types/product';
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from '../data/demoProducts';
import { mapWooCommerceProduct, WooCommerceProductRaw } from './productMapper';
import { SITE_CONFIG } from '../config/site';

class ProductService {
  private apiUrl: string;
  private isConfigured: boolean;
  private cache: Product[] | null = null;

  constructor() {
    this.apiUrl = SITE_CONFIG.wordpressApiUrl.trim();
    this.isConfigured = Boolean(this.apiUrl && this.apiUrl.length > 0);
  }

  /**
   * Internal loader to fetch from WooCommerce REST API or fallback to Demo Data
   */
  private async fetchAllRaw(): Promise<Product[]> {
    if (this.cache) {
      return this.cache;
    }

    if (!this.isConfigured) {
      this.cache = [...DEMO_PRODUCTS];
      return this.cache;
    }

    try {
      // Connect to WordPress / WooCommerce endpoint:
      // Can be direct or via our proxy `/api/woocommerce/products`
      const targetUrl = this.apiUrl.startsWith('/') || this.apiUrl.startsWith('http')
        ? `${this.apiUrl.replace(/\/$/, '')}/products?per_page=50&status=publish`
        : `/api/woocommerce/products`;

      const res = await fetch(targetUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }

      const data: WooCommerceProductRaw[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        this.cache = data.map(mapWooCommerceProduct);
        return this.cache;
      }
      throw new Error('Empty product array returned from WordPress API');
    } catch (err) {
      console.warn('Kanha Bazaar: WooCommerce API unavailable or failed. Using fallback catalog.', err);
      this.cache = [...DEMO_PRODUCTS];
      return this.cache;
    }
  }

  /**
   * Applies client-side or post-fetch filtering and sorting
   */
  private applyFiltersAndSort(products: Product[], filters?: FilterState): Product[] {
    let result = [...products];

    if (!filters) return result;

    // Filter by Category
    if (filters.category && filters.category !== 'all') {
      const catLower = filters.category.toLowerCase();
      result = result.filter((p) => 
        p.category.toLowerCase() === catLower ||
        p.categories.some((c) => c.toLowerCase() === catLower)
      );
    }

    // Filter by Search Query
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price range
    if (typeof filters.minPrice === 'number') {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (typeof filters.maxPrice === 'number') {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Rating
    if (typeof filters.minRating === 'number' && filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    // Discount
    if (typeof filters.minDiscount === 'number' && filters.minDiscount > 0) {
      result = result.filter((p) => p.discount >= filters.minDiscount!);
    }

    // Brand
    if (filters.brand && filters.brand !== 'all') {
      const brandLower = filters.brand.toLowerCase();
      result = result.filter((p) => p.brand.toLowerCase() === brandLower);
    }

    // Featured
    if (filters.featured) {
      result = result.filter((p) => p.featured);
    }

    // Trending
    if (filters.trending) {
      result = result.filter((p) => p.trending);
    }

    // Deal
    if (filters.deal) {
      result = result.filter((p) => p.deal);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          result.sort((a, b) => b.discount - a.discount);
          break;
        case 'newest':
        default:
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return result;
  }

  /**
   * Get all products with optional filters and sorting
   */
  async getProducts(filters?: FilterState): Promise<Product[]> {
    const all = await this.fetchAllRaw();
    return this.applyFiltersAndSort(all, filters);
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string | number): Promise<Product | null> {
    const all = await this.fetchAllRaw();
    return all.find((p) => String(p.id) === String(id)) || null;
  }

  /**
   * Get product by Slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    const all = await this.fetchAllRaw();
    return all.find((p) => p.slug === slug) || null;
  }

  /**
   * Get all categories with updated dynamic counts
   */
  async getCategories(): Promise<Category[]> {
    const all = await this.fetchAllRaw();
    return DEMO_CATEGORIES.map((cat) => {
      const count = all.filter((p) => 
        p.category.toLowerCase() === cat.slug.toLowerCase() ||
        p.categories.some((c) => c.toLowerCase().includes(cat.name.toLowerCase()))
      ).length;
      return {
        ...cat,
        productCount: count > 0 ? count : cat.productCount
      };
    });
  }

  /**
   * Get products by category slug
   */
  async getProductsByCategory(categorySlug: string, filters?: FilterState): Promise<Product[]> {
    return this.getProducts({
      ...filters,
      category: categorySlug
    });
  }

  /**
   * Search products by text query
   */
  async searchProducts(query: string, filters?: FilterState): Promise<Product[]> {
    return this.getProducts({
      ...filters,
      searchQuery: query
    });
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    const all = await this.fetchAllRaw();
    const featured = all.filter((p) => p.featured);
    return (featured.length > 0 ? featured : all).slice(0, limit);
  }

  /**
   * Get trending products
   */
  async getTrendingProducts(limit = 6): Promise<Product[]> {
    const all = await this.fetchAllRaw();
    const trending = all.filter((p) => p.trending);
    return (trending.length > 0 ? trending : all).slice(0, limit);
  }

  /**
   * Get deal products
   */
  async getDealProducts(limit = 6): Promise<Product[]> {
    const all = await this.fetchAllRaw();
    const deals = all.filter((p) => p.deal);
    return (deals.length > 0 ? deals : all).slice(0, limit);
  }

  /**
   * Get related products (same category, excluding current product)
   */
  async getRelatedProducts(currentProduct: Product, limit = 4): Promise<Product[]> {
    const all = await this.fetchAllRaw();
    return all
      .filter((p) => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || p.categories.some((c) => currentProduct.categories.includes(c)))
      )
      .slice(0, limit);
  }

  /**
   * Clear cached products
   */
  clearCache(): void {
    this.cache = null;
  }
}

export const productService = new ProductService();
export default productService;
