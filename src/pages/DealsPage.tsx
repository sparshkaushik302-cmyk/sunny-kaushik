import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, SlidersHorizontal, Flame } from 'lucide-react';
import { Product, FilterState } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';

export const DealsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);

  useEffect(() => {
    async function loadDeals() {
      setLoading(true);
      try {
        const filters: FilterState = {
          deal: true,
          minDiscount: selectedDiscount > 0 ? selectedDiscount : undefined,
          sortBy: 'discount'
        };
        const res = await productService.getProducts(filters);
        setProducts(res);
      } catch (err) {
        console.error('Failed to load deals:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, [selectedDiscount]);

  return (
    <>
      <SEO
        title="Today's Top Deals & Price Drops"
        description="Save up to 60% with hand-verified affiliate deals on electronics, kitchen essentials, and lifestyle finds."
        canonicalPath="/deals"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Deals & Discounts' }]} />

        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 p-6 sm:p-10 text-white shadow-lg my-4 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>Verified Price Drops</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif">
              Today's Best Curated Deals
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
              Every discount below has been checked against historic prices to ensure authentic savings before you click through to partner stores.
            </p>
          </div>
        </div>

        {/* Quick Discount Tier Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-stone-200/80 dark:border-stone-800">
          <span className="text-xs font-bold uppercase text-stone-500 flex items-center gap-1 mr-2 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter by Savings:
          </span>
          {[
            { label: 'All Deals', value: 0 },
            { label: '30% or more', value: 30 },
            { label: '40% or more', value: 40 },
            { label: '50% or more', value: 50 },
            { label: '60% or more', value: 60 }
          ].map((tier) => (
            <button
              key={tier.value}
              type="button"
              onClick={() => setSelectedDiscount(tier.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedDiscount === tier.value
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Tag className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                No deals found at {selectedDiscount}% discount right now
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Try selecting "All Deals" to view other available discounts.
              </p>
              <button
                type="button"
                onClick={() => setSelectedDiscount(0)}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
              >
                Show All Active Deals
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
