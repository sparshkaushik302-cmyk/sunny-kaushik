import { useState, useEffect } from 'react';
import { Product } from '../types/product';

const WISHLIST_STORAGE_KEY = 'kanha_bazaar_wishlist_v1';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => String(item.id) === String(product.id))) {
        return prev;
      }
      return [product, ...prev];
    });
  };

  const removeFromWishlist = (productId: string | number) => {
    setWishlist((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string | number): boolean => {
    return wishlist.some((item) => String(item.id) === String(productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return {
    wishlist,
    count: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };
}
