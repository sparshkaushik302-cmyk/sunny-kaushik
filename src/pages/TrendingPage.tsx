import React, { useState, useEffect } from 'react';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';

export const TrendingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrending() {
      setLoading(true);
      try {
        const res = await productService.getTrendingProducts(16);
        setProducts(res);
      } catch (err) {
        console.error('Failed to load trending products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrending();
  }, []);

  return (
    <>
      <SEO
        title="Trending Finds & Best Sellers"
        description="The most popular, highly reviewed, and rapidly moving products discovered across Kanha Bazaar."
        canonicalPath="/trending"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Trending Finds' }]} />

        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 sm:p-10 text-stone-950 shadow-lg my-4 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 text-amber-400 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>Highest Community Engagement</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif">
              Trending Finds & Best Sellers
            </h1>
            <p className="text-xs sm:text-sm text-stone-900/90 font-medium mt-2 leading-relaxed">
              Curations currently receiving the highest visitor reviews, repeat purchases, and social buzz across lifestyle and tech categories.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
