/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    /**
     * Portfolio card artwork, both remote: thum.io renders a screenshot of a
     * repository's deployed homepage, and GitHub serves the repo card shown
     * when a repository has no homepage to photograph. Routing them through
     * next/image is what caches them at the edge, which is what keeps the
     * keyless thum.io tier viable under real traffic.
     */
    remotePatterns: [
      { protocol: 'https', hostname: 'image.thum.io' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
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
