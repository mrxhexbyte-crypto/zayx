// App configuration constants
export const APP_CONFIG = {
  name: 'Zayx Store',
  description: 'Ultimate AI-Powered E-Commerce Platform',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  
  // API
  api: {
    baseUrl: '/api',
    timeout: 10000,
  },

  // Pagination
  pagination: {
    defaultLimit: 12,
    maxLimit: 100,
  },

  // Prices
  prices: {
    shippingCost: 9.99,
    taxRate: 0.08,
    minOrderValue: 5,
  },

  // Features
  features: {
    aiChat: true,
    voiceChat: true,
    realtime: true,
    pwa: true,
    threeD: true,
  },

  // Sorting options
  sortOptions: [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Rating', value: 'rating' },
    { label: 'Bestseller', value: 'bestseller' },
  ],

  // Categories
  categories: [
    { id: 'electronics', label: 'Electronics', icon: 'Zap' },
    { id: 'audio', label: 'Audio', icon: 'Headphones' },
    { id: 'wearables', label: 'Wearables', icon: 'Watch' },
    { id: 'accessories', label: 'Accessories', icon: 'Briefcase' },
  ],
};

// Supabase
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// OpenAI
export const OPENAI_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY!,
  model: 'gpt-4',
  maxTokens: 500,
};

// ElevenLabs
export const ELEVENLABS_CONFIG = {
  apiKey: process.env.ELEVENLABS_API_KEY!,
  voiceId: process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
};

// Auth
export const AUTH_CONFIG = {
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
};
