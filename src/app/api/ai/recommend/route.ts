import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const category = searchParams.get('category');
    const budget = searchParams.get('budget');

    // Try to fetch from Supabase
    let products: any[] = [];
    let currentProduct: any = null;

    try {
      // Get all products for recommendations
      if (supabase) {
        const { data: allProducts } = await supabase
          .from('products')
          .select('*')
          .limit(50);

        products = allProducts || [];

        // Get current product if ID is provided
        if (productId && supabase) {
          const { data } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
          currentProduct = data;
        }
      }
    } catch (error) {
      // Fallback to sample products
      products = SAMPLE_PRODUCTS;
      if (productId) {
        currentProduct = SAMPLE_PRODUCTS.find(p => p.id === productId);
      }
    }

    // Apply filters
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (budget) {
      filtered = filtered.filter(p => p.price <= parseFloat(budget));
    }

    // Smart recommendation algorithm (free, no API needed)
    let recommendations: any[] = [];

    if (currentProduct) {
      // Find products similar to current product
      const similarProducts = filtered.filter(
        p => p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
         (p.price > (currentProduct.price * 0.5) && p.price < (currentProduct.price * 1.5)))
      );

      // Sort by rating and relevance
      recommendations = similarProducts
        .sort((a, b) => {
          const aScore = (a.rating || 0) * (a.reviews || 0);
          const bScore = (b.rating || 0) * (b.reviews || 0);
          return bScore - aScore;
        })
        .slice(0, 5);
    } else {
      // If no product ID, recommend bestsellers or highest rated
      recommendations = filtered
        .sort((a, b) => {
          const aScore = (a.isBestseller ? 10 : 0) + (a.rating || 0);
          const bScore = (b.isBestseller ? 10 : 0) + (b.rating || 0);
          return bScore - aScore;
        })
        .slice(0, 6);
    }

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
      message: currentProduct
        ? `Recommendations based on: ${currentProduct.name}`
        : 'Popular and highly-rated products',
    });
  } catch (error) {
    console.error('Recommendation API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
