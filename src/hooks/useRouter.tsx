import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

interface RouteMatch {
  pathname: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

interface RouterContextType {
  pathname: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

function matchRoute(currentPath: string): { params: Record<string, string> } {
  const params: Record<string, string> = {};

  // Check /product/:slug
  const productMatch = currentPath.match(/^\/product\/([^/?#]+)/);
  if (productMatch) {
    params.slug = decodeURIComponent(productMatch[1]);
  }

  // Check /category/:slug
  const categoryMatch = currentPath.match(/^\/category\/([^/?#]+)/);
  if (categoryMatch) {
    params.slug = decodeURIComponent(categoryMatch[1]);
  }

  return { params };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentUrl, setCurrentUrl] = useState(() => {
    return window.location.pathname + window.location.search;
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setCurrentUrl(window.location.pathname + window.location.search);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (to === currentUrl) return;

    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    startTransition(() => {
      setCurrentUrl(to);
    });

    // Smooth scroll to top on page transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const urlObj = new URL(window.location.origin + currentUrl);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  const { params } = matchRoute(pathname);

  return (
    <RouterContext.Provider value={{ pathname, params, searchParams, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ to, replace, onClick, children, className, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow default browser handling for modified clicks (open in new tab)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }

    e.preventDefault();
    navigate(to, { replace });
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
