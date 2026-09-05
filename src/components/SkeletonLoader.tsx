import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-4 shadow-sm animate-pulse">
      <div className="aspect-square w-full rounded-xl bg-stone-200 dark:bg-stone-800 mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-1/3 bg-stone-200 dark:bg-stone-800 rounded-sm" />
        <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded-sm" />
        <div className="h-4 w-3/4 bg-stone-200 dark:bg-stone-800 rounded-sm" />
        <div className="h-3 w-1/4 bg-stone-200 dark:bg-stone-800 rounded-sm" />
      </div>
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div className="h-6 w-20 bg-stone-200 dark:bg-stone-800 rounded-sm" />
        <div className="h-8 w-24 bg-stone-200 dark:bg-stone-800 rounded-xl" />
      </div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 shadow-sm animate-pulse space-y-4">
      <div className="h-12 w-12 rounded-xl bg-stone-200 dark:bg-stone-800" />
      <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800 rounded-sm" />
      <div className="h-3 w-3/4 bg-stone-200 dark:bg-stone-800 rounded-sm" />
    </div>
  );
};
