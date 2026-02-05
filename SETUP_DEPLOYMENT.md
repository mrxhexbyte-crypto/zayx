# 🔧 Complete Setup & Deployment Guide

## Part 1: Local Development Setup

### Prerequisites
- Node.js 20+ ([Download](https://nodejs.org))
- npm or yarn
- Code editor (VS Code recommended)
- Git

### Step 1: Install & Configure

```bash
# Clone or setup project
cd your-project-folder

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### Step 2: Configure .env.local

Edit `.env.local` with minimal setup (demo mode):
```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Add later for features
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# OPENAI_API_KEY=
# ELEVENLABS_API_KEY=
```

### Step 3: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✅

---

## Part 2: Enable Smart Features

### Feature 1: Smart Recommendations (Already Enabled)
✅ No setup needed - works with sample data
- Auto-tracking user behavior
- Generates recommendations on product pages
- Shows trending products on listing

**Test it**:
1. Visit `/shop/products`
2. Click on 2-3 products
3. Visit any product detail page
4. See "Recommended Just for You" below product

### Feature 2: Analytics Dashboard
✅ No setup needed in demo mode
- Visit `/admin/analytics`
- Shows mock analytics data
- Real data when connected to Supabase

### Feature 3: AI Chatbot
- Currently enabled with HuggingFace (free tier)
- No API key needed for demo
- Better results with OpenAI (see below)

---

## Part 3: Connect to Supabase (Real Database)

### Step 1: Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up → Create new project
4. Choose region → Create

### Step 2: Get Your Keys

In Supabase Dashboard:
1. Go to Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Update .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Create Database Tables

In Supabase, go to **SQL Editor** and run this:

```sql
-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compareAtPrice DECIMAL(10, 2),
  image TEXT,
  images TEXT[],
  category TEXT,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3, 2),
  reviews INTEGER DEFAULT 0,
  tags TEXT[],
  isBestseller BOOLEAN DEFAULT false,
  isNew BOOLEAN DEFAULT true,
  sku TEXT UNIQUE,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  items JSONB NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create chat messages table (for AI chat history)
CREATE TABLE chat_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  message TEXT NOT NULL,
  response TEXT,
  model TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create analytics events table (optional, for detailed tracking)
CREATE TABLE analytics_events (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  user_id TEXT,
  event_type TEXT, -- view, click, purchase, search
  product_id TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_bestseller ON products(isBestseller);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_analytics_session_id ON analytics_events(session_id);

-- Enable Row Level Security (optional, for security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
```

### Step 5: Seed Products

Option A: Manual insert (via Supabase Dashboard)
```sql
INSERT INTO products (id, name, price, image, category, rating, reviews, isBestseller, isNew) VALUES
('1', 'Premium Wireless Headphones', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'audio', 4.8, 234, true, false),
-- Add more from SAMPLE_PRODUCTS...
;
```

Option B: Use JavaScript seeding script:
```bash
# Create scripts/seed.js
# Run: node scripts/seed.js
```

### Step 6: Verify Connection

After restart:
1. Visit `/shop/products`
2. Products should load from Supabase
3. Check browser Network tab - requests to `supabase` should work
4. Admin `/admin/analytics` should show real data

---

## Part 4: Add AI Features (Optional)

### OpenAI ChatGPT

1. Visit [openai.com](https://openai.com)
2. Sign up → Create API key
3. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

### ElevenLabs Voice

1. Visit [elevenlabs.io](https://elevenlabs.io)
2. Sign up → Create API key
3. Add to `.env.local`:
   ```env
   ELEVENLABS_API_KEY=your-key-here
   ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   ```

---

## Part 5: Deploy to Vercel

### Step 1: Push to GitHub

```bash
# Make sure git is initialized
git init
git add .
git commit -m "Initial commit: Zayx AI Commerce Platform"

# Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zayx.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Import"

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

Add these (if using Supabase):
```
NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_key
OPENAI_API_KEY = your_key (if using)
ELEVENLABS_API_KEY = your_key (if using)
```

⚠️ **Important**: Keep `NEXT_PUBLIC_` prefix only for public keys!

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your live URL! 🎉

### Step 5: Configure Domain (Optional)

In Vercel → Project Settings → Domains:
1. Add your domain
2. Follow DNS setup instructions
3. (Usually takes 24-48 hours to activate)

---

## Part 6: Advanced: Docker & Self-Hosting

### Build Docker Image

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -t zayx .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... zayx
```

---

## Part 7: Performance Optimization

### Enable Production Build

```bash
npm run build  # Check for errors
npm start      # Run production server
```

### Monitor Performance

```bash
# Check build size
npm run build -- --analyze

# Run lighthouse audit
npm install -g lighthouse
lighthouse https://your-domain.com
```

### Key Optimizations (Already Done)
✅ Image optimization (Next.js)
✅ Code splitting (Next.js)
✅ CSS-in-JS (Tailwind)
✅ API caching
✅ Local storage for analytics (no DB calls)

---

## Part 8: Security Checklist

### Before Going Live
- [ ] Remove demo data from production
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Set up CORS properly
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable Supabase RLS (Row Level Security)
- [ ] Set up rate limiting on APIs
- [ ] Test with OWASP Top 10

### Supabase RLS Example
```sql
-- Only users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can create orders
CREATE POLICY "Authenticated users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## Part 9: Monitoring & Maintenance

### Setup Error Tracking

Add Sentry for error monitoring:
```bash
npm install @sentry/nextjs
```

### Monitor Analytics

1. Vercel Analytics (automatic)
2. Supabase logs
3. Custom dashboard at `/admin/analytics`

### Backup Database

In Supabase Dashboard:
1. Settings → Database → Backups
2. Enable daily automatic backups
3. Keep 30-day retention

---

## Part 10: Troubleshooting

### Build fails locally?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables not working?
```bash
# Verify file exists
ls -la .env.local

# Restart dev server
npm run dev

# Check that variables are loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Supabase connection fails?
```bash
# Test connection
curl "https://your-project.supabase.co/rest/v1/"
  -H "apikey: your-anon-key"
```

### Vercel deployment stuck?
1. Check build logs in Vercel Dashboard
2. Verify environment variables are set
3. Try rebuilding from Vercel UI

---

## Summary of Deployment Steps

```
Development
  ↓
npm install && npm run dev
  ↓
Test locally
  ↓
Configure Supabase (optional)
  ↓
Push to GitHub
  ↓
Connect to Vercel
  ↓
Set environment variables
  ↓
Deploy
  ↓
Add domain (optional)
  ↓
Monitor & maintain
```

---

## Quick Command Reference

```bash
# Development
npm run dev          # Start dev server
npm run lint         # Check code quality
npm run format       # Format code
npm run typecheck    # TypeScript check

# Production
npm run build        # Build for production
npm start            # Start production server

# Database (Supabase)
npm run seed         # Seed database
npm run migrate      # Run migrations

# Deployment
git push             # Push to GitHub
# Vercel auto-deploys on push
```

---

## Resources

- **Documentation**: See `ARCHITECTURE.md` & `GETTING_STARTED.md`
- **Next.js**: https://nextjs.org/docs/deployment/vercel
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Tailwind**: https://tailwindcss.com/docs
- **OpenAI**: https://platform.openai.com/docs

---

**Ready to go live?** 🚀

Follow these steps and you'll have a production-ready AI commerce platform!
