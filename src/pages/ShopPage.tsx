import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Product, FilterState } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest'
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadFilteredProducts() {
      setLoading(true);
      try {
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load shop products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFilteredProducts();
  }, [filters]);

  return (
    <>
      <SEO
        title="Shop All Finds"
        description="Browse all handpicked products across tech gadgets, pure Ayurvedic wellness, artisanal cookware, and home essentials."
        canonicalPath="/shop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Shop All Products' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
              Shop Curated Finds
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              Showing {products.length} hand-selected products with transparent affiliate pricing
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({products.length})</span>
            </button>
          </div>
        </div>

        {/* Main Shop Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              totalResults={products.length}
            />
          </div>

          {/* Mobile Filter Modal */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden bg-stone-950/60 backdrop-blur-xs p-4 animate-in fade-in">
              <div className="relative w-full max-w-md mx-auto my-auto bg-white dark:bg-stone-900 rounded-2xl p-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-bold text-base text-stone-900 dark:text-stone-100">
                    Filter Options
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProductFilter
                  filters={filters}
                  onFilterChange={(newF) => {
                    setFilters(newF);
                    setMobileFilterOpen(false);
                  }}
                  totalResults={products.length}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center bg-stone-50/50 dark:bg-stone-900/30">
                <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  No products match these filters
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
                  Try clearing some filter criteria or adjusting your price thresholds to see more products.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters({ sortBy: 'newest' })}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-sm hover:bg-amber-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
