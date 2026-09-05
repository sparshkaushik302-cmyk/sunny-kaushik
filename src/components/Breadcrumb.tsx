import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../hooks/useRouter';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-stone-500 dark:text-stone-400 py-3 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-400 flex-shrink-0" />
            {isLast || !item.path ? (
              <span className="font-medium text-stone-900 dark:text-stone-100 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate max-w-[150px]">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
