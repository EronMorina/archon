import { defaultLocale, isLocale, locales, type Locale } from './config'

/**
 * Turn a locale-neutral app path into the href for a given locale.
 * The default locale stays unprefixed, so existing URLs never change.
 *
 *   localePath('en', '/services')  -> '/services'
 *   localePath('de', '/services')  -> '/de/services'
 *   localePath('fr', '/')          -> '/fr'
 *
 * Hashes and query strings survive: '/services#pricing' keeps its fragment.
 */
export function localePath(locale: Locale, path = '/'): string {
  const normalised = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalised
  return normalised === '/' ? `/${locale}` : `/${locale}${normalised}`
}

/**
 * Split a browser pathname into its locale and the locale-neutral path.
 * Used by the language switcher (to keep you on the same page when you
 * switch) and by the navbar's active-link check.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/')
  const first = segments[1]

  if (isLocale(first) && first !== defaultLocale) {
    const rest = `/${segments.slice(2).join('/')}`
    return { locale: first, path: rest === '/' ? '/' : rest.replace(/\/$/, '') || '/' }
  }

  return { locale: defaultLocale, path: pathname === '' ? '/' : pathname }
}

/**
 * `alternates.languages` for Next's Metadata API — the hreflang set that tells
 * search engines these three URLs are the same page in different languages.
 * `x-default` points at the unprefixed default so unmatched languages land there.
 */
export function languageAlternates(path: string, origin: string): Record<string, string> {
  const entries = locales.map((locale) => [locale, `${origin}${localePath(locale, path)}`] as const)
  return {
    ...Object.fromEntries(entries),
    'x-default': `${origin}${localePath(defaultLocale, path)}`,
  }
}
