export const SITE_CONFIG = {
  name: 'Kanha Bazaar',
  tagline: 'Smart Finds. Better Choices.',
  description: 'Smart gadgets, useful home essentials, kitchen finds, fashion and more — carefully selected for you.',
  url: import.meta.env.VITE_SITE_URL || 'https://kanhabazaar.com',
  contactEmail: 'support@kanhabazaar.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',
  whatsappMessage: 'Hi Kanha Bazaar, I want product help.',
  defaultWhatsAppMessage: 'Hi Kanha Bazaar, I want product help.',
  wordpressApiUrl: import.meta.env.VITE_WORDPRESS_API_URL || '',
  aiApiEndpoint: import.meta.env.VITE_AI_API_ENDPOINT || '/api/chat',
  affiliateDisclosure: 'Kanha Bazaar is a participant in the Amazon Associates Program and other affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and other merchant stores. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend products we genuinely find useful.',
  affiliateDisclosureShort: 'Affiliate link — we may earn a commission at no extra cost to you.',
  affiliateDisclosureLong: 'Kanha Bazaar is a participant in the Amazon Associates Program and other affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and other merchant stores. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend products we genuinely find useful.',
  socialLinks: {
    instagram: 'https://instagram.com/kanhabazaar',
    twitter: 'https://x.com/kanhabazaar',
    facebook: 'https://facebook.com/kanhabazaar',
    pinterest: 'https://pinterest.com/kanhabazaar',
    youtube: 'https://youtube.com/@kanhabazaar'
  },
  socials: {
    instagram: 'https://instagram.com/kanhabazaar',
    twitter: 'https://x.com/kanhabazaar',
    facebook: 'https://facebook.com/kanhabazaar',
    pinterest: 'https://pinterest.com/kanhabazaar',
    youtube: 'https://youtube.com/@kanhabazaar'
  }
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Deals', path: '/deals' },
  { label: 'Trending', path: '/trending' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  explore: [
    { label: 'Home', path: '/' },
    { label: 'Shop All Finds', path: '/shop' },
    { label: 'Today\'s Deals', path: '/deals' },
    { label: 'Trending Items', path: '/trending' },
    { label: 'My Saved Wishlist', path: '/wishlist' },
    { label: 'About Kanha Bazaar', path: '/about' },
  ],
  categories: [
    { label: 'Electronics', path: '/category/electronics' },
    { label: 'Kitchen & Dining', path: '/category/kitchen' },
    { label: 'Home & Living', path: '/category/home-living' },
    { label: 'Fashion', path: '/category/fashion' },
    { label: 'Ayurvedic Beauty', path: '/category/beauty' },
    { label: 'Smart Gadgets', path: '/category/gadgets' },
  ],
  legal: [
    { label: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Contact & FAQs', path: '/contact' },
  ]
};
