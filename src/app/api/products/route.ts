import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import { Product, ProductFilters } from '@/types';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Try to fetch from Supabase first
    try {
      if (!supabase) throw new Error('Supabase not configured');
      let query = supabase.from('products').select('*', { count: 'exact' });

      // Apply filters
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }

      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'bestseller':
          query = query.eq('isBestseller', true).order('createdAt', { ascending: false });
          break;
        default:
          query = query.order('createdAt', { ascending: false });
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (!error && data) {
        return NextResponse.json({
          success: true,
          data,
          total: count || 0,
          page,
          limit,
          hasMore: (count || 0) > offset + limit,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (supabaseError) {
      console.warn('Supabase not available, using demo data:', supabaseError);
    }

    // Fallback to demo data
<<<<<<< HEAD
    const filteredProducts = filterSampleProducts({
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      search: search || undefined,
=======
    let filteredProducts = SAMPLE_PRODUCTS.filter(product => {
      if (category && category !== 'all' && product.category !== category) return false;
      if (minPrice && product.price < parseFloat(minPrice)) return false;
      if (maxPrice && product.price > parseFloat(maxPrice)) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      return true;
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
    });

    // Sort
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'bestseller':
        sorted = sorted.filter(p => p.isBestseller);
        break;
    }

    // Paginate
    const offset = (page - 1) * limit;
    const paginatedData = sorted.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedData,
      total: sorted.length,
      page,
      limit,
      hasMore: sorted.length > offset + limit,
      timestamp: new Date().toISOString(),
      isDemoData: true,
      message: 'Using demo data - configure .env.local with Supabase keys to use real database',
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await req.json();

    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        data: data?.[0],
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
