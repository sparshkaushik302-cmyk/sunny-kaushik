import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Tag, 
  Check, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  CheckCheck 
} from 'lucide-react';
import { useRouter, Link } from '../hooks/useRouter';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { useWishlist } from '../hooks/useWishlist';
import { ProductGallery } from '../components/ProductGallery';
import { AmazonButton } from '../components/AmazonButton';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';

export const ProductDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const slug = params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const found = await productService.getProductBySlug(slug);
        setProduct(found);
        if (found) {
          const related = await productService.getRelatedProducts(found, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center animate-pulse">
        <div className="h-6 w-48 bg-stone-200 dark:bg-stone-800 rounded mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="aspect-square bg-stone-200 dark:bg-stone-800 rounded-2xl" />
          <div className="space-y-4 text-left">
            <div className="h-8 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-10 w-1/3 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-24 w-full bg-stone-200 dark:bg-stone-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
          Product Not Found
        </h2>
        <p className="text-sm text-stone-500 mt-2">
          The requested curation might have moved or is temporarily unavailable.
        </p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow-sm hover:bg-amber-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription}
        image={product.image}
        canonicalPath={`/product/${product.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/category/${product.category}` },
            { label: product.name }
          ]}
        />

        {/* Product Top Grid: Gallery + Primary Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-6 items-start">
          {/* Gallery Column */}
          <div>
            <ProductGallery images={product.gallery} productName={product.name} />
          </div>

          {/* Details Column */}
          <div className="flex flex-col gap-6">
            <div>
              {/* Category, Brand & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link
                  to={`/category/${product.category}`}
                  className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-amber-200"
                >
                  {product.category}
                </Link>
                <span className="text-xs font-semibold text-stone-500">• {product.brand}</span>
                {product.deal && (
                  <span className="px-2.5 py-1 rounded-md bg-rose-500 text-white text-xs font-bold">
                    {product.discount}% OFF
                  </span>
                )}
                {product.trending && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 text-xs font-bold">
                    Trending Find
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 font-serif leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review Count */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'fill-stone-200 text-stone-300 dark:fill-stone-800 dark:text-stone-700'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100 ml-1.5">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-stone-500">
                  ({product.reviewCount.toLocaleString('en-IN')} verified customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50">
                  {product.currency}{product.price.toLocaleString('en-IN')}
                </span>
                {product.regularPrice > product.price && (
                  <span className="text-base sm:text-lg text-stone-400 line-through">
                    {product.currency}{product.regularPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded-md">
                    Save {product.discount}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of all taxes. Live prices determined by external store.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <AmazonButton
                    affiliateUrl={product.affiliateUrl}
                    affiliateNetwork={product.affiliateNetwork}
                    isAmazon={product.affiliateNetwork.toLowerCase().includes('amazon') || Boolean(product.amazonUrl)}
                    size="lg"
                    fullWidth
                    showDisclosureTooltip
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-3.5 rounded-xl border transition-all duration-200 ${
                    inWishlist
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-500'
                      : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-rose-400 hover:text-rose-500'
                  }`}
                  title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-amber-400 hover:text-amber-600 transition-colors"
                  title="Share product"
                >
                  {copied ? <CheckCheck className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Curated: Why We Selected This */}
            {product.whySelected && (
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-400/40 dark:border-amber-700/40 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Curator's Note: Why We Selected This</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                  {product.whySelected}
                </p>
              </div>
            )}

            {/* Key Features Bullet List */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <span className="flex h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specifications Tabs */}
        <div className="py-10 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              Full Product Overview
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
              <p>{product.description}</p>
            </div>

            {/* Product Meta Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-4 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold uppercase text-stone-500 mr-2">Tags:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
              Quick Specifications
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500">Brand</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{product.brand}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500">Category</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500">Availability</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">In Stock</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500">Partner Store</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{product.affiliateNetwork}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Curated Item ID</span>
                <span className="font-mono text-xs text-stone-400">{product.sku}</span>
              </div>
            </div>

            <div className="pt-2">
              <AmazonButton
                affiliateUrl={product.affiliateUrl}
                affiliateNetwork={product.affiliateNetwork}
                isAmazon={product.affiliateNetwork.toLowerCase().includes('amazon') || Boolean(product.amazonUrl)}
                size="md"
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Similar Curations
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif mt-1">
                  You Might Also Like
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
