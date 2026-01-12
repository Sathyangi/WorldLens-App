import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import HotTopics from './components/HotTopics';
import SearchBar from './components/SearchBar';
import NewsGrid from './components/NewsGrid';
import CategoryTabs from './components/CategoryTabs';
import WelcomeSplash from './components/WelcomeSplash';
import FullScreenSlideshow from './components/FullScreenSlideshow';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [searchFilters, setSearchFilters] = useState({});
  const [showSplash, setShowSplash] = useState(true);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideshowCategory, setSlideshowCategory] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchNews = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      let endpoint;
      let params = new URLSearchParams();

      // Check if we have search filters (keyword, date, domain, language)
      const hasSearchFilters = filters.q || filters.from || filters.to || filters.domains || filters.language;

      if (hasSearchFilters) {
        // Use /everything endpoint for search
        endpoint = `${API_BASE_URL}/api/news/everything`;
        if (filters.q) params.append('q', filters.q);
        if (filters.from) params.append('from', filters.from);
        if (filters.to) params.append('to', filters.to);
        if (filters.domains) params.append('domains', filters.domains);
        if (filters.language) params.append('language', filters.language);
        params.append('sortBy', 'publishedAt');
      } else {
        // Use /top-headlines for category browsing
        endpoint = `${API_BASE_URL}/api/news/top-headlines`;
        params.append('country', 'us');
        params.append('category', category);
      }
      
      const fullUrl = `${endpoint}?${params.toString()}`;
      console.log('API Request:', fullUrl);
      
      const response = await fetch(fullUrl);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.status === 'ok') {
        setNews(data.articles || []);
        if (data.articles && data.articles.length === 0) {
          setError('No articles found. Try different search criteria.');
        }
      } else {
        setError(data.message || 'Failed to fetch news.');
      }
    } catch (err) {
      setError('Failed to fetch news. Please check if backend is running on port 5000.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when category changes (only after splash)
  useEffect(() => {
    if (!showSplash && !searchFilters.q && !searchFilters.from) {
      console.log('Fetching category:', category);
      fetchNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, showSplash]);

  const handleSearch = (filters) => {
    console.log('Search filters:', filters);
    setSearchFilters(filters);
    fetchNews(filters);
  };

  const handleCategoryChange = (newCategory) => {
    console.log('Category changed to:', newCategory);
    setCategory(newCategory);
    setSearchFilters({});
  };

  const handleTopicClick = (topic) => {
    console.log('Hot topic clicked:', topic);
    const filters = { q: topic };
    setSearchFilters(filters);
    fetchNews(filters);
  };

  const handleSlideshowClick = async (categoryKey) => {
    console.log('Slideshow clicked for:', categoryKey);
    
    // Fetch news for this category
    setLoading(true);
    try {
      const endpoint = `${API_BASE_URL}/api/news/top-headlines`;
      const params = new URLSearchParams();
      params.append('country', 'us');
      params.append('category', categoryKey);
      
      const response = await fetch(`${endpoint}?${params.toString()}`);
      const data = await response.json();
      
      if (data.status === 'ok' && data.articles.length > 0) {
        setNews(data.articles);
        setSlideshowCategory(categoryKey);
        setShowSlideshow(true);
      } else {
        alert('No articles found for this category.');
      }
    } catch (err) {
      console.error('Slideshow fetch error:', err);
      alert('Failed to load slideshow.');
    } finally {
      setLoading(false);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen
  if (showSplash) {
    return <WelcomeSplash onComplete={handleSplashComplete} />;
  }

  // Show slideshow
  if (showSlideshow) {
    return (
      <FullScreenSlideshow
        articles={news}
        category={slideshowCategory}
        onClose={() => setShowSlideshow(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Hot Topics Bar */}
      <HotTopics onTopicClick={handleTopicClick} />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Category Tabs */}
        <CategoryTabs 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          onSlideshowClick={handleSlideshowClick}
        />

        {/* Active Search Banner */}
        {searchFilters.q && (
          <div className="mb-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 
                        text-green-700 dark:text-green-300 px-4 py-3 rounded animate-slide-down flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔍</span>
              <span>Showing results for: <strong>"{searchFilters.q}"</strong></span>
            </div>
            <button
              onClick={() => {
                setSearchFilters({});
                fetchNews();
              }}
              className="text-sm hover:underline font-semibold"
            >
              Clear ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 
                          border-gray-200 border-t-blue-600 dark:border-gray-700 
                          dark:border-t-blue-400"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse-slow">
              {t('loading')}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 
                        text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 animate-slide-down
                        shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && <NewsGrid articles={news} />}
      </main>
    </div>
  );
}

export default App;