/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack handles package optimization automatically now, 
  // but we'll keep this if you have specific performance needs.
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei']
  },
  
  // Clean up the warning by moving eslint to the top level correctly
  // Note: In Next 16, it's better to fix errors, but this stays for now
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    // 'domains' is deprecated. Use remotePatterns instead.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
      // Adding localhost in case you serve images from your backend later
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    // Only use unoptimized if you are hosting on platforms that don't support Next Image Optimization
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig