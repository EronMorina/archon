/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Remote patterns keep next/image optimisation on for CMS-hosted art.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  /**
   * The site used to publish hand-written case studies. That catalogue is gone
   * — the portfolio is now generated from GitHub — so anything still pointing
   * at the old URLs lands on the portfolio instead of a 404. Both the
   * unprefixed default locale and the prefixed ones are covered.
   */
  async redirects() {
    return [
      { source: '/case-studies/:path*', destination: '/portfolio', permanent: true },
      { source: '/:locale(de|fr)/case-studies/:path*', destination: '/:locale/portfolio', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
