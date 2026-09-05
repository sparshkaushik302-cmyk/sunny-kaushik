import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle 
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/site';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Does buying via Kanha Bazaar cost me extra money?',
      a: 'Absolutely not. The price you pay on partner platforms like Amazon is 100% identical. The retailer pays us a modest marketing referral fee out of their own margin.'
    },
    {
      q: 'How can I track my order or request a refund?',
      a: 'Since transactions take place directly on external stores (such as Amazon or brand websites), your order confirmation, shipping tracking, and customer support are handled directly by that merchant.'
    },
    {
      q: 'How do you choose which products to list?',
      a: 'Our curation team evaluates build materials, warranty history, long-term durability, price-to-performance ratio, and verified owner reviews before admitting any product into the Kanha Bazaar catalog.'
    },
    {
      q: 'Can brands submit their products for review?',
      a: 'Yes! Send us an inquiry via the form below. We will independently test and evaluate the sample without any guarantee of placement.'
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us & Frequently Asked Questions"
        description="Get in touch with the Kanha Bazaar team, ask product questions, or connect on WhatsApp."
        canonicalPath="/contact"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        {/* Page Header */}
        <div className="py-6 border-b border-stone-200/80 dark:border-stone-800 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            We Are Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 font-serif mt-2">
            Contact Kanha Bazaar
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            Have a question about a product, partnership inquiry, or feedback? Send us a message or connect via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10">
          {/* Contact Form */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif mb-4">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold">Message Received!</h3>
                <p className="text-xs sm:text-sm">
                  Thank you for reaching out, {name}. Our curation team will respond to {email} within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">General Inquiry</option>
                    <option value="Product Recommendation Question">Product Recommendation Question</option>
                    <option value="Deal/Price Discrepancy Report">Deal/Price Discrepancy Report</option>
                    <option value="Brand Partnership/Review Request">Brand Partnership / Review Request</option>
                    <option value="Website Feedback">Website Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you today?"
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Channels & FAQ */}
          <div className="space-y-6">
            {/* WhatsApp Card */}
            {SITE_CONFIG.whatsappNumber && (
              <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Instant WhatsApp Help</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Get rapid human assistance with product comparisons.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex-shrink-0"
                >
                  Chat Now
                </a>
              </div>
            )}

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-stone-500">Official Editorial Desk</span>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-amber-600 underline">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-stone-900 dark:text-stone-100 hover:text-amber-600"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
