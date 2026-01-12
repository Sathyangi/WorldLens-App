import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: "News Hub",
      welcome: "Welcome to",
      tagline: "Your trusted source for global news",
      search: "Search news...",
      loading: "Loading...",
      noResults: "No articles found",
      readMore: "Read More",
      advancedSearch: "Advanced Search",
      fromDate: "From Date",
      toDate: "To Date",
      today: "Today",
      yesterday: "Yesterday",
      lastWeek: "Last Week",
      sourceDomain: "Source Domain",
      sourceHint: "Separate multiple domains with commas",
      newsLanguage: "News Language",
      applyFilters: "Apply Filters",
      reset: "Reset",
      recentUpdates: "Recent Updates",
      clearAll: "Clear All",
      justNow: "Just now",
      minutesAgo: "min ago",
      hoursAgo: "hours ago",
      categories: {
        general: "General",
        business: "Business",
        entertainment: "Entertainment",
        health: "Health",
        science: "Science",
        sports: "Sports",
        technology: "Technology"
      }
    }
  },
  si: {
    translation: {
      appTitle: "පුවත් මධ්‍යස්ථානය",
      welcome: "ආයුබෝවන්",
      tagline: "ගෝලීය පුවත් සඳහා ඔබේ විශ්වාසනීය මාධ්‍යය",
      search: "පුවත් සොයන්න...",
      loading: "පූරණය වෙමින්...",
      noResults: "ලිපි හමු නොවීය",
      readMore: "වැඩිදුර කියවන්න",
      advancedSearch: "උසස් සෙවීම",
      fromDate: "දිනයෙන්",
      toDate: "දින දක්වා",
      today: "අද",
      yesterday: "ඊයේ",
      lastWeek: "පසුගිය සතිය",
      sourceDomain: "මූලාශ්‍ර වසම",
      sourceHint: "බහු වසම් කොමා වලින් වෙන් කරන්න",
      newsLanguage: "පුවත් භාෂාව",
      applyFilters: "පෙරහන් යොදන්න",
      reset: "නැවත සකසන්න",
      recentUpdates: "නවතම යාවත්කාල",
      clearAll: "සියල්ල ඉවත් කරන්න",
      justNow: "මේ දැන්",
      minutesAgo: "මිනිත්තු කට පෙර",
      hoursAgo: "පැය කට පෙර",
      categories: {
        general: "සාමාන්‍ය",
        business: "ව්‍යාපාර",
        entertainment: "විනෝදාස්වාදය",
        health: "සෞඛ්‍යය",
        science: "විද්‍යාව",
        sports: "ක්‍රීඩා",
        technology: "තාක්ෂණය"
      }
    }
  },
  ta: {
    translation: {
      appTitle: "செய்தி மையம்",
      welcome: "வரவேற்கிறோம்",
      tagline: "உலகளாவிய செய்திகளுக்கான உங்கள் நம்பகமான ஆதாரம்",
      search: "செய்திகளைத் தேடுங்கள்...",
      loading: "ஏற்றுகிறது...",
      noResults: "கட்டுரைகள் எதுவும் இல்லை",
      readMore: "மேலும் வாசிக்க",
      advancedSearch: "மேம்பட்ட தேடல்",
      fromDate: "தேதியிலிருந்து",
      toDate: "தேதி வரை",
      today: "இன்று",
      yesterday: "நேற்று",
      lastWeek: "கடந்த வாரம்",
      sourceDomain: "மூல டொமைன்",
      sourceHint: "பல டொமைன்களை கமாக்களால் பிரிக்கவும்",
      newsLanguage: "செய்தி மொழி",
      applyFilters: "வடிகட்டிகளைப் பயன்படுத்து",
      reset: "மீட்டமை",
      recentUpdates: "சமீபத்திய புதுப்பிப்புகள்",
      clearAll: "அனைத்தையும் அழி",
      justNow: "இப்போது",
      minutesAgo: "நிமிடங்களுக்கு முன்",
      hoursAgo: "மணி நேரங்களுக்கு முன்",
      categories: {
        general: "பொது",
        business: "வணிகம்",
        entertainment: "பொழுதுபோக்கு",
        health: "சுகாதாரம்",
        science: "அறிவியல்",
        sports: "விளையாட்டு",
        technology: "தொழில்நுட்பம்"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;