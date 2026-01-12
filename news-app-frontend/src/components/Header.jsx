import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 animate-slide-down">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 animate-scale-in">

            {/* Font Awesome Globe Icon */}
            <i className="fa-solid fa-globe text-blue-400 text-2xl md:text-3xl"></i>

            {/* App Name */}
            <span className="hover:scale-105 transition-transform duration-300 cursor-pointer">
              WorldLens
            </span>
          </h1>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Selector */}
            <div className="flex gap-1 md:gap-2">
              {[
                { code: 'en', label: 'EN' },
                { code: 'si', label: 'සිං' },
                { code: 'ta', label: 'த' },
              ].map((lang, idx) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    i18n.language === lang.code
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-180 btn-ripple"
              aria-label="Toggle dark mode"
            >
              <span className="text-lg md:text-xl inline-block">{darkMode ? '🌞' : '🌚'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
