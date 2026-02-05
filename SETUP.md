# Zayx Store - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Get Free AI API Key (Hugging Face)

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Create a token with **Read** permission
4. Copy the token

### 2. Setup Supabase (Free Database)

1. Go to https://supabase.com
2. Click "Start your project"
3. Create a new project (select free tier)
4. Go to **Settings → API**
5. Copy your:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Update Environment Variables

Edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
HUGGINGFACE_API_KEY=your-hf-token-here
```

### 4. Setup Supabase Database Tables

Run these SQL commands in Supabase console:

**Products Table:**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compareAtPrice DECIMAL(10, 2),
  category VARCHAR,
  stock INT DEFAULT 0,
  image VARCHAR,
  images JSONB,
  rating DECIMAL(3, 1),
  reviews INT DEFAULT 0,
  tags JSONB,
  isBestseller BOOLEAN DEFAULT FALSE,
  isNew BOOLEAN DEFAULT FALSE,
  sku VARCHAR UNIQUE,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR,
  passwordHash VARCHAR,
  role VARCHAR DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(id),
  status VARCHAR DEFAULT 'pending',
  total DECIMAL(10, 2),
  items JSONB,
  shippingAddress JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Run Development Server

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 📋 What's Included

### ✅ Already Built
- Modern homepage with hero section
- Products catalog with search & filters
- Shopping cart
- Checkout flow
- Admin dashboard
- AI chatbot (free Hugging Face)
- Responsive design
- PWA ready

### 🔄 Features You Can Add Later
- Payment processing (Stripe)
- Email notifications
- Advanced analytics
- Inventory management
- Voice features (ElevenLabs)
- Mobile app (React Native)

---

## 💰 Cost Breakdown

| Feature | Cost |
|---------|------|
| **Hosting (Vercel)** | FREE (for starter) |
| **Database (Supabase)** | FREE (up to 500MB) |
| **AI Chat (Hugging Face)** | FREE (with limits) |
| **Email (Resend)** | FREE (up to 100/day) |
| **Domain** | $10-15/year |
| **Total Monthly** | ~$0 (FREE!) |

---

## 🔧 Customization Guide

### Change Store Name
1. Edit `src/lib/constants.ts` - Update `STORE_NAME`
2. Edit `src/app/layout.tsx` - Update page title
3. Edit Header component - Change logo text

### Add Your Products
1. Option A: Add via Admin Dashboard (`/dashboard`)
2. Option B: Import CSV via database

### Customize Colors
Edit `tailwind.config.js` to change the theme:
```js
theme: {
  colors: {
    cyan: { ... },  // Change accent color
  }
}
```

### Enable Stripe Payments
1. Get Stripe API key from https://stripe.com
2. Add to `.env.local`: `STRIPE_SECRET_KEY=...`
3. Update checkout component

---

## 📱 Deployment to Vercel (Free)

```bash
# Push code to GitHub first
git push origin main

# Then deploy on Vercel
# Go to vercel.com → New Project → Select your repo
```

---

## 🆘 Troubleshooting

**Q: Chat not working?**
A: Check if `HUGGINGFACE_API_KEY` is set in `.env.local`

**Q: Products not showing?**
A: Verify Supabase `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Q: "Can't connect to database"?**
A: Make sure Supabase project is active and tables are created

---

## 🎯 Next Steps

1. ✅ Setup environment variables
2. ✅ Create Supabase tables
3. ✅ Add your products
4. ✅ Test locally (`npm run dev`)
5. ✅ Deploy to Vercel
6. Optional: Add Stripe for real payments
7. Optional: Add email notifications

---

**Questions?** Check the code comments in `/src` folders for more details.
