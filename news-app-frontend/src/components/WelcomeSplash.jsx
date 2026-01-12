import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function WelcomeSplash({ onComplete }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center
      bg-gradient-to-br from-[#0b1d3a] via-[#102a43] to-[#1e293b]
      transition-opacity duration-500 opacity-100`}
    >
      {/* CONTENT */}
      <div className="relative z-20 text-center px-4">

        {/* Profile Image */}
        <div className="flex justify-center mb-8 animate-scale-in">
          <div className="relative">
            <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-blue-400 ring-opacity-50">
              <img
                src="/subo.jpg"
                alt="Subodha"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-6xl font-bold">S</div>';
                }}
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-40 animate-ping" />
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-white rounded-full" />
          </div>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider flex flex-wrap justify-center gap-3">
            <span>{t('welcome')}</span>
            {/* Updated app name */}
            <span className="text-blue-200">WorldLens</span>
          </h1>

          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-white rounded-full animate-pulse" />
          </div>

          <p className="text-lg md:text-xl text-blue-100">
            {t('tagline')}
          </p>
        </div>

        {/* Loading */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-2xl" />
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-blue-500 rounded-full opacity-20 blur-2xl" />
      </div>
    </div>
  );
}

export default WelcomeSplash;
