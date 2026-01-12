import React from 'react';
import { useTranslation } from 'react-i18next';

function CategoryTabs({ activeCategory, onCategoryChange, onSlideshowClick }) {
  const { t } = useTranslation();
  
  const categories = [
    { key: 'general', icon: '📰' },
    { key: 'business', icon: '💼' },
    { key: 'entertainment', icon: '🎬' },
    { key: 'health', icon: '🏥' },
    { key: 'science', icon: '🔬' },
    { key: 'sports', icon: '⚽' },
    { key: 'technology', icon: '💻' }
  ];

  const handleCategoryClick = (cat) => {
    onCategoryChange(cat);
  };

  const handleSlideshowClick = (e, cat) => {
    e.stopPropagation();
    onSlideshowClick(cat);
  };

  return (
    <div className="mb-6 overflow-x-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex gap-2 min-w-max pb-2">
        {categories.map((cat, idx) => (
          <div key={cat.key} className="relative group">
            <button
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                         whitespace-nowrap hover:scale-105 btn-ripple animate-scale-in
                         flex items-center gap-2 ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{t(`categories.${cat.key}`)}</span>
            </button>

            {/* Full Circle Slideshow Button - Always Visible */}
            <button
              onClick={(e) => handleSlideshowClick(e, cat.key)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 hover:bg-red-700 
                       text-white rounded-full flex items-center justify-center
                       transition-all duration-300 hover:scale-125 shadow-lg
                       border-2 border-white dark:border-gray-900 animate-pulse"
              title="View as slideshow"
            >
              <span className="text-sm">▶️</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;