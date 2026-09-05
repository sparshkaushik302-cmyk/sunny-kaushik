import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  ExternalLink, 
  ShieldCheck, 
  Mail, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';
import { Link } from '../hooks/useRouter';
import { SITE_CONFIG, FOOTER_LINKS } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-stone-950 shadow-md">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white font-serif">
                  Kanha<span className="text-amber-400">Bazaar</span>
                </span>
                <span className="text-xs font-medium tracking-wider text-amber-400/80 uppercase">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Kanha Bazaar is an independent product discovery platform helping thoughtful shoppers find verified lifestyle, technology, kitchen, and wellness products with honest value comparisons.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mandatory Amazon Affiliate Disclosure Box */}
        <div className="mt-12 pt-8 border-t border-stone-800/80">
          <div className="rounded-2xl bg-stone-950/70 border border-stone-800 p-5 text-xs text-stone-400 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Amazon Associates & Affiliate Program Disclosure</span>
            </div>
            <p>
              {SITE_CONFIG.affiliateDisclosure}
            </p>
            <p className="mt-2 text-stone-500">
              Product prices, discounts, and availability are accurate as of the date/time indicated and are subject to change by external merchants. Any price and availability information displayed on partner merchant sites at the time of purchase will apply.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/affiliate-disclosure" className="hover:text-stone-300">Affiliate Disclosure</Link>
            <Link to="/privacy-policy" className="hover:text-stone-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
