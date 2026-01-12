import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NewsCard({ article, index }) {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const defaultImage = 'https://via.placeholder.com/400x200?text=No+Image';
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                  animate-fade-in opacity-0 stagger-${Math.min(index % 6 + 1, 6)}`}
      style={{ animationDelay: `${(index % 6) * 0.1}s` }}
    >
      <div className="relative overflow-hidden group">
        {!imageLoaded && (
          <div className="w-full h-48 skeleton"></div>
        )}
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title}
          className={`w-full h-48 object-cover transition-transform duration-500 
                      group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = defaultImage;
            setImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400 
                          hover:underline cursor-pointer transition-colors">
            {article.source?.name}
          </span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white 
                      line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 
                      transition-colors cursor-pointer">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg text-sm font-medium transition-all duration-300
                     hover:gap-3 btn-ripple group"
        >
          {t('readMore')} 
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </div>
  );
}

export default NewsCard;