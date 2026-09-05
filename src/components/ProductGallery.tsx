import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorMap, setErrorMap] = useState<Record<number, boolean>>({});

  const fallback = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
  const displayList = images && images.length > 0 ? images : [fallback];

  const handleImgError = (index: number) => {
    setErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const currentSrc = errorMap[selectedIndex] ? fallback : displayList[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-square w-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm">
        <img
          src={currentSrc}
          alt={`${productName} - view ${selectedIndex + 1}`}
          className="h-full w-full object-cover object-center transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 rounded-full bg-stone-900/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
          {selectedIndex + 1} / {displayList.length}
        </div>
      </div>

      {/* Thumbnails */}
      {displayList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayList.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            const thumbSrc = errorMap[idx] ? fallback : img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-stone-200 dark:border-stone-700 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbSrc}
                  alt=""
                  onError={() => handleImgError(idx)}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
