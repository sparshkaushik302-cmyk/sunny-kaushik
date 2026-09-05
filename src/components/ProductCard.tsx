import React, { useState } from 'react';
import { Star, Heart, Flame, Tag, Eye } from 'lucide-react';
import { Product } from '../types/product';
import { Link } from '../hooks/useRouter';
import { useWishlist } from '../hooks/useWishlist';
import { AmazonButton } from './AmazonButton';

interface ProductCardProps {
  product: Product;
  featuredLayout?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);

  // Fallback image if Unsplash fails
  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    : product.image;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-amber-400/40 dark:hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5 pointer-events-auto">
          {product.deal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm tracking-wide">
              <Tag className="w-3 h-3" />
              {product.discount}% OFF
            </span>
          )}
          {product.trending && !product.deal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-stone-950 shadow-sm">
              <Flame className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-200 backdrop-blur-md shadow-sm active:scale-90 ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-rose-500/20'
              : 'bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-stone-800'
          }`}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Container with Link */}
      <Link 
        to={`/product/${product.slug}`} 
        className="relative block aspect-[4/3] sm:aspect-square w-full bg-stone-100 dark:bg-stone-800/50 overflow-hidden"
      >
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-stone-900/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-700 dark:text-amber-400">
              {product.category.replace('-', ' ')}
            </span>
            <span className="font-medium truncate max-w-[110px]">{product.brand}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold ml-1 text-stone-800 dark:text-stone-200">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-stone-600 dark:text-stone-300">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50">
              {product.currency}{product.price.toLocaleString('en-IN')}
            </span>
            {product.regularPrice > product.price && (
              <span className="text-xs text-stone-600 dark:text-stone-300 line-through">
                {product.currency}{product.regularPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2">
            <AmazonButton
              affiliateUrl={product.affiliateUrl}
              affiliateNetwork={product.affiliateNetwork}
              isAmazon={product.affiliateNetwork.toLowerCase().includes('amazon') || Boolean(product.amazonUrl)}
              size="sm"
              fullWidth
            />
            <Link
              to={`/product/${product.slug}`}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
              title="View Product Details"
              aria-label={`View details for ${product.name}`}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
