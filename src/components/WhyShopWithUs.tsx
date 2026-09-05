import React from 'react';
import { ShieldCheck, Compass, Sparkles, Scale } from 'lucide-react';

export const WhyShopWithUs: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Curated Quality Finds',
      description: 'Every product is handpicked and evaluated for durability, build materials, and true daily utility.',
      badge: 'Vetted Quality'
    },
    {
      icon: Compass,
      title: 'Effortless Discovery',
      description: 'Compare best sellers, budget picks, and genuine deals across lifestyle, tech, and kitchen categories.',
      badge: 'Smart Filters'
    },
    {
      icon: Sparkles,
      title: 'Catalog-Grounded AI',
      description: 'Ask our Kanha AI Assistant for honest comparisons, gift suggestions, and finds under your budget.',
      badge: 'Grounded AI'
    },
    {
      icon: Scale,
      title: '100% Transparent',
      description: 'Clear affiliate disclosure. We only earn a small commission from partner stores at zero extra cost to you.',
      badge: 'Zero Extra Cost'
    }
  ];

  return (
    <section className="py-12 sm:py-16 border-y border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            The Kanha Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-2 font-serif">
            Why Shop with Kanha Bazaar?
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            We cut through online shopping clutter so you make informed, confident choices every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/60">
                    {b.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
