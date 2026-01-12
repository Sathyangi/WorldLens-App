import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function FullScreenSlideshow({ articles, onClose, category }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const currentArticle = articles[currentIndex];

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') setIsAutoPlay(!isAutoPlay);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black animate-fade-in overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${currentArticle.urlToImage || 'https://via.placeholder.com/1920x1080?text=News'})`,
          filter: 'blur(20px) brightness(0.3)'
        }}
      />

      {/* Top Controls - Fixed Height */}
      <div className="absolute top-0 left-0 right-0 h-20 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center">
        <div className="container mx-auto flex items-center justify-between">
          {/* Category Badge */}
          <div className="flex items-center gap-3 md:gap-4">
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider">
              {category}
            </span>
            <span className="text-white/80 text-xs md:text-sm">
              {currentIndex + 1} / {articles.length}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 text-lg md:text-xl"
              title={isAutoPlay ? 'Pause' : 'Play'}
            >
              {isAutoPlay ? '⏸' : '▶️'}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 md:p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 text-lg md:text-xl"
              title="Close (ESC)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Centered with Fixed Max Dimensions */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 pt-24 pb-28">
        <div className="w-full max-w-6xl h-full max-h-[calc(100vh-200px)] flex flex-col animate-slide-up">
          
          {/* Article Image - Fixed Height */}
          {currentArticle.urlToImage && (
            <div className="mb-4 md:mb-6 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <img
                src={currentArticle.urlToImage}
                alt={currentArticle.title}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          {/* Article Content - Scrollable if Needed */}
          <div className="bg-black/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl flex-1 overflow-y-auto custom-scrollbar">
            {/* Source & Date */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
              <span className="px-2 md:px-3 py-1 bg-blue-600 text-white rounded-full text-xs md:text-sm font-semibold">
                {currentArticle.source?.name}
              </span>
              <span className="text-white/60 text-xs md:text-sm">
                {formatDate(currentArticle.publishedAt)}
              </span>
            </div>

            {/* Title - Responsive Size */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 lg:mb-6 leading-tight line-clamp-3">
              {currentArticle.title}
            </h1>

            {/* Description - Responsive Size */}
            {currentArticle.description && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 leading-relaxed line-clamp-4">
                {currentArticle.description}
              </p>
            )}

            {/* Read More Button */}
            <a
              href={currentArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-full font-semibold transition-all duration-300
                       hover:scale-105 shadow-lg text-sm md:text-base"
            >
              {t('readMore')} →
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Fixed Position */}
      <button
        onClick={handlePrevious}
        className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full 
                 bg-white/10 hover:bg-white/20 text-white text-xl md:text-2xl transition-all duration-300
                 hover:scale-110 z-20"
        title="Previous (←)"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full 
                 bg-white/10 hover:bg-white/20 text-white text-xl md:text-2xl transition-all duration-300
                 hover:scale-110 z-20"
        title="Next (→)"
      >
        →
      </button>

      {/* Progress Indicators - Fixed Bottom */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
        {articles.slice(0, 10).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 md:w-12 bg-blue-600'
                : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
        {articles.length > 10 && (
          <span className="text-white/60 text-xs md:text-sm ml-2">+{articles.length - 10}</span>
        )}
      </div>

      {/* Keyboard Hints - Fixed Bottom Left */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white/40 text-xs hidden md:block">
        <div>← → Arrow keys to navigate</div>
        <div>Space to pause/play</div>
        <div>ESC to close</div>
      </div>
    </div>
  );
}

export default FullScreenSlideshow;