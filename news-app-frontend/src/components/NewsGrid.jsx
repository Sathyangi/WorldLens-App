import React from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from './NewsCard';

function NewsGrid({ articles }) {
  const { t } = useTranslation();

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce-slow">📰</div>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {t('noResults')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
      ))}
    </div>
  );
}

export default NewsGrid;