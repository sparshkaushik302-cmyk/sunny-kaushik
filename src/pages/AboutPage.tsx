import React from 'react';
import { ShoppingBag, Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { Link } from '../hooks/useRouter';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Kanha Bazaar — Our Mission & Story"
        description="Learn about the philosophy behind Kanha Bazaar: Smart Finds. Better Choices."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="py-8 sm:py-12 text-center border-b border-stone-200/80 dark:border-stone-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-stone-950 mx-auto shadow-md mb-4">
            <ShoppingBag className="w-8 h-8 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Our Mission & Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-50 font-serif mt-2">
            Smart Finds. Better Choices.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            In an era of endless sponsored listings, drop-shipped clutter, and counterfeit reviews, Kanha Bazaar was founded on a simple premise: helping people discover items that genuinely deliver value.
          </p>
        </div>

        {/* Body */}
        <div className="py-10 space-y-10 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              Why We Started Kanha Bazaar
            </h2>
            <p>
              Shopping online should be exciting and effortless, not an exhaustive research project. Finding high-quality cast iron cookware shouldn't require reading through 400 conflicting reviews, and buying reliable electronics shouldn't feel like a gamble.
            </p>
            <p>
              We bring together rigorous manual research, authentic user feedback, and AI-assisted catalog analysis to highlight the single best option in each category—whether that's a budget charger under ₹1,000 or a lifetime heirloom brass lamp.
            </p>
          </section>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800">
              <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-2" />
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1">
                Zero Sponsored Bias
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                We never accept payments to feature or inflate low-grade products. Every product earns its place.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800">
              <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-2" />
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1">
                Grounded AI Assistance
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Our conversational assistant answers questions strictly using verified catalog data—no hallucinations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800">
              <HeartHandshake className="w-6 h-6 text-amber-600 dark:text-amber-400 mb-2" />
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1">
                Transparent Monetization
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                We earn a small affiliate commission when you purchase via our links at zero extra cost to you.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              WordPress & WooCommerce Integration
            </h2>
            <p>
              Behind Kanha Bazaar is a headless architecture ready to seamlessly synchronize with WordPress and WooCommerce content management systems, enabling dynamic product updates, live stock mapping, and custom metadata.
            </p>
          </section>

          <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Explore The Catalog</span>
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
