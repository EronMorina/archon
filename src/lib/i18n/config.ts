/**
 * Locale configuration — the single source of truth for the whole i18n layer.
 *
 * Routing strategy is "prefix as needed": the default locale is served without
 * a prefix (`/services`) and the others carry one (`/de/services`). The
 * middleware rewrites unprefixed paths onto the `[locale]` segment, so every
 * page still receives `params.locale`.
 */
export const locales = ['en', 'de', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export type LocaleMeta = {
  /** Name in its own language, for the switcher. */
  label: string
  /** Two-letter code shown in the compact switcher trigger. */
  short: string
  /**
   * BCP-47 tag for <html lang> and hreflang. Deliberately unregioned: the
   * site is not targeted at one country per language, and hreflang="en-GB"
   * would tell Google it is.
   */
  tag: string
  /**
   * Region-qualified tag used only for Intl date and number formatting, where
   * the region genuinely changes the output ("28 Jul 2026" vs "Jul 28, 2026").
   */
  formatTag: string
  /** OpenGraph locale. */
  ogLocale: string
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: 'English', short: 'EN', tag: 'en', formatTag: 'en-GB', ogLocale: 'en_US' },
  de: { label: 'Deutsch', short: 'DE', tag: 'de', formatTag: 'de-DE', ogLocale: 'de_DE' },
  fr: { label: 'Français', short: 'FR', tag: 'fr', formatTag: 'fr-FR', ogLocale: 'fr_FR' },
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Narrow an unknown route param to a Locale, falling back to the default. */
export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale
}
