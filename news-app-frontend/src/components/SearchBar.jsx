import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SearchBar({ onSearch }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    domains: '',
    language: i18n.language === 'si' || i18n.language === 'ta' ? 'en' : i18n.language
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      q: query,
      ...filters
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setQuery('');
    setFilters({
      from: '',
      to: '',
      domains: '',
      language: i18n.language === 'si' || i18n.language === 'ta' ? 'en' : i18n.language
    });
    onSearch({ q: '' });
  };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  return (
    <div className="mb-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Main Search Bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300 hover:border-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300
                       hover:scale-105 btn-ripple ${
              showAdvanced 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
            }`}
            title="Advanced Search"
          >
            <span className={`inline-block transition-transform duration-300 ${
              showAdvanced ? 'rotate-180' : ''
            }`}>⚙️</span>
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       font-medium transition-all duration-300 shadow-md hover:shadow-lg
                       hover:scale-105 btn-ripple"
          >
            🔍
          </button>
        </div>

        {/* Advanced Search Options */}
        {showAdvanced && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border 
                          border-gray-200 dark:border-gray-700 space-y-4 animate-slide-down">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              {t('advancedSearch')}
            </h3>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fromDate')}
                </label>
                <input
                  type="date"
                  value={filters.from}
                  max={today}
                  onChange={(e) => handleFilterChange('from', e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('toDate')}
                </label>
                <input
                  type="date"
                  value={filters.to}
                  max={today}
                  onChange={(e) => handleFilterChange('to', e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Quick Date Buttons */}
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'today', label: t('today'), action: () => {
                  handleFilterChange('from', today);
                  handleFilterChange('to', today);
                }},
                { key: 'yesterday', label: t('yesterday'), action: () => {
                  handleFilterChange('from', yesterday);
                  handleFilterChange('to', yesterday);
                }},
                { key: 'lastWeek', label: t('lastWeek'), action: () => {
                  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
                  handleFilterChange('from', weekAgo);
                  handleFilterChange('to', today);
                }}
              ].map((btn, idx) => (
                <button
                  key={btn.key}
                  type="button"
                  onClick={btn.action}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 
                             hover:bg-blue-100 dark:hover:bg-blue-900 rounded 
                             text-gray-700 dark:text-gray-300 transition-all duration-300
                             hover:scale-105 btn-ripple animate-scale-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Source Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('sourceDomain')}
              </label>
              <input
                type="text"
                value={filters.domains}
                onChange={(e) => handleFilterChange('domains', e.target.value)}
                placeholder="e.g., bbc.com, cnn.com"
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('sourceHint')}
              </p>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('newsLanguage')}
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="he">Hebrew</option>
                <option value="it">Italian</option>
                <option value="nl">Dutch</option>
                <option value="no">Norwegian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded 
                           font-medium transition-all duration-300 flex-1 hover:scale-105
                           btn-ripple shadow-md hover:shadow-lg"
              >
                ✨ {t('applyFilters')}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
                           dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded 
                           font-medium transition-all duration-300 hover:scale-105 btn-ripple"
              >
                🔄 {t('reset')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;