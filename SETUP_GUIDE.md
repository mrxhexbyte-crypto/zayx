# 🚀 Zayx Store - Complete Setup Guide

## Project Overview

Zayx Store is an AI-powered, full-stack e-commerce platform built with:
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI/Voice**: OpenAI + ElevenLabs
- **Real-time**: Supabase Realtime
- **State Management**: Zustand + Context API
- **Deployment**: Vercel

---

## 📁 Directory Structure Overview

```
src/
├── app/                 # Next.js 14 App Router
│   ├── (shop)/         # Shopping routes
│   ├── (auth)/         # Authentication routes
│   ├── (admin)/        # Admin dashboard
│   └── api/            # Backend API routes
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── Shop/          # Shopping components
│   ├── AI/            # AI feature components
│   ├── Admin/         # Admin components
│   └── Layout/        # Layout components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utilities & helpers
├── services/          # External services
├── types/             # TypeScript types
└── config.ts          # App configuration
```

---

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone <your-repo>
cd zayx
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=your_key
```

### 3. Create Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run these commands:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  avatar VARCHAR(500),
  role VARCHAR(50) DEFAULT 'customer',
  isActive BOOLEAN DEFAULT true,
  preferences JSONB,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  compareAtPrice DECIMAL(10, 2),
  image VARCHAR(500),
  images TEXT[],
  category VARCHAR(100),
  stock INT DEFAULT 0,
  rating DECIMAL(2, 1),
  reviews INT DEFAULT 0,
  tags TEXT[],
  isBestseller BOOLEAN DEFAULT false,
  isNew BOOLEAN DEFAULT false,
  sku VARCHAR(100),
  specifications JSONB,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  userId UUID NOT NULL REFERENCES users(id),
  totalPrice DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  shippingAddress JSONB,
  billingAddress JSONB,
  paymentMethod VARCHAR(50),
  trackingNumber VARCHAR(100),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Create order items table
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  orderId TEXT NOT NULL REFERENCES orders(id),
  productId TEXT NOT NULL REFERENCES products(id),
  quantity INT,
  price DECIMAL(10, 2)
);

-- Create chat messages table
CREATE TABLE chat_messages (
  id TEXT PRIMARY KEY,
  userId UUID NOT NULL REFERENCES users(id),
  role VARCHAR(50),
  content TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create public access policy for products
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (true);
```

### 4. Get API Keys

**OpenAI**:
- Go to [openai.com/api](https://openai.com/api)
- Create API key
- Add to `.env.local`

**ElevenLabs**:
- Go to [elevenlabs.io](https://elevenlabs.io)
- Sign up and create API key
- Add to `.env.local`

**Supabase**:
- Project Settings → API
- Copy URL and Anon Key
- Add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3001

---

## 🎯 Key Features Implementation

### AI Chat
- **Location**: `src/components/AI/ChatBot.tsx`
- **API**: `src/app/api/ai/chat/route.ts`
- **Uses**: OpenAI GPT-4

### Voice (TTS)
- **Location**: `src/app/api/ai/voice/route.ts`
- **Uses**: ElevenLabs API

### Product Management
- **Admin Page**: `/admin/products`
- **API**: `src/app/api/products/route.ts`
- **CRUD**: Create, Read, Update, Delete products

### Shopping Cart
- **Hook**: `src/hooks/use-cart.ts`
- **Context**: `src/context/CartContext.tsx`
- **Storage**: localStorage (persisted)

### Authentication
- **Provider**: Supabase Auth
- **Context**: `src/context/AuthContext.tsx`
- **Hook**: `src/hooks/use-auth.ts`

---

## 📋 API Endpoints

### Products
- `GET /api/products` - List products (with filters)
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

### AI
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/voice` - Text-to-speech

### Health
- `GET /api/health` - Health check

---

## 🔐 Authentication Flow

1. User signs up → Supabase Auth creates user
2. User data saved to `users` table
3. JWT token stored in localStorage
4. API routes verify token in Authorization header
5. Admin routes check `user.role === 'admin'`

---

## 🚢 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Click Deploy
6. Domain setup (optional)

---

## 📊 Database Schema

### Users
```
id (UUID) | email | firstName | lastName | role | createdAt
```

### Products
```
id | name | price | category | stock | image | rating | createdAt
```

### Orders
```
id | userId | totalPrice | status | createdAt | updatedAt
```

---

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Type Check
```bash
npm run typecheck
```

### Lint
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 🎨 Styling Guide

- **Colors**: Use Tailwind CSS utilities
- **Components**: Radix UI + custom styling
- **Animations**: Framer Motion
- **Typography**: Geist font

---

## 🔄 Development Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with meaningful message
5. Push to GitHub
6. Create Pull Request
7. Merge to main
8. Deploy to production

---

## 🆘 Common Issues

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Supabase Connection Issues
- Check URL and Key in `.env.local`
- Verify network access
- Check Supabase project settings

### OpenAI API Errors
- Verify API key validity
- Check usage limits
- Ensure account has credits

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI Docs](https://openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)

---

## 📞 Support

For issues or questions:
1. Check documentation
2. Search GitHub issues
3. Create new issue with details

---

**Happy coding! 🎉**
