import React from 'react';

function HotTopics({ onTopicClick }) {
  const hotTopics = [
    'Trump',
    'Election',
    'Climate Change',
    'Technology',
    'AI',
    'Economy',
    'Ukraine',
    'Entertainment',
    'flood',
    'school',
    'accident',
    'World News'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 animate-slide-down overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Hot Topics Label */}
          <div className="flex-shrink-0 bg-red-600 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider clip-path-arrow">
            HOT TOPICS
          </div>

          {/* Topics List */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {hotTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onTopicClick(topic)}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 
                         rounded-full transition-all duration-300 border border-gray-300 dark:border-gray-600
                         hover:border-blue-600 dark:hover:border-blue-400 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-path-arrow {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%);
          position: relative;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default HotTopics;