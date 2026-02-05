# Smart Architecture Guide

Your website now features an intelligent, self-managing system that automatically handles updates, errors, and performance optimization. Here's how it all works together:

## 🤖 Core Smart Features

### 1. **Auto-Updating System** (`useAutoRefresh`)
- **Location**: `src/hooks/use-auto-refresh.ts`
- **Purpose**: Automatically refreshes data at configurable intervals
- **Features**:
  - Intelligent retry logic with exponential backoff
  - Manual refresh capability
  - Error handling and recovery
  - Progress tracking

**Usage**:
```typescript
const { isRefreshing, lastRefresh, error, refresh } = useAutoRefresh({
  interval: 30000, // 30 seconds
  onRefresh: async () => {
    await fetchData();
  },
  enabled: true,
  retryCount: 3,
  exponentialBackoff: true,
});
```

### 2. **Modular Product Store** (`useProductStore`)
- **Location**: `src/store/useProductStore.ts`
- **Purpose**: Centralized state management for products
- **Features**:
  - Smart caching with automatic invalidation
  - Multiple product feeds (featured, recommended, all)
  - Error handling
  - Loading states

**Usage**:
```typescript
const { products, fetchProducts, isLoading } = useProductStore();
```

### 3. **Real-Time Notifications** (`useNotificationStore`)
- **Location**: `src/store/useNotificationStore.ts`
- **Purpose**: Global notification system for user feedback
- **Features**:
  - Auto-closing notifications
  - Multiple notification types (success, error, warning, info)
  - Action buttons
  - Smooth animations

**Usage**:
```typescript
import { notify } from '@/store/useNotificationStore';

notify.success('Success!', 'Product added to cart');
notify.error('Error!', 'Failed to process order');
```

### 4. **Smart Caching Service** (`lib/cache.ts`)
- **Location**: `src/lib/cache.ts`
- **Purpose**: Intelligent data caching with auto-cleanup
- **Features**:
  - LRU (Least Recently Used) eviction
  - Automatic TTL (Time To Live) management
  - Pattern-based cache invalidation
  - Hit rate tracking
  - Memory optimization (50MB max)

**Usage**:
```typescript
import { cache, withCache } from '@/lib/cache';

// Manual cache
cache.set('key', data, 5000); // 5 second TTL
const data = cache.get('key');

// Decorator pattern
const cachedFetch = withCache(fetchProducts, 'products', 5000);

// Invalidate
cache.invalidatePattern('product:*');
```

### 5. **Self-Healing Error Boundary** (`ErrorBoundary/SelfHealingBoundary`)
- **Location**: `src/components/ErrorBoundary/SelfHealingBoundary.tsx`
- **Purpose**: Automatic error recovery and fallback UI
- **Features**:
  - Auto-retry up to 3 times
  - Configurable retry delay
  - Custom fallback UI
  - Error logging

**Usage**:
```typescript
<SelfHealingBoundary autoRetry retryDelay={3000}>
  <YourComponent />
</SelfHealingBoundary>
```

### 6. **Auto-Updating Sections** (`HomePage/AutoUpdateSection`)
- **Location**: `src/components/HomePage/AutoUpdateSection.tsx`
- **Purpose**: Featured products that update automatically
- **Features**:
  - Real-time refresh animations
  - Live update badge
  - Fallback loading states
  - Time-since-update display

### 7. **Live Stats Component** (`LiveStats`)
- **Location**: `src/components/LiveStats.tsx`
- **Purpose**: Real-time metrics dashboard
- **Features**:
  - Auto-updating numbers
  - Animated transitions
  - Multiple metrics (users, orders, revenue)
  - 15-second refresh interval

### 8. **Modular Components** (`Sections/ModularSection`)
- **Location**: `src/components/Sections/ModularSection.tsx`
- **Purpose**: Reusable, consistent component patterns
- **Features**:
  - `ModularSection`: Base section wrapper
  - `ModularGrid`: Responsive grid layout
  - `ModularCard`: Consistent card styling
  - Built-in animations
  - Easy customization

**Usage**:
```typescript
<ModularSection title="My Section" subtitle="Description">
  <ModularGrid cols={3}>
    <ModularCard>Content 1</ModularCard>
    <ModularCard>Content 2</ModularCard>
    <ModularCard>Content 3</ModularCard>
  </ModularGrid>
</ModularSection>
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                     User Interface                   │
├─────────────────────────────────────────────────────┤
│  AutoUpdateSection, LiveStats, ProductCard, etc    │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│              Zustand Stores & Hooks                  │
├─────────────────────────────────────────────────────┤
│ useProductStore, useNotificationStore, useAutoRefresh│
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│            Smart Cache Layer                         │
├─────────────────────────────────────────────────────┤
│ Automatic caching, invalidation, LRU eviction      │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│            API Client & Services                     │
├─────────────────────────────────────────────────────┤
│ /api/products, /api/chat, /api/recommendations    │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│         Backend (Next.js API Routes)                │
├─────────────────────────────────────────────────────┤
│    Database, Supabase, External APIs               │
└─────────────────────────────────────────────────────┘
```

