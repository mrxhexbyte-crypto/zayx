# 🏗️ Zayx Enterprise Website Architecture

## Overview

Your website is built on a **smart, interconnected architecture** with three core layers:

### **Layer 1: Smart Data Flow**
```
User Actions → Event Tracking → Behavior Analysis → Recommendations → Personalization
```

### **Layer 2: Interconnected Pages**
```
Home (/) ↔ Products (/shop/products) ↔ Product Details (/shop/products/[id])
    ↓           ↓                           ↓
Chat Widget  Cart (/shop/cart)  Smart Recommendations
    ↓           ↓                           ↓
Analytics   Checkout         AI Suggestions
```

### **Layer 3: Admin Intelligence**
```
Dashboard (/admin/dashboard) ↔ Analytics (/admin/analytics) ↔ Product Management (/admin/products)
    ↓
Real-time Insights → Business Decisions
```

---

## Page Structure & Routing

### **Public Pages**
| Route | File | Purpose | Smart Features |
|-------|------|---------|-----------------|
| `/` | `src/app/page.tsx` | Home page with hero, features, CTA | Auto-updating featured products, hero animations |
| `/shop/products` | `src/app/shop/products/page.tsx` | Product listing with filtering | Smart filtering, search with AI, pagination |
| `/shop/products/[id]` | `src/app/shop/products/[id]/page.tsx` | Product detail & purchase | View tracking, smart recommendations, related products |
| `/shop/cart` | `src/app/shop/cart/page.tsx` | Shopping cart | Cart tracking, quantity management, estimated total |
| `/shop/checkout` | `src/app/shop/checkout/page.tsx` | Checkout flow | Purchase tracking, order validation |
| `/auth/login` | `src/app/auth/login/page.tsx` | User login | Auth state management |
| `/auth/signup` | `src/app/auth/signup/page.tsx` | User registration | User tracking, behavior profiling |

### **Admin Pages**
| Route | File | Purpose | Smart Features |
|-------|------|---------|-----------------|
| `/admin/dashboard` | `src/app/admin/dashboard/page.tsx` | Overview & KPIs | Real-time metrics, sales trends |
| `/admin/analytics` | `src/app/admin/analytics/page.tsx` | Detailed analytics | User behavior analysis, product performance, conversion rates |
| `/admin/products` | `src/app/admin/products/page.tsx` | Product management | CRUD operations, inventory sync |
| `/admin/products/[id]` | `src/app/admin/products/[id]/page.tsx` | Edit product | Analytics per product |
| `/admin/products/new` | `src/app/admin/products/new/page.tsx` | Add new product | Auto-categorization |
| `/admin/orders` | `src/app/admin/orders/page.tsx` | Order management | Order tracking, fulfillment |

---

## Smart Features Explained

### **1. Smart Recommendation Engine** 
**File**: `src/lib/smart/recommendation-engine.ts`

Uses **collaborative + content-based filtering**:
- Analyzes product similarity (category, price, tags)
- Ranks products based on user behavior
- Returns top recommendations with reasons

```typescript
// Algorithm:
const score = (
  2x similarity_to_viewed_products +
  1.5x category_match +
  1x bestseller_boost +
  0.5x price_range_match +
  rating_boost
)
```

**Used in**:
- Home page (featured products)
- Product detail page (related items)
- Admin dashboard (top performing products)

### **2. Behavior Tracker**
**File**: `src/lib/smart/behavior-tracker.ts`

Tracks user interactions **locally in browser**:
- Product views → builds viewing history
- Clicks → identifies interest
- Cart additions → tracks purchase intent
- Purchases → updates profile

**Data stored**:
```json
{
  "viewedProducts": ["id1", "id2", ...],
  "purchasedProducts": ["id3", ...],
  "category": ["electronics", "audio"],
  "priceRange": { "min": 0, "max": 1000 },
  "lastViewedAt": { "id1": timestamp }
}
```

### **3. Smart React Hooks**
**File**: `src/hooks/use-smart-recommendations.ts`

```typescript
// Get personalized recommendations
const { recommendations, reasons } = useSmartRecommendations(allProducts)

// Track user interactions
const { trackClick, trackAddToCart, trackPurchase } = useTrackInteraction()

// Get user analytics
const analytics = useUserAnalytics()

// Smart search
const { results, search } = useSmartSearch(allProducts)
```

### **4. Analytics Dashboard**
**File**: `src/components/Admin/AnalyticsDashboard.tsx`
**API**: `src/app/api/analytics/dashboard/route.ts`

Shows:
- Total orders, revenue, conversion rate
- Top performing products (by views, sales, revenue)
- Category insights
- Smart recommendations for business decisions

---

## Data Flow Examples

### **Example 1: User Browsing → Personalized Recommendations**
```
1. User visits /shop/products/1 (Headphones)
   ↓
2. useTrackProductView() fires
   → behaviorTracker.trackEvent({ type: 'view', productId: '1' })
   → stores in localStorage
   ↓
3. recommendationEngine.generateRecommendations()
   → analyzes viewing history
   → finds similar products (audio category, price range)
   → returns sorted list with reasons
   ↓
4. <SmartRecommendations> component renders
   → shows "Recommended Just for You"
   → displays reason: "Similar to Headphones"
```

### **Example 2: Cart → Purchase Tracking → Analytics**
```
1. User adds product to cart
   → trackAddToCart(productId, price)
   → event stored in localStorage
   ↓
2. User completes checkout
   → trackPurchase(productId, price, category)
   → event stored & behavior profile updated
   ↓
3. Admin visits /admin/analytics
   → fetches aggregated analytics
   → shows conversion rate, revenue, top products
```

