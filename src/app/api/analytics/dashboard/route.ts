import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';

/**
 * Analytics Dashboard API
 * Returns aggregated analytics data for admin dashboard
 */

export async function GET(req: NextRequest) {
  try {
    // In a real app, this would query your database for actual analytics
    // For demo, we'll generate smart analytics from sample products

    // Calculate statistics
    const totalOrders = Math.floor(Math.random() * 500) + 100; // Mock: 100-600
    const totalRevenue = totalOrders * 150; // Assuming avg $150/order
    const totalViews = totalOrders * 8; // Assuming 8 views per order

    // Group products by category
    const byCategory: Record<string, number> = {};
    SAMPLE_PRODUCTS.forEach(product => {
      byCategory[product.category] = (byCategory[product.category] || 0) + 1;
    });

    const topCategories = Object.entries(byCategory)
      .sort(([, a], [, b]) => b - a)
      .map(([cat]) => cat);

    // Generate product performance data
    const products = SAMPLE_PRODUCTS.map(product => {
      const views = Math.floor(product.reviews! * 2 + Math.random() * 100);
      const sales = Math.floor(views * (product.rating! / 5) * 0.15); // Higher rating = higher conversion
      const conversionRate = views > 0 ? sales / views : 0;
      const revenue = sales * product.price;

      return {
        productId: product.id,
        name: product.name,
        views,
        sales,
        conversionRate,
        revenue: Math.round(revenue * 100) / 100,
      };
    });

    // Sort by revenue
    products.sort((a, b) => b.revenue - a.revenue);

    // Calculate aggregated metrics
    const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
    const avgConversionRate = products.length > 0
      ? products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length
      : 0;

    const stats = {
      totalOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalViews,
      conversionRate: avgConversionRate,
      avgOrderValue: totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0,
      topCategories,
      totalProducts: SAMPLE_PRODUCTS.length,
    };

    return NextResponse.json(
      {
        success: true,
        stats,
        products: products.slice(0, 10), // Top 10 products
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
