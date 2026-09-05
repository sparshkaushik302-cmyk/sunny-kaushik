import React, { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';
import { Product, Category, FilterState } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';
import { DEMO_CATEGORIES } from '../data/demoProducts';

export const CategoryPage: React.FC = () => {
  const { params } = useRouter();
  const slug = params.slug || 'electronics';
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest'
  });

  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      try {
        const cats = await productService.getCategories();
        const matchedCat = cats.find((c) => c.slug === slug) || DEMO_CATEGORIES.find((c) => c.slug === slug);
        setCategory(matchedCat || {
          id: 0,
          name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
          slug,
          description: `Curated products in ${slug}`,
          iconName: 'Tag',
          productCount: 0
        });

        const catProducts = await productService.getProductsByCategory(slug, filters);
        setProducts(catProducts);
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryProducts();
  }, [slug, filters]);

  const catName = category ? category.name : 'Category';

  return (
    <>
      <SEO
        title={`${catName} Finds`}
        description={category?.description || `Explore top-rated curated products in ${catName}.`}
        canonicalPath={`/category/${slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: 'Categories', path: '/shop' },
            { label: catName }
          ]}
        />

        {/* Category Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-100/30 to-stone-100/50 dark:from-amber-950/30 dark:via-stone-900/60 dark:to-stone-900/40 p-6 sm:p-10 border border-stone-200/80 dark:border-stone-800 my-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Curated Collection
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 font-serif mt-1">
            {catName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
            {category?.description}
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-6 items-start">
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
              <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center bg-stone-50/50 dark:bg-stone-900/30">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  No products currently found in {catName} with selected filters.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters({ sortBy: 'newest' })}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-sm hover:bg-amber-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