### **Example 3: Search → Smart Results**
```
1. User searches "wireless"
   → useSmartSearch('wireless')
   ↓
2. recommendationEngine.search()
   → calculates relevance scores:
     - Name match: 100% weight
     - Description match: 50% weight
     - Tag match: 30% weight each
   ↓
3. Returns sorted results by relevance
```

---

## Component Communication Map

```
Header
├── useCart() → cart items & count
├── useAuth() → user state
└── Links to all pages

Home (/)
├── Featured Products (static + trending)
├── Features Section
├── AI Features (Chat, Voice, IoT)
└── CTA → /shop/products

Products Page (/shop/products)
├── useSmartSearch() → search results
├── useSmartRecommendations() → trending
├── ProductCard components
└── Links to /shop/products/[id]

Product Detail ([id])
├── useTrackProductView() → logs view
├── useTrackInteraction() → logs clicks
├── SmartRecommendations → shows related items
└── Links to /shop/cart

Cart Page (/shop/cart)
├── useCart() → cart items
├── Quantity management
└── Link to /shop/checkout

Admin Dashboard
├── useAuth({ requireAdmin: true })
├── AnalyticsDashboard component
├── Real-time stats
└── Links to sub-pages
```

---

## State Management Strategy

### **Global State** (Zustand)
```typescript
// Cart state
useCart() → {
  items: CartItem[]
  itemCount: number
  addItem(), removeItem(), clearCart()
}

// Auth state
useAuth() → {
  user: User | null
  isAuthenticated: boolean
  login(), signup(), logout()
}
```

### **Local State** (localStorage)
```typescript
// User behavior (tracked by behaviorTracker)
localStorage['zayx_user_behavior'] → UserBehavior object
localStorage['zayx_user_events'] → Event[] array

// Session tracking
sessionId → unique identifier per session
```

---

## API Routes & Endpoints

### **Products**
- `GET /api/products` → list all products (with filters, sorting, pagination)
- `GET /api/products/[id]` → get single product
- `POST /api/products` → create product (admin only)
- `PUT /api/products/[id]` → update product (admin only)
- `DELETE /api/products/[id]` → delete product (admin only)

### **Analytics**
- `GET /api/analytics/dashboard` → aggregated stats
- `GET /api/analytics/products` → per-product analytics
- `GET /api/analytics/users` → user behavior data

### **Orders**
- `GET /api/orders` → list orders
- `POST /api/orders` → create order
- `GET /api/orders/[id]` → get order details

### **Auth**
- `POST /api/auth/signup` → register user
- `POST /api/auth/login` → authenticate user
- `POST /api/auth/logout` → clear session

### **AI Services**
- `POST /api/ai/chat` → AI chat responses
- `POST /api/ai/voice` → text-to-speech
- `POST /api/ai/image-gen` → image generation

---

## Environment Setup

```bash
# Copy template
cp .env.example .env.local

# Required for demo mode (no keys needed):
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production features:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
OPENAI_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
```

---

## Performance Optimizations

✅ **Image Optimization**: Next.js Image component with lazy loading
✅ **Code Splitting**: Dynamic imports for heavy components
✅ **Memoization**: React.memo for ProductCard, SmartRecommendations
✅ **Local Caching**: localStorage for behavior tracking (no API calls)
✅ **Pagination**: Limit API results, lazy load more
✅ **Edge Computing**: API routes optimized for serverless

---

## Security & Best Practices

✅ **Client-side Tracking**: Behavior data stays in browser (privacy-first)
✅ **Server-side Validation**: All API routes validate input
✅ **Auth Middleware**: Admin routes check role/permissions
✅ **No Sensitive Data**: Never store passwords or PII in localStorage
✅ **HTTPS Only**: All external APIs use secure connections
✅ **Rate Limiting**: Consider adding for AI/API routes

---

## Extensibility & Future Roadmap

### **Phase 1: Current** (Complete)
✓ Smart recommendations
✓ Behavior tracking
✓ Admin analytics
✓ Product management

### **Phase 2: Coming** (Easy to add)
- [ ] Email notifications (when products back in stock)
- [ ] Wishlist feature (favorite products)
- [ ] User reviews & ratings
- [ ] Social sharing
- [ ] Payment gateway integration

### **Phase 3: Advanced** (With more effort)
- [ ] Real-time inventory sync via Supabase
- [ ] Multi-language support
- [ ] A/B testing for promotions
- [ ] ML model training on real data
- [ ] Voice shopping integration

---

## Quick Start

1. **Install & Setup**
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

2. **Test Smart Features**
   - Visit `/shop/products` → click products
   - View `/shop/products/1` → see recommendations
   - Check admin `/admin/analytics` → see your behavior tracked

3. **Connect to Supabase** (optional)
   - Create project at supabase.com
   - Add keys to .env.local
   - Run SQL from SETUP.md
   - All features will use real database

---

## File Structure
```
src/
├── app/
│   ├── page.tsx (home)
│   ├── layout.tsx (root layout)
│   ├── shop/
│   │   ├── products/
│   │   │   ├── page.tsx (listing)
│   │   │   └── [id]/page.tsx (detail)
│   │   ├── cart/page.tsx
│   │   └── checkout/page.tsx
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── products/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── api/
│       ├── products/route.ts
│       ├── orders/route.ts
│       └── analytics/route.ts
├── components/
│   ├── Shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SmartRecommendations.tsx
│   ├── Admin/
│   │   └── AnalyticsDashboard.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── smart/
│   │   ├── recommendation-engine.ts
│   │   └── behavior-tracker.ts
│   ├── api-client.ts
│   └── supabaseClient.ts
├── hooks/
│   ├── use-cart.ts
│   ├── use-auth.ts
│   └── use-smart-recommendations.ts
├── types/
│   └── index.ts
└── data/
    └── sample-products.ts
```

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
