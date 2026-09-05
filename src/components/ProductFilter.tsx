import React from 'react';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';
import { FilterState, SortOption } from '../types/product';
import { DEMO_CATEGORIES } from '../data/demoProducts';

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  availableBrands?: string[];
  totalResults: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  availableBrands = ['SoundWave', 'IronHeritage', 'PulseTech', 'NutriLife', 'SattvaLiving', 'VastraKala', 'VedaPure', 'VoltCraft', 'DeskArch', 'ThermoPro', 'AnanyaHeritage', 'OhmSmart', 'HideCraft', 'AuraZen', 'UrbanTrack', 'ArcSpark', 'BotanicaPure', 'Chronos'],
  totalResults
}) => {
  const handleCategoryClick = (catSlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === catSlug ? undefined : catSlug
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as SortOption
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
    onFilterChange({
      ...filters,
      minPrice: val
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
    onFilterChange({
      ...filters,
      maxPrice: val
    });
  };

  const handleRatingClick = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating
    });
  };

  const handleDiscountClick = (discount: number) => {
    onFilterChange({
      ...filters,
      minDiscount: filters.minDiscount === discount ? undefined : discount
    });
  };

  const handleBrandClick = (brand: string) => {
    onFilterChange({
      ...filters,
      brand: filters.brand === brand ? undefined : brand
    });
  };

  const handleCheckboxToggle = (key: 'deal' | 'trending' | 'featured') => {
    onFilterChange({
      ...filters,
      [key]: !filters[key] ? true : undefined
    });
  };

  const handleReset = () => {
    onFilterChange({
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating ||
    filters.minDiscount ||
    filters.brand ||
    filters.deal ||
    filters.trending ||
    filters.featured ||
    (filters.sortBy && filters.sortBy !== 'newest')
  );

  return (
    <aside className="w-full flex flex-col gap-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 text-base">
          <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Filter Products</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            {totalResults}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Sort Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'newest'}
          onChange={handleSortChange}
          className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 px-3 py-2 text-sm text-stone-800 dark:text-stone-200 font-medium focus:border-amber-500 focus:outline-none"
        >
          <option value="newest">Newest Additions</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="discount">Biggest Discount (%)</option>
        </select>
      </div>

      {/* Quick Curations Checkboxes */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Curations
        </span>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(filters.deal)}
              onChange={() => handleCheckboxToggle('deal')}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>Today's Deals (Save 15%+)</span>
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(filters.trending)}
              onChange={() => handleCheckboxToggle('trending')}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>Trending Products</span>
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(filters.featured)}
              onChange={() => handleCheckboxToggle('featured')}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>Staff Featured Picks</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Categories
        </span>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Price Range (₹)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="number"
              placeholder="Min ₹"
              value={filters.minPrice ?? ''}
              onChange={handleMinPriceChange}
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max ₹"
              value={filters.maxPrice ?? ''}
              onChange={handleMaxPriceChange}
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Minimum Rating
        </span>
        <div className="flex gap-2">
          {[4.5, 4.0, 3.5].map((rate) => {
            const isActive = filters.minRating === rate;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => handleRatingClick(rate)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>{rate}</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Discount */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          Discount
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {[50, 40, 30, 20].map((disc) => {
            const isActive = filters.minDiscount === disc;
            return (
              <button
                key={disc}
                type="button"
                onClick={() => handleDiscountClick(disc)}
                className={`text-xs py-1.5 px-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {disc}% or more
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
          <span className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Brands
          </span>
          <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
            {availableBrands.slice(0, 8).map((brand) => {
              const isActive = filters.brand === brand;
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => handleBrandClick(brand)}
                  className={`w-full flex items-center justify-between text-left text-xs py-1 px-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{brand}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
