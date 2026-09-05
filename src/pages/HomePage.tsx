import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Flame, 
  Tag, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { Product, Category } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { WhyShopWithUs } from '../components/WhyShopWithUs';
import { Newsletter } from '../components/Newsletter';
import { ProductCardSkeleton, CategoryCardSkeleton } from '../components/SkeletonLoader';
import { Link, useRouter } from '../hooks/useRouter';
import { SEO } from '../components/SEO';

interface HomePageProps {
  onOpenSearch: () => void;
  onOpenAI: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch, onOpenAI }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { navigate } = useRouter();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [featured, trending, deals, cats] = await Promise.all([
          productService.getFeaturedProducts(8),
          productService.getTrendingProducts(8),
          productService.getDealProducts(8),
          productService.getCategories()
        ]);
        setFeaturedProducts(featured);
        setTrendingProducts(trending);
        setDealProducts(deals);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  return (
    <>
      <SEO />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-100/10 to-transparent dark:from-amber-950/20 dark:via-stone-900/40 dark:to-transparent py-14 sm:py-24 border-b border-stone-200/60 dark:border-stone-800/60">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-800 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Honest Reviews & Verified Curations</span>
            <span className="text-stone-300 dark:text-stone-600">|</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">100% Free Service</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-stone-50 font-serif tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Smart Finds. <span className="text-amber-600 dark:text-amber-400 underline decoration-amber-400/40 underline-offset-8">Better Choices.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified gadgets, handcrafted kitchenware, lifestyle essentials, and curated deals. Ask our catalog-grounded AI shopping assistant anytime.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleHeroSearch} className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center rounded-2xl bg-white dark:bg-stone-900 border-2 border-amber-400/60 dark:border-amber-500/50 p-1.5 shadow-lg shadow-amber-500/5 focus-within:border-amber-500 transition-all">
              <Search className="w-5 h-5 text-stone-400 ml-3.5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product, category, or brand (e.g., ANC earbuds, cast iron, 65W GaN)..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
              >
                <span>Find</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* AI Banner Shortcut & Fast Category Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              type="button"
              onClick={onOpenAI}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800 hover:bg-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Kanha AI for Advice</span>
            </button>
            <span className="text-stone-400 hidden sm:inline">•</span>
            {['Electronics', 'Kitchen', 'Gadgets', 'Deals'].map((quickCat) => (
              <Link
                key={quickCat}
                to={quickCat === 'Deals' ? '/deals' : `/category/${quickCat.toLowerCase()}`}
                className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 font-medium transition-colors"
              >
                {quickCat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Curated by Editors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1 font-serif">
              Featured Selections
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>View All Curations</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Browse Categories Section */}
      <section className="py-12 sm:py-16 bg-stone-50/60 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Handpicked Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1 font-serif">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">
              From high-utility workspace tech to authentic hand-cast cookware.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Today's Deals Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 sm:p-10 text-stone-950 shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 text-amber-400 text-xs font-bold mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>Save Up To 60%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif">
                Today's Verified Deals
              </h2>
              <p className="text-sm sm:text-base text-stone-900/90 font-medium mt-2 max-w-xl">
                Daily price drops monitored across Amazon and top marketplaces. No artificial markups.
              </p>
            </div>
            <Link
              to="/deals"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              <span>Explore All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1 font-serif">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/trending"
            className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>View All Trending</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Shop With Us Component */}
      <WhyShopWithUs />

      {/* Newsletter Signup */}
      <Newsletter />
    </>
  );
};