## 🎯 How Auto-Updates Work

1. **Component mounts** → `useAutoRefresh` hook initializes
2. **Initial fetch** → Immediately loads data
3. **Interval timer starts** → Data refreshes at set intervals
4. **Error handling** → If fetch fails, retries with exponential backoff
5. **Cache check** → Before fetching, checks if data is still valid
6. **UI updates** → Zustand store updates → Components re-render
7. **Notifications** → User sees "Live Updates" badge and refresh timestamp

## 🚀 Performance Optimizations

### Smart Caching
- Prevents unnecessary API calls
- Automatic cleanup of expired cache
- LRU eviction when memory limit reached
- Pattern-based invalidation (e.g., `cache.invalidatePattern('product:*')`)

### Code Splitting
- Each page loads only what it needs
- Lazy loading of components
- Modular architecture allows granular optimization

### Animations
- Hardware-accelerated with Framer Motion
- CSS transforms for smooth 60fps experience
- Staggered animations reduce perceived load time

### Bundle Optimization
- Tree-shaking unused code
- CSS purging unused classes
- Image optimization with Next.js Image component

## 🛠️ Common Tasks

### Add Auto-Updating to a Section
```typescript
const { isRefreshing } = useAutoRefresh({
  interval: 30000,
  onRefresh: async () => {
    await myFetchFunction();
  },
});

return (
  <div>
    {isRefreshing && <LoadingSpinner />}
    {/* Your content */}
  </div>
);
```

### Create a Self-Managing Page
```typescript
const [data, setData] = useState([]);

useAutoRefresh({
  interval: 45000,
  onRefresh: async () => {
    const response = await fetch('/api/my-endpoint');
    setData(await response.json());
  },
});

return <div>{/* Your UI */}</div>;
```

### Add Smart Caching to API Calls
```typescript
const fetchWithCache = withCache(
  async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  'product',
  60000 // 1 minute cache
);

const product = await fetchWithCache(productId);
```

### Show Notifications
```typescript
import { notify } from '@/store/useNotificationStore';

// Show success
notify.success('Success!', 'Item added to cart');

// Show error
notify.error('Error!', 'Failed to save');

// With action
useNotificationStore.getState().add({
  type: 'info',
  title: 'New Feature',
  message: 'Check out our new recommendations',
  action: {
    label: 'View Now',
    onClick: () => navigate('/recommendations'),
  },
});
```

## 📊 Monitoring & Debugging

### Check Cache Stats
```typescript
import { cache } from '@/lib/cache';

const stats = cache.getStats();
console.log(`Cache hits: ${stats.hits}, misses: ${stats.misses}`);
console.log(`Hit rate: ${stats.hitRate}%`);
console.log(`Memory used: ${stats.size} bytes`);
```

### Monitor Store State
```typescript
import { useProductStore } from '@/store/useProductStore';

const products = useProductStore((state) => state.products);
const isStale = useProductStore((state) => state.isStale());
console.log(`Products: ${products.length}, stale: ${isStale}`);
```

## 🔐 Security & Best Practices

1. **Always validate API responses** in stores
2. **Clear sensitive cache** on logout:
   ```typescript
   cache.invalidatePattern('user:*');
   ```
3. **Use error boundaries** for critical sections
4. **Set appropriate TTLs** for different data types
5. **Log errors** for debugging and monitoring
6. **Sanitize user input** before caching

## 🎨 Customization Guide

### Change Update Intervals
```typescript
// Faster updates (10 seconds)
useAutoRefresh({ interval: 10000 });

// Slower updates (2 minutes)
useAutoRefresh({ interval: 120000 });
```

### Customize Cache Size
```typescript
// In lib/cache.ts
private maxSize = 100 * 1024 * 1024; // 100MB
```

### Add New Notification Types
```typescript
// In store/useNotificationStore.ts
notify.custom('custom', 'Custom Message');
```

## 📦 Tech Stack

- **Next.js 14**: Full-stack React framework
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety
- **React Hooks**: Advanced component logic
- **Supabase**: Real-time database (optional)

## 🚀 Deployment

The smart architecture is production-ready:
- Works with Vercel, Netlify, and any Node.js host
- Zero-config caching (browser + server-side)
- Auto-recovery from network failures
- Graceful degradation in low-connectivity scenarios

## 📝 Next Steps

1. **Connect Supabase** for real persistent data
2. **Add real AI recommendations** with OpenAI API
3. **Implement real-time WebSockets** for live updates
4. **Add email notifications** for important events
5. **Create admin dashboard** with analytics

---

Built with ❤️ for self-managing, intelligent web experiences.
