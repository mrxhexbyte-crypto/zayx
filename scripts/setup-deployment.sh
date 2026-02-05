#!/bin/bash

# ZAYX STORE - Deployment Setup Script
# This script helps you prepare for deployment

echo "🚀 ZAYX STORE - Deployment Setup"
echo "=================================="
echo ""

# Check Node version
echo "✓ Checking Node version..."
NODE_VERSION=$(node -v)
echo "  Node: $NODE_VERSION"

# Check npm version
echo "✓ Checking npm version..."
NPM_VERSION=$(npm -v)
echo "  npm: $NPM_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check for env file
echo ""
echo "🔑 Checking environment setup..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found"
    echo "   Copy .env.example to .env.local"
    echo "   Fill in your API keys"
    cp .env.example .env.local
    echo "✓ Created .env.local (edit with your values)"
else
    echo "✓ .env.local found"
fi

# Type checking
echo ""
echo "🔍 Running type checking..."
npm run typecheck

# Linting
echo ""
echo "✨ Running linter..."
npm run lint --fix

# Build
echo ""
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo ""
    echo "1. VERIFY YOUR CHANGES"
    echo "   npm run dev"
    echo "   Open http://localhost:3000"
    echo ""
    echo "2. DEPLOY"
    echo "   Option A: Vercel (Recommended)"
    echo "     - Push to GitHub"
    echo "     - Go to vercel.com → Import Project"
    echo "     - Add env variables"
    echo "     - Click Deploy"
    echo ""
    echo "   Option B: Netlify"
    echo "     - Push to GitHub"
    echo "     - Go to netlify.com → New site from Git"
    echo "     - Add env variables"
    echo "     - Click Deploy"
    echo ""
    echo "   Option C: Custom Server"
    echo "     - Run: npm start"
    echo "     - Setup domain & SSL"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    echo "   Check errors above and fix them"
    exit 1
fi
