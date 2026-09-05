import React from 'react';
import { Heart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Link, useRouter } from '../hooks/useRouter';
import { SEO } from '../components/SEO';

export const WishlistPage: React.FC = () => {
  const { wishlist, count, clearWishlist } = useWishlist();
  const { navigate } = useRouter();

  return (
    <>
      <SEO
        title={`My Saved Wishlist (${count})`}
        description="View your saved products and favorite deals on Kanha Bazaar."
        canonicalPath="/wishlist"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-current" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
                My Saved Wishlist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {count === 0 
                ? 'Your wishlist is currently empty' 
                : `${count} item${count > 1 ? 's' : ''} saved locally on your device`}
            </p>
          </div>

          {count > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-500 hover:border-rose-300 transition-colors text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="py-8">
          {count > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 p-12 sm:p-16 text-center max-w-xl mx-auto bg-stone-50/40 dark:bg-stone-900/20 my-8">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                No items saved yet
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Click the heart icon on any product card or detail page to save items for future comparison or price tracking.
              </p>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Curated Finds</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
