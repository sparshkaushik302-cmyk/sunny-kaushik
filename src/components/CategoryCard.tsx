import React from 'react';
import { 
  Laptop, 
  Utensils, 
  Home, 
  Shirt, 
  Sparkles, 
  Briefcase, 
  Cpu, 
  Flame, 
  Tag, 
  ArrowUpRight 
} from 'lucide-react';
import { Category } from '../types/product';
import { Link } from '../hooks/useRouter';

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Utensils,
  Home,
  Shirt,
  Sparkles,
  Briefcase,
  Cpu,
  Flame,
  Tag
};

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.iconName] || Tag;

  return (
    <Link
      to={`/category/${category.slug}`}
      id={`cat-card-${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 shadow-sm hover:shadow-xl hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-300">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors duration-200">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-300">
        <span>{category.productCount ? `${category.productCount} Curated Finds` : 'Explore Collection'}</span>
        <span className="text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">Browse &rarr;</span>
      </div>
    </Link>
  );
};
