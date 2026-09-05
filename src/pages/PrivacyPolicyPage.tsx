import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/site';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Kanha Bazaar protects your privacy and handles anonymous browsing data."
        canonicalPath="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        <div className="py-6 border-b border-stone-200/80 dark:border-stone-800">
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 font-serif">
            Privacy Policy
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Effective Date: January 1, 2025
          </p>
        </div>

        <div className="py-8 space-y-6 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              1. Information We Collect
            </h2>
            <p>
              Kanha Bazaar is dedicated to keeping your browsing experience privacy-focused and lightweight. We do not require accounts or user registration for standard shopping discovery.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-stone-600 dark:text-stone-400">
              <li><strong>Local Device Storage:</strong> Your saved wishlist items and light/dark theme preference are stored solely in your local browser storage (`localStorage`).</li>
              <li><strong>Newsletter Subscription:</strong> If you choose to subscribe to our newsletter, we store only your email address for delivery of curated deal roundups.</li>
              <li><strong>AI Assistant Queries:</strong> Questions asked to Kanha AI Assistant are processed securely and not linked to individual personal profiles.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              2. Cookies & External Affiliate Links
            </h2>
            <p>
              When you click on an external link to a partner merchant (such as Amazon), that merchant may place a temporary tracking cookie on your device to attribute any subsequent purchase to our affiliate tag. These cookies are managed strictly under the external merchant's privacy policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard encryption protocols (HTTPS/TLS) across all traffic. Any communication between the browser and our server is secured.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              4. Contact Us
            </h2>
            <p>
              For privacy-related inquiries, please email{' '}
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-amber-600 underline">
                {SITE_CONFIG.contactEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
