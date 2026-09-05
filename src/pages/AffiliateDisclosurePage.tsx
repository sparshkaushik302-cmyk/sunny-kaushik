import React from 'react';
import { ShieldCheck, ExternalLink, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/site';

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Affiliate Disclosure & Transparency Statement"
        description="Learn how Kanha Bazaar operates, our Amazon Associates partnership, and our commitment to transparent, honest recommendations."
        canonicalPath="/affiliate-disclosure"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Affiliate Disclosure' }]} />

        {/* Header */}
        <div className="py-6 border-b border-stone-200/80 dark:border-stone-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>FTC & Legal Compliance Statement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 font-serif">
            Affiliate Disclosure
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            Last updated: January 2025 • Our pledge to 100% honesty and zero hidden costs
          </p>
        </div>

        {/* Content Body */}
        <div className="py-8 space-y-8 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Primary Legal Statement */}
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-300 dark:border-stone-800 space-y-3">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Official Amazon Associates Statement</span>
            </h2>
            <p className="font-medium text-stone-800 dark:text-stone-200">
              "{SITE_CONFIG.affiliateDisclosure}"
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              1. What is an Affiliate Link?
            </h2>
            <p>
              Some of the product links on <strong>Kanha Bazaar</strong> are "affiliate links." This means that if you click on a link and make a purchase on a merchant partner's website (such as Amazon.in or authorized brand retailers), we may receive a modest referral commission.
            </p>
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              This does NOT result in any extra cost to you. The price you pay on the merchant's store is identical whether you use our link or navigate there directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              2. Independent Editorial Standards
            </h2>
            <p>
              Our editorial and product selection process is strictly independent. We curate products based on:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600 dark:text-stone-400">
              <li>Actual utility, durability, and customer build reviews</li>
              <li>Honest price-to-performance comparisons</li>
              <li>Reputation and reliability of the manufacturer or artisan</li>
              <li>Price drop verification against historic pricing</li>
            </ul>
            <p>
              No brand or manufacturer can pay us to rate a poor product favorably. If a product fails to meet our standards, we do not feature it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              3. Pricing and Product Availability Disclaimer
            </h2>
            <p>
              Prices and availability for products listed on Kanha Bazaar fluctuate regularly on external platforms such as Amazon. While we strive to keep all pricing and stock details synchronized via our product backend, the final price, tax, shipping fees, and return policies are governed by the merchant site where you complete your transaction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              4. Questions or Verification
            </h2>
            <p>
              If you have any questions regarding our affiliate relationships, or if you represent a brand and wish to request a product evaluation, please reach out to our team at{' '}
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-amber-600 dark:text-amber-400 font-semibold underline">
                {SITE_CONFIG.contactEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
