import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DealsPage } from './pages/DealsPage';
import { TrendingPage } from './pages/TrendingPage';
import { WishlistPage } from './pages/WishlistPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const { pathname } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Keyboard shortcut listener: Press '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === '/' && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setAiOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Route selector
  const renderRoute = () => {
    if (pathname === '/' || pathname === '') {
      return <HomePage onOpenSearch={() => setSearchOpen(true)} onOpenAI={() => setAiOpen(true)} />;
    }
    if (pathname === '/shop') {
      return <ShopPage />;
    }
    if (pathname.startsWith('/category/')) {
      return <CategoryPage />;
    }
    if (pathname.startsWith('/product/')) {
      return <ProductDetailPage />;
    }
    if (pathname === '/deals') {
      return <DealsPage />;
    }
    if (pathname === '/trending') {
      return <TrendingPage />;
    }
    if (pathname === '/wishlist') {
      return <WishlistPage />;
    }
    if (pathname.startsWith('/search')) {
      return <SearchPage />;
    }
    if (pathname === '/about') {
      return <AboutPage />;
    }
    if (pathname === '/contact') {
      return <ContactPage />;
    }
    if (pathname === '/affiliate-disclosure') {
      return <AffiliateDisclosurePage />;
    }
    if (pathname === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (pathname === '/terms') {
      return <TermsPage />;
    }
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-200 selection:bg-amber-500 selection:text-stone-950">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAI={() => setAiOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* AI Assistant Chat Drawer */}
      <AIChatDrawer
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* Floating WhatsApp Support Button */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
