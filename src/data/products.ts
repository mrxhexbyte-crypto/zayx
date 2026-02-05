export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  features?: string[];
  specs?: Record<string, string>;
  bestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Pro Max Drone",
    price: 499.99,
    originalPrice: 699.99,
    description: "Advanced 8K foldable drone with AI tracking",
    longDescription: "Experience professional-grade aerial photography with our latest Pro Max Drone. Features advanced AI tracking, 8K video recording, and 60-minute flight time.",
    image: "/images/drone.png",
    category: "Electronics",
    rating: 4.8,
    reviews: 1205,
    inStock: true,
    badge: "BESTSELLER",
    bestseller: true,
    features: ["8K Video", "AI Tracking", "60min Battery", "4K+ Obstacle Avoidance"],
    specs: {
      "Camera": "48MP, 8K@30fps",
      "Flight Time": "60 minutes max",
      "Range": "10km transmission",
      "Weight": "450g",
      "Max Speed": "75mph"
    }
  },
  {
    id: "2",
    title: "Elite Wireless Earbuds",
    price: 199.99,
    originalPrice: 299.99,
    description: "Premium noise-cancelling with spatial audio",
    longDescription: "Premium wireless earbuds with active noise cancellation, spatial audio, and 8-hour battery life per charge.",
    image: "/images/earbuds.png",
    category: "Audio",
    rating: 4.9,
    reviews: 3421,
    inStock: true,
    badge: "NEW",
    features: ["ANC 2.0", "Spatial Audio", "8hr Battery", "Adaptive Touch"],
    specs: {
      "Driver Size": "10mm dynamic drivers",
      "Frequency": "20Hz - 20kHz",
      "Battery": "8hrs (32hrs with case)",
      "Connectivity": "Bluetooth 5.3"
    }
  },
  {
    id: "3",
    title: "SmartWatch Ultra",
    price: 349.99,
    originalPrice: 449.99,
    description: "Advanced fitness tracking & health monitoring",
    image: "/images/watch.png",
    category: "Wearables",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    badge: "SALE",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery"],
    specs: {
      "Display": "AMOLED 1.4\"",
      "Health Sensors": "7 advanced sensors",
      "Water Rating": "5ATM",
      "Battery": "7 days typical"
    }
  },
  {
    id: "4",
    title: "Premium Laptop Stand",
    price: 129.99,
    description: "Aluminum ergonomic stand for enhanced productivity",
    image: "/images/stand.png",
    category: "Accessories",
    rating: 4.6,
    reviews: 524,
    inStock: true,
    features: ["Adjustable Height", "Premium Aluminum", "Cooling Airflow"],
    specs: {
      "Material": "Aerospace aluminum",
      "Max Load": "25kg",
      "Compatibility": "10-17 inch laptops"
    }
  },
  {
    id: "5",
    title: "Mechanical Keyboard Pro",
    price: 189.99,
    originalPrice: 249.99,
    description: "RGB mechanical keyboard with custom switches",
    image: "/images/keyboard.png",
    category: "Peripherals",
    rating: 4.8,
    reviews: 1456,
    inStock: true,
    badge: "POPULAR",
    features: ["Hot-swappable Switches", "RGB Lighting", "Programmable Keys"],
    specs: {
      "Switches": "Custom mechanical",
      "Layout": "100% full-size",
      "Connection": "Wireless + USB-C"
    }
  },
  {
    id: "6",
    title: "4K Webcam Pro",
    price: 279.99,
    description: "Professional 4K webcam with AI framing",
    image: "/images/webcam.png",
    category: "Electronics",
    rating: 4.7,
    reviews: 678,
    inStock: true,
    features: ["4K@60fps", "AI Framing", "Wide Lens", "Built-in Mic"],
    specs: {
      "Resolution": "4K UHD (3840x2160)",
      "Frame Rate": "60fps",
      "FOV": "90 degrees"
    }
  },
  {
    id: "7",
    title: "Portable Power Bank 100W",
    price: 89.99,
    description: "100W portable charger with fast charging",
    image: "/images/powerbank.png",
    category: "Accessories",
    rating: 4.6,
    reviews: 2103,
    inStock: true,
    badge: "LIGHTNING DEAL",
    features: ["100W Fast Charging", "25000mAh", "Multiple Ports"],
    specs: {
      "Capacity": "25000mAh",
      "Output": "100W max",
      "Ports": "USB-C, USB-A, Lightning"
    }
  },
  {
    id: "8",
    title: "Studio Monitor Stands",
    price: 149.99,
    description: "Premium isolated studio monitor stands",
    image: "/images/monitor.png",
    category: "Audio",
    rating: 4.5,
    reviews: 342,
    inStock: true,
    features: ["Isolation Pads", "Height Adjustable", "Cable Management"],
    specs: {
      "Max Load": "20kg each",
      "Material": "MDF + Steel",
      "Isolation": "Rubber pads included"
    }
  },
];

export default products;
