import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter } from '../hooks/useRouter';
import { Product, FilterState } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';
import { DEMO_CATEGORIES } from '../data/demoProducts';

export const SearchPage: React.FC = () => {
  const { searchParams, navigate } = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest'
  });

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    async function executeSearch() {
      setLoading(true);
      try {
        const results = await productService.searchProducts(query, filters);
        setProducts(results);
      } catch (err) {
        console.error('Failed to search products:', err);
      } finally {
        setLoading(false);
      }
    }
    executeSearch();
  }, [query, filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <SEO
        title={query ? `Search: "${query}"` : 'Search Products'}
        description={`Search results for ${query} on Kanha Bazaar.`}
        canonicalPath="/search"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: 'Search', path: '/shop' },
            { label: query ? `"${query}"` : 'All' }
          ]}
        />

        {/* Search Header Form */}
        <div className="py-6 border-b border-stone-200/80 dark:border-stone-800">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 p-1.5 focus-within:border-amber-500 shadow-sm transition-all">
              <Search className="w-5 h-5 text-stone-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by title, category, brand, or tag..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-all flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-stone-500">
            <span>
              {loading
                ? 'Searching catalog...'
                : `Found ${products.length} product${products.length === 1 ? '' : 's'} for "${query || 'all'}"`}
            </span>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8 items-start">
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              totalResults={products.length}
            />
          </div>

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
              <div className="rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center bg-stone-50/40 dark:bg-stone-900/20">
                <Search className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                  No matching results for "{query}"
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
                  Try broader search terms like "charger", "kadai", "earbuds", or browse our top categories below:
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {DEMO_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => navigate(`/category/${c.slug}`)}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 hover:text-amber-900 transition-colors"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
