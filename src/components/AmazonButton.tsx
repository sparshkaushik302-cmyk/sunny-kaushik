import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AmazonButtonProps {
  affiliateUrl: string;
  affiliateNetwork?: string;
  isAmazon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  showDisclosureTooltip?: boolean;
}

export const AmazonButton: React.FC<AmazonButtonProps> = ({
  affiliateUrl,
  affiliateNetwork = 'Amazon Associates',
  isAmazon = true,
  size = 'md',
  fullWidth = false,
  className = '',
  showDisclosureTooltip = false,
}) => {
  const isAmazonProduct = isAmazon || affiliateNetwork.toLowerCase().includes('amazon') || affiliateUrl.includes('amazon');
  const label = isAmazonProduct ? 'Buy on Amazon' : 'View Deal';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-4 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-6 py-3.5 text-base font-bold gap-2.5 shadow-md hover:shadow-lg',
  };

  const buttonContent = (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.98] ${
        isAmazonProduct
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-semibold shadow-sm hover:shadow-amber-500/20'
          : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
      } ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      id={`affiliate-btn-${encodeURIComponent(affiliateUrl).slice(-10)}`}
    >
      <span>{label}</span>
      <ExternalLink className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
    </a>
  );

  if (!showDisclosureTooltip) {
    return buttonContent;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {buttonContent}
      <p className="text-[11px] text-stone-600 dark:text-stone-300 italic text-center">
        Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
};
