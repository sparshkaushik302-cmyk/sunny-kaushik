import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Flame, 
  Tag, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Link, useRouter } from '../hooks/useRouter';
import { useWishlist } from '../hooks/useWishlist';
import { useTheme } from '../hooks/useTheme';
import { SITE_CONFIG, NAV_LINKS } from '../config/site';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAI }) => {
  const { pathname } = useRouter();
  const { count: wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner: Amazon Affiliate & Free Delivery Notice */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 text-center font-medium border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
          <Tag className="w-3 h-3" />
          Curated Deals:
        </span>
        <span>Discover verified top-value finds with transparent affiliate pricing.</span>
        <Link to="/affiliate-disclosure" className="underline hover:text-white hidden sm:inline ml-1">
          Learn how we earn
        </Link>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-stone-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-50 font-serif leading-none">
                  Kanha<span className="text-amber-600 dark:text-amber-400">Bazaar</span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-stone-600 dark:text-stone-300 uppercase mt-0.5">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-bold'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Wishlist, AI, Theme, Mobile Menu */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search products"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:border-amber-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all bg-stone-50 dark:bg-stone-900 text-xs sm:text-sm"
              >
                <Search className="w-4 h-4 text-stone-400" />
                <span className="hidden md:inline font-medium">Search finds...</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] rounded-md bg-stone-200 dark:bg-stone-800 font-mono text-stone-500">
                  /
                </kbd>
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="relative p-2 sm:p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-sm animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* AI Assistant Button */}
              <button
                type="button"
                onClick={onOpenAI}
                aria-label="Open Kanha AI Assistant"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>

              {/* Theme Switcher */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
                className="p-2 sm:p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 py-5 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.path === '/deals' && <Tag className="w-4 h-4 text-rose-500" />}
                    {link.path === '/trending' && <Flame className="w-4 h-4 text-amber-500" />}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Kanha AI Assistant</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
