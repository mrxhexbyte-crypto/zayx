import { Product } from '@/types';

/**
 * Smart Recommendation Engine
 * Uses collaborative filtering + content-based filtering for intelligent product recommendations
 */

export interface UserBehavior {
  viewedProducts: string[];
  purchasedProducts: string[];
  clickedProducts: string[];
  category: string[];
  priceRange: { min: number; max: number };
  lastViewedAt: Record<string, number>; // productId: timestamp
}

export interface RecommendationResult {
  productId: string;
  score: number;
  reason: string;
}

class RecommendationEngine {
  /**
   * Generate recommendations based on user behavior
   * Combines multiple factors for intelligent suggestions
   */
  generateRecommendations(
    behavior: UserBehavior,
    allProducts: Product[],
    limit: number = 6
  ): RecommendationResult[] {
    const scores = new Map<string, { score: number; reasons: string[] }>();

    // Initialize scores for all products
    allProducts.forEach(product => {
      scores.set(product.id, { score: 0, reasons: [] });
    });

    // Factor 1: Similar to viewed products (content-based)
    behavior.viewedProducts.forEach(viewedId => {
      const viewedProduct = allProducts.find(p => p.id === viewedId);
      if (!viewedProduct) return;

      allProducts.forEach(product => {
        if (product.id === viewedId || behavior.purchasedProducts.includes(product.id)) {
          return; // Skip viewed product itself and already purchased
        }

        const similarity = this.calculateSimilarity(viewedProduct, product);
        const entry = scores.get(product.id)!;
        entry.score += similarity * 2; // Weight: 2x
        if (similarity > 0.5) {
          entry.reasons.push(`Similar to ${viewedProduct.name}`);
        }
      });
    });

    // Factor 2: Complementary products (category-based)
    behavior.category.forEach(category => {
      allProducts
        .filter(p => p.category === category && !behavior.purchasedProducts.includes(p.id))
        .forEach(product => {
          const entry = scores.get(product.id)!;
          entry.score += 1.5; // Weight: 1.5x
          if (!entry.reasons.includes('Popular in your favorite category')) {
            entry.reasons.push('Popular in your favorite category');
          }
        });
    });

    // Factor 3: Best sellers and new products
    allProducts
      .filter(p => (p.isBestseller || p.isNew) && !behavior.purchasedProducts.includes(p.id))
      .forEach(product => {
        const entry = scores.get(product.id)!;
        const boost = product.isBestseller ? 1 : 0.8;
        entry.score += boost; // Weight: 1 or 0.8
        if (product.isBestseller) {
          entry.reasons.push('Bestseller');
        }
        if (product.isNew) {
          entry.reasons.push('New arrival');
        }
      });

    // Factor 4: Price range preference
    allProducts
      .filter(p => this.isPriceInRange(p.price, behavior.priceRange))
      .forEach(product => {
        const entry = scores.get(product.id)!;
        entry.score += 0.5; // Weight: 0.5x
        if (!entry.reasons.includes('In your price range')) {
          entry.reasons.push('In your price range');
        }
      });

    // Factor 5: High rating boost
    allProducts
      .filter(p => (p.rating || 0) >= 4.5)
      .forEach(product => {
        const entry = scores.get(product.id)!;
        entry.score += (p.rating || 4) / 10; // Boost by rating
        if (!entry.reasons.includes('Highly rated')) {
          entry.reasons.push('Highly rated');
        }
      });

    // Convert to sorted array
    const results = Array.from(scores.entries())
      .filter(([, { score }]) => score > 0)
      .map(([productId, { score, reasons }]) => ({
        productId,
        score,
        reason: reasons[0] || 'Recommended for you',
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return results;
  }

  /**
   * Calculate similarity between two products (0-1 scale)
   * Based on category, price range, and tags
   */
  private calculateSimilarity(product1: Product, product2: Product): number {
    let similarity = 0;

    // Category match (weight: 0.4)
    if (product1.category === product2.category) {
      similarity += 0.4;
    }

    // Price proximity (weight: 0.3)
    const priceDiff = Math.abs(product1.price - product2.price);
    const maxPrice = Math.max(product1.price, product2.price);
    const priceProximity = 1 - Math.min(priceDiff / maxPrice, 1);
    similarity += priceProximity * 0.3;

    // Tags overlap (weight: 0.3)
    if (product1.tags && product2.tags) {
      const commonTags = product1.tags.filter(tag => product2.tags.includes(tag)).length;
      const totalTags = new Set([...product1.tags, ...product2.tags]).size;
      const tagsOverlap = totalTags > 0 ? commonTags / totalTags : 0;
      similarity += tagsOverlap * 0.3;
    }

    return Math.min(similarity, 1);
  }

  /**
   * Check if price is within user's range with some flexibility
   */
  private isPriceInRange(price: number, range: { min: number; max: number }): boolean {
    // Add 20% flexibility to the range
    const buffer = (range.max - range.min) * 0.2;
    return price >= range.min - buffer && price <= range.max + buffer;
  }

  /**
   * Get trending products (for exploration)
   */
  getTrendingProducts(products: Product[], limit: number = 6): Product[] {
    return products
      .filter(p => p.isBestseller || (p.reviews || 0) > 100)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  /**
   * Get new and noteworthy products
   */
  getNewProducts(products: Product[], limit: number = 6): Product[] {
    return products
      .filter(p => p.isNew)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  /**
   * Smart search with relevance scoring
   */
  search(query: string, products: Product[]): Product[] {
    const lowerQuery = query.toLowerCase();
    const results = products
      .map(product => ({
        product,
        score: this.calculateSearchScore(lowerQuery, product),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);

    return results;
  }

  /**
   * Calculate search relevance score
   */
  private calculateSearchScore(query: string, product: Product): number {
    let score = 0;

    // Name match (weight: 1)
    if (product.name.toLowerCase().includes(query)) {
      const position = product.name.toLowerCase().indexOf(query);
      const proximity = 1 - position / product.name.length;
      score += proximity;
    }

    // Description match (weight: 0.5)
    if (product.description.toLowerCase().includes(query)) {
      score += 0.5;
    }

    // Tags match (weight: 0.3 each)
    if (product.tags) {
      const matchedTags = product.tags.filter(tag => tag.includes(query));
      score += matchedTags.length * 0.3;
    }

    return Math.min(score, 1);
  }
}

export const recommendationEngine = new RecommendationEngine();
