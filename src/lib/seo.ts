import type { Metadata } from 'next'
import { site } from './site'
import { getDictionary } from './i18n'
import { locales, localeMeta, type Locale } from './i18n/config'
import { languageAlternates, localePath } from './i18n/paths'

/**
 * Build page metadata with canonical URL, hreflang alternates and social cards
 * from one call.
 *
 * `path` is always the locale-neutral path (`/services`); the canonical and the
 * alternates are derived from it, so a page never has to know how the prefix
 * strategy works.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  image,
}: {
  locale: Locale
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const url = `${site.url}${localePath(locale, path)}`
  const ogImage = image ?? `/api/og?title=${encodeURIComponent(title)}&locale=${locale}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, site.url),
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@archonstudio',
    },
  }
}

/** Schema.org graph injected on every page via the locale layout. */
export function organisationSchema(locale: Locale) {
  const t = getDictionary(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}#organisation`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}${localePath(locale, '/')}`,
    description: t.site.description,
    inLanguage: localeMeta[locale].tag,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    address: {
      '@type': 'PostalAddress',
      // No public street address — remote-first, so the schema carries city-level location only.
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((s) => s.href),
    areaServed: 'Worldwide',
    availableLanguage: locales.map((l) => localeMeta[l].tag),
    knowsAbout: ['Web development', 'AI integration', 'Business automation', 'Cloud architecture'],
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${localePath(locale, item.path)}`,
    })),
  }
}
