# 🚀 ZAYX - QUICK START (5 MINUTES)

## Copy-Paste Everything Below

---

## STEP 1: Get API Keys (2 minutes)

### A. Hugging Face (FREE AI Chat)
```
1. Go to: https://huggingface.co/settings/tokens
2. Click "New token"
3. Name: "zayx-ai"
4. Select: "Read"
5. Copy your token
```

### B. Supabase (FREE Database - Optional but RECOMMENDED)
```
1. Go to: https://supabase.com
2. Sign up with GitHub
3. Create new project (free tier)
4. Project name: "zayx"
5. Go to Settings → API
6. Copy:
   - Project URL
   - anon public key
```

---

## STEP 2: Setup Environment Variables (1 minute)

**Edit `.env.local` in your project root:**

```env
# Required
HUGGINGFACE_API_KEY=hf_your_token_here

# Optional but recommended
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## STEP 3: Run Locally (1 minute)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Visit:** http://localhost:3000

---

## STEP 4: Deploy for FREE (Choose One)

### Option A: VERCEL (EASIEST - Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "initial commit"
git push origin main

# 2. Go to: https://vercel.com
# 3. Click "New Project"
# 4. Select your GitHub repo
# 5. Add environment variables:
#    - HUGGINGFACE_API_KEY
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
# 6. Click "Deploy"
```

✅ Done! Your site is LIVE

### Option B: NETLIFY

```
1. Go to: https://netlify.com
2. Connect GitHub repo
3. Build: npm run build
4. Publish: .next
5. Add environment variables
6. Deploy
```

### Option C: FREE Render.com

```
1. Go to: https://render.com
2. Connect GitHub
3. Create Web Service
4. Build: npm run build
5. Start: npm start
6. Add environment variables
7. Deploy
```

---

## STEP 5: Add Your Products (5 minutes)

### Via Admin Dashboard:
```
1. Go to: yoursite.com/dashboard
2. Login (create account first at /signup)
3. Click "Add Product"
4. Fill in details
5. Save
```

### Or Import Sample Products:
```
Sample products are already loaded!
Visit: yoursite.com/products
```

---

## WHAT YOU HAVE NOW

✅ **Homepage** - Beautiful, modern design
✅ **Products Page** - Browse & search
✅ **Shopping Cart** - Full functionality
✅ **Checkout** - Multi-step flow
✅ **Admin Dashboard** - Manage everything
✅ **AI Chatbot** - 24/7 support (FREE)
✅ **Smart Recommendations** - AI-powered
✅ **PWA Support** - Works offline
✅ **Mobile Responsive** - All devices
✅ **Voice Control Ready** - Browser API ready
✅ **AI Avatar Ready** - Component included

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **Chat not working** | Check `HUGGINGFACE_API_KEY` in `.env.local` |
| **Can't see products** | Verify Supabase keys OR use sample data (already included) |
| **Admin dashboard 404** | Create account at `/signup` with any email, then login |
| **Deployment fails** | Check `.env.local` has all required variables |
| **Port 3000 in use** | Run `npm run dev -- -p 3001` (use port 3001) |

---

## NEXT STEPS (OPTIONAL)

### Add Real Payments:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```
Then update `/src/app/(shop)/checkout/page.tsx`

### Add Email Notifications:
```env
RESEND_API_KEY=re_...
```

### Add Voice Features:
```env
ELEVENLABS_API_KEY=sk_...
```

### Connect Custom Domain:
- Buy domain: Namecheap, GoDaddy, Cloudflare
- Point DNS to Vercel (2 minutes)
- Automatic HTTPS ✅

---

## CUSTOMIZATION

### Change Store Name:
1. `src/app/layout.tsx` - Change title
2. `src/components/Layout/Header.tsx` - Change logo
3. `tailwind.config.js` - Change colors

### Change Colors:
Edit `tailwind.config.js`:
```js
theme: {
  colors: {
    cyan: { 400: '#YOUR_COLOR' }
  }
}
```

### Change Products:
- Edit `src/data/sample-products.ts` OR
- Use admin dashboard to add via database

---

## DEPLOYMENT CHECKLIST

- [ ] Environment variables set (.env.local)
- [ ] Run locally: `npm run dev`
- [ ] Test homepage loads
- [ ] Test products page
- [ ] Test chat (if HF key added)
- [ ] Test admin dashboard
- [ ] Push to GitHub
- [ ] Deploy to Vercel/Netlify
- [ ] Domain configured
- [ ] Share your site!

---

## TECH STACK QUICK REFERENCE

```
Frontend:  Next.js 14 + React 18 + Tailwind CSS
Backend:   Next.js API Routes
Database:  Supabase (PostgreSQL) - Optional, uses demo data otherwise
AI:        Hugging Face (FREE)
Auth:      Built-in (no external required)
Deploy:    Vercel (FREE)
```

---

## 💰 COST

| Service | Free Tier |
|---------|-----------|
| Vercel | 1st project FREE ✅ |
| Supabase | 500MB FREE ✅ |
| Hugging Face | API FREE with limits ✅ |
| Domain | ~$12/year (optional) |
| **TOTAL** | **$0-12/year** ✅ |

---

## 🎯 REMEMBER

- No credit card needed to start
- Everything works locally first
- Test everything before deploying
- Supabase is optional (demo data works)
- All code is editable and customizable
- You own everything, no vendor lock-in

---

## 🚀 YOU'RE DONE!

Your AI-powered e-commerce website is ready to make money. No subscriptions, no monthly fees, just pure awesome commerce.

**Go live. Make sales. Enjoy.**

Questions? Check the `/src` code comments or the full SETUP.md, DEPLOYMENT.md, and ARCHITECTURE.md files.
