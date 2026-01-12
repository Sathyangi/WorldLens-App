// server.js - Node.js + Express Backend
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache (optional - stores for 10 minutes)
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper function to check cache
const getCached = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'News API Backend Running',
    status: 'OK',
    endpoints: [
      'GET /api/news/top-headlines',
      'GET /api/news/everything',
      'GET /api/news/sources',
      'POST /api/cache/clear'
    ]
  });
});

// Get top headlines
app.get('/api/news/top-headlines', async (req, res) => {
  try {
    const { country = 'us', category, q } = req.query;
    const cacheKey = `headlines-${country}-${category}-${q}`;
    
    // Check cache
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country,
        category,
        q,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 20
      }
    });

    // Store in cache
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching headlines:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Search everything
app.get('/api/news/everything', async (req, res) => {
  try {
    const { q, from, to, language = 'en', sortBy = 'publishedAt', domains } = req.query;
    const cacheKey = `everything-${q}-${from}-${to}-${language}-${sortBy}-${domains}`;
    
    // Check cache
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const params = {
      apiKey: process.env.NEWS_API_KEY,
      pageSize: 100
    };

    if (q) params.q = q;
    if (from) params.from = from;
    if (to) params.to = to;
    if (language) params.language = language;
    if (sortBy) params.sortBy = sortBy;
    if (domains) params.domains = domains;

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params
    });

    // Store in cache
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error.message);
    res.status(500).json({ 
      error: 'Failed to search news',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get sources
app.get('/api/news/sources', async (req, res) => {
  try {
    const { category, language, country } = req.query;
    const cacheKey = `sources-${category}-${language}-${country}`;
    
    // Check cache
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    const response = await axios.get('https://newsapi.org/v2/sources', {
      params: {
        category,
        language,
        country,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    // Store in cache
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching sources:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch sources',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Clear cache endpoint (optional)
app.post('/api/cache/clear', (req, res) => {
  cache.clear();
  res.json({ message: 'Cache cleared successfully' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📰 News API Key: ${process.env.NEWS_API_KEY ? '✓ Loaded' : '✗ Missing'}`);
});