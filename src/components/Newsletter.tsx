import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-14 bg-gradient-to-br from-amber-500/10 via-amber-100/20 to-stone-100/50 dark:from-amber-950/20 dark:via-stone-900 dark:to-stone-900 border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Exclusive Deal Drops & Curations</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
          Never Miss a Genuine Price Drop
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto mt-2">
          Subscribe to our weekly dispatch featuring verified discounts, newly discovered heritage artisan crafts, and tested smart tech picks. No spam, ever.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Thank you for subscribing! You're on the list for our next curated drop.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:border-amber-500 focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>
            )}
            <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2.5">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime with 1 click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
