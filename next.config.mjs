/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      // Supabase storage
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      // Cloudinary CDN
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      // Unsplash for images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // PWA Configuration
  headers: async () => {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
