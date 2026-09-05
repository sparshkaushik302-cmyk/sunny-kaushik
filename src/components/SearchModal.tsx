import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag, ArrowRight } from 'lucide-react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { Link, useRouter } from '../hooks/useRouter';
import { DEMO_CATEGORIES } from '../data/demoProducts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await productService.searchProducts(query);
      setResults(res.slice(0, 6));
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSelectCategory = (catSlug: string) => {
    onClose();
    navigate(`/category/${catSlug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-16 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Search Kanha Bazaar"
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b border-stone-200 dark:border-stone-800 px-4 py-3">
          <Search className="w-5 h-5 text-stone-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, categories (e.g., earbuds, cast iron, 65W)..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            ESC
          </button>
        </form>

        {/* Search Body */}
        <div className="p-4 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-12 text-center text-sm text-stone-500">
              Searching curated products...
            </div>
          ) : query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span>Results ({results.length})</span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View all results <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  {results.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.slug)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/80 cursor-pointer transition-colors group"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                          {p.category}
                        </div>
                        <div className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {p.name}
                        </div>
                        <div className="text-xs font-bold text-stone-800 dark:text-stone-200">
                          {p.currency}{p.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  No products found for "{query}"
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Try searching for general keywords like "earbuds", "kitchen", "lamp", or "charger".
                </p>
              </div>
            )
          ) : (
            <div className="space-y-6 py-2">
              {/* Suggested Categories */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Suggested Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="text-xs px-3 py-1.5 rounded-full font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Under ₹1000', 'Best Deals', 'Cold Press Juicer', 'GaN Charger', 'Cast Iron Kadai', 'Kumkumadi Oil', 'ANC Earbuds'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-amber-500 hover:text-amber-600 transition-colors"
                    >
                      <Tag className="w-3 h-3 text-amber-500" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
