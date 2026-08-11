import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { localeMeta, type Locale } from './i18n/config'

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 2026-01-14 → "14 Jan 2026" / "14. Jan. 2026" / "14 janv. 2026"
 *
 * The date is pinned to UTC so the server and the browser always agree — a
 * timezone-dependent result would render differently on each side and break
 * hydration.
 */
export function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(localeMeta[locale].formatTag, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Locale-aware number formatting for the animated counters. */
export function formatNumber(value: number, locale: Locale, decimals = 0) {
  return value.toLocaleString(localeMeta[locale].formatTag, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
