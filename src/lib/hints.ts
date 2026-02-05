// Context-aware hints that appear based on user actions and page state
export const HINTS = {
  // Homepage hints
  'home.hero': {
    title: 'Welcome!',
    message: 'This is your AI-powered marketplace. We learn what you like and get smarter with every visit.',
    delay: 2000,
    duration: 5000,
  },
  'home.features': {
    title: 'How it works',
    message: 'Everything here is built to be fast, smart, and genuinely helpful, not pushy.',
    delay: 5000,
    duration: 5000,
  },
  'home.explore': {
    title: 'Next step',
    message: 'Browse products and let our AI adapt to what you like. No accounts needed to look around.',
    delay: 8000,
    duration: 5000,
  },

  // Shop page hints
  'shop.welcome': {
    title: 'Smart search',
    message: 'Type anything, our AI understands what you are looking for, even if you are not specific.',
    delay: 1500,
    duration: 4000,
  },
  'shop.filter': {
    title: 'Pro tip',
    message: 'Use filters to narrow down. We remember what matters to you.',
    delay: 4000,
    duration: 4000,
  },
  'shop.hover': {
    title: 'Quick look',
    message: 'Hover over products to see more details. Click to explore everything.',
    delay: 2000,
    duration: 3000,
  },

  // Product detail hints
  'product.view': {
    title: 'Ask about it',
    message: 'Not sure about this product? Our AI assistant can help explain features and find alternatives.',
    delay: 3000,
    duration: 5000,
  },
  'product.add': {
    title: 'Great choice!',
    message: 'Added to cart. Keep browsing or check out whenever you are ready, no rush.',
    delay: 500,
    duration: 3000,
  },

  // Cart hints
  'cart.view': {
    title: 'Your collection',
    message: 'Looks good! You can keep shopping, tweak quantities, or head to checkout anytime.',
    delay: 1000,
    duration: 4000,
  },
  'cart.empty': {
    title: 'Let us find something',
    message: 'Your cart is empty. Browse products and add what catches your eye. We can help you find it.',
    delay: 500,
    duration: 4000,
  },

  // Checkout hints
  'checkout.start': {
    title: 'Almost there',
    message: 'Just a few details and your order is ready. We keep everything secure and simple.',
    delay: 1000,
    duration: 4000,
  },
  'checkout.shipping': {
    title: 'Shipping',
    message: 'Choose how you would like it delivered. Fastest option is usually the best bang for your buck.',
    delay: 1000,
    duration: 4000,
  },

  // Auth hints
  'auth.signup': {
    title: 'Join us',
    message: 'Create an account and we will remember your preferences. Faster checkouts, better recommendations.',
    delay: 1000,
    duration: 5000,
  },
  'auth.login': {
    title: 'Welcome back',
    message: 'Log in and we will pick up where you left off. Your preferences are here waiting.',
    delay: 1000,
    duration: 4000,
  },

  // Error recovery
  'error.network': {
    title: 'Connection issue',
    message: 'We lost connection for a moment. Retrying... You will not lose your cart or selections.',
    delay: 500,
    duration: 4000,
  },
  'error.recovery': {
    title: 'Back online',
    message: 'We are back! Everything is restored. You are all set to continue.',
    delay: 500,
    duration: 3000,
  },

  // Feature discovery
  'feature.ai_chat': {
    title: 'AI Assistant',
    message: 'Click the chat bubble to ask anything. What is trending? Find me something under fifty? I get it.',
    delay: 4000,
    duration: 5000,
  },
  'feature.voice': {
    title: 'Voice search',
    message: 'Try speaking what you want. Just click the mic and tell me. Hands-free browsing made easy.',
    delay: 5000,
    duration: 5000,
  },

  // Real-time actions
  'action.search': {
    title: 'Instant results',
    message: 'See products as you type. No need to hit search, we are already showing you what you want.',
    delay: 800,
    duration: 3000,
  },
} as const;

export type HintKey = keyof typeof HINTS;

export interface Hint {
  title: string;
  message: string;
  delay: number;
  duration: number;
}

export function getHint(key: HintKey): Hint {
  return HINTS[key];
}
