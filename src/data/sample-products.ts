import { Product } from '@/types';

/**
 * Sample products for demo/testing
 * These can be imported and used when Supabase is not available
 * Or seed your database with these values
 */

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    compareAtPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    ],
    category: 'audio',
    stock: 45,
    rating: 4.8,
    reviews: 234,
    tags: ['wireless', 'noise-cancelling', 'premium', 'audio'],
    isBestseller: true,
    isNew: false,
    sku: 'WH-1000XM5',
    specifications: {
      'Driver': '40mm',
      'Frequency': '4 Hz - 24 kHz',
      'Weight': '250g',
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
    },
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, sleep tracking, and up to 14-day battery life. Water resistant to 50m.',
    price: 199.99,
    compareAtPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    ],
    category: 'wearables',
    stock: 38,
    rating: 4.6,
    reviews: 189,
    tags: ['smartwatch', 'fitness', 'health', 'wearable'],
    isBestseller: true,
    isNew: true,
    sku: 'SW-PRO-2024',
    specifications: {
      'Display': '1.4" AMOLED',
      'Resolution': '454x454',
      'Battery': '14 days',
      'Water Resistant': '50m',
      'Weight': '34g',
    },
  },
  {
    id: '3',
    name: 'USB-C Hub Adapter',
    description: 'Multi-port USB-C hub with 7 ports: HDMI, USB 3.0, USB 2.0, SD card reader, microSD, Thunderbolt 3. Perfect for MacBook and laptops.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'accessories',
    stock: 87,
    rating: 4.5,
    reviews: 456,
    tags: ['usb-c', 'hub', 'adapter', 'connectivity'],
    isBestseller: false,
    isNew: false,
    sku: 'HUB-7PORT-V2',
    specifications: {
      'Ports': '7 (HDMI, USB 3.0, USB 2.0, SD, microSD, 2x USB-C)',
      'Max Resolution': '4K@30Hz',
      'Data Transfer': '5Gbps',
      'Material': 'Aluminum',
      'Length': '20cm',
    },
  },
  {
    id: '4',
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast portable SSD with 1TB capacity. Transfer speeds up to 1050MB/s. Compact, durable, and perfect for content creators and professionals.',
    price: 129.99,
    compareAtPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 52,
    rating: 4.7,
    reviews: 312,
    tags: ['ssd', 'storage', 'portable', 'fast'],
    isBestseller: false,
    isNew: true,
    sku: 'SSD-1TB-PORTABLE',
    specifications: {
      'Capacity': '1TB',
      'Speed': '1050MB/s',
      'Interface': 'USB 3.1',
      'Size': '80×48×28mm',
      'Weight': '40g',
    },
  },
  {
    id: '5',
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with RGB backlight, mechanical switches, aluminum frame, and programmable keys. Perfect for gaming and typing.',
    price: 159.99,
    compareAtPrice: 219.99,
    image: 'https://images.unsplash.com/photo-1587829191301-51331fcc78b8?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 63,
    rating: 4.9,
    reviews: 523,
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb'],
    isBestseller: true,
    isNew: false,
    sku: 'KB-MECH-RGB-V3',
    specifications: {
      'Switches': 'Mechanical (Hot-swap)',
      'Backlighting': 'RGB',
      'Layout': 'Full Size (104 keys)',
      'Connection': 'USB-C Wired',
      'Material': 'Aluminum + ABS',
    },
  },
  {
    id: '6',
    name: '4K Webcam Pro',
    description: '4K webcam with auto-focus, wide angle lens (90°), built-in microphone, and low-light correction. Perfect for streaming and video calls.',
    price: 89.99,
    compareAtPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1598986646514-c8ba50c4f67d?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 71,
    rating: 4.4,
    reviews: 267,
    tags: ['webcam', '4k', 'streaming', 'video'],
    isBestseller: false,
    isNew: true,
    sku: 'WC-4K-PRO',
    specifications: {
      'Resolution': '4K (2160p)',
      'FPS': '30fps',
      'FOV': '90°',
      'Microphone': 'Built-in Stereo',
      'Connection': 'USB 3.0',
    },
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad supporting Qi standard. Charges compatible iPhones, Samsung, and other Qi devices up to 15W. Non-slip surface.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'accessories',
    stock: 124,
    rating: 4.3,
    reviews: 189,
    tags: ['wireless', 'charging', 'convenient'],
    isBestseller: false,
    isNew: false,
    sku: 'CHARGE-WL-15W',
    specifications: {
      'Power': '15W',
      'Standard': 'Qi Certified',
      'Compatibility': 'iPhone, Samsung, Android',
      'Material': 'Silicone',
      'Cable Length': '1.5m',
    },
  },
];

/**
 * Get all sample products
 */
export function getSampleProducts(): Product[] {
  return SAMPLE_PRODUCTS;
}

/**
 * Get sample product by ID
 */
export function getSampleProductById(id: string): Product | undefined {
  return SAMPLE_PRODUCTS.find(p => p.id === id);
}

/**
 * Filter sample products
 */
export function filterSampleProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Product[] {
  return SAMPLE_PRODUCTS.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(search) &&
          !product.description.toLowerCase().includes(search)) {
        return false;
      }
    }
    return true;
  });
}
