import React from 'react';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';
import { Link, useRouter } from '../hooks/useRouter';
import { SEO } from '../components/SEO';
import { DEMO_CATEGORIES } from '../data/demoProducts';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <>
      <SEO
        title="Page Not Found (404)"
        description="The page you are looking for does not exist on Kanha Bazaar."
      />

      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10 stroke-[2]" />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-50 font-serif mt-2">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-md mx-auto mt-3 leading-relaxed">
          The curation or page you requested might have been updated, moved, or is no longer part of our active catalog.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm transition-all"
          >
            <span>Browse All Finds</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800">
          <span className="text-xs font-bold uppercase text-stone-500 block mb-3">
            Or Explore Popular Categories:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DEMO_CATEGORIES.slice(0, 5).map((c) => (
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
      </div>
    </>
  );
};
