import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/site';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Review the terms and conditions governing the use of Kanha Bazaar."
        canonicalPath="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Terms of Service' }]} />

        <div className="py-6 border-b border-stone-200/80 dark:border-stone-800">
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 font-serif">
            Terms of Service
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Last Updated: January 1, 2025
          </p>
        </div>

        <div className="py-8 space-y-6 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Kanha Bazaar, you acknowledge and agree to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              2. Nature of the Service
            </h2>
            <p>
              Kanha Bazaar is an informational product discovery and recommendation service. We do not directly sell, warehouse, ship, or process payments for any products listed on the platform. All purchases are executed on external merchant websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              3. Disclaimer of Warranties
            </h2>
            <p>
              All content, recommendations, and pricing data are provided "as is". While we take rigorous measures to maintain catalog accuracy, Kanha Bazaar makes no warranties regarding the availability, merchantability, or warranty compliance of external goods sold by third-party retailers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              4. External Intellectual Property
            </h2>
            <p>
              Amazon, the Amazon logo, and AmazonSupply are trademarks of Amazon.com, Inc. or its affiliates. All third-party trademarks and brand logos featured in product curations remain the intellectual property of their respective owners.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
