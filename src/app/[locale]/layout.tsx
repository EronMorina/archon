import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Inter, Instrument_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

import { site } from '@/lib/site'
import { organisationSchema } from '@/lib/seo'
import { getDictionary } from '@/lib/i18n'
import { isLocale, locales, localeMeta, type Locale } from '@/lib/i18n/config'
import { languageAlternates, localePath } from '@/lib/i18n/paths'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { MotionProvider } from '@/components/layout/motion-provider'
import { LocaleProvider } from '@/components/layout/locale-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import { CookieConsent } from '@/components/layout/cookie-consent'
import { Analytics } from '@/components/layout/analytics'

/**
 * Type system.
 * Instrument Sans (display) is set tight and heavy for headlines; Inter carries
 * body copy; IBM Plex Mono handles eyebrows, metrics and labels. All three are
 * self-hosted by next/font, so there is no layout shift and no external request.
 *
 * `latin-ext` is included because German and French need it — ß, œ and the
 * accented capitals fall outside the `latin` subset.
 */
const display = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

/** One static shell per language, generated at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale
  const t = getDictionary(locale)

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${t.pages.home.metaTitle}`,
      template: `%s · ${site.name}`,
    },
    description: t.site.description,
    applicationName: site.name,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    keywords: [
      'software development agency',
      'custom web application development',
      'AI integration consultancy',
      'business process automation',
      'Next.js development agency',
    ],
    alternates: {
      canonical: `${site.url}${localePath(locale, '/')}`,
      languages: languageAlternates('/', site.url),
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      url: `${site.url}${localePath(locale, '/')}`,
      title: `${site.name} — ${t.site.tagline}`,
      description: t.site.description,
    },
    twitter: { card: 'summary_large_image', creator: '@archonstudio' },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    /*
      No `icons` entry on purpose. `src/app/icon.svg` and `apple-icon.svg` are
      picked up by Next's file convention and served from a content-hashed URL
      (`/icon?<hash>`), which is what actually forces browsers to pick up a new
      tab icon — favicons are cached far more stubbornly than any other asset,
      and a fixed `/favicon.svg` path can keep serving the old one for days.
      Declaring `icons` here would override the convention and lose the hash.
    */
    manifest: '/manifest.webmanifest',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfd' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0c0e' },
  ],
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // The middleware only routes known locales here, but a direct request for
  // /xx/services would still reach this layout with an unknown segment.
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const t = getDictionary(locale)

  return (
    <html
      lang={localeMeta[locale].tag}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh font-sans">
        {/* Organisation structured data, present on every route. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema(locale)) }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <LocaleProvider locale={locale}>
              {/* Keyboard users land here first. */}
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2.5 focus:text-sm focus:text-background"
              >
                {t.a11y.skipToContent}
              </a>

              <ScrollProgress />
              <Navbar />
              <main id="main">{children}</main>
              <Footer locale={locale} />
              <CookieConsent />
              <Analytics />
            </LocaleProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
