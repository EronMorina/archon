import Link from 'next/link'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'

/**
 * ARCHON wordmark.
 *
 * The glyph is a chevron — an open apex drawn as two strokes — with a small
 * solid triangle nested at its base, which reads as the counter of an A. Both
 * shapes are `currentColor`, so the mark inverts with the theme instead of
 * carrying its own colour, which is the whole point of a monochrome identity.
 *
 * The strokes are drawn as filled paths rather than a stroked polyline: a
 * stroke would scale its width with the SVG and thin out at favicon sizes,
 * where the outer chevron and the inner triangle need to stay distinguishable.
 */
export function Logo({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale)

  return (
    <Link
      href={localePath(locale, '/')}
      className={`group inline-flex items-center gap-3 rounded-md ${className ?? ''}`}
      aria-label={`${site.name} — ${t.a11y.home}`}
    >
      <svg viewBox="0 0 32 28" className="h-6 w-7 shrink-0" fill="currentColor" aria-hidden focusable="false">
        {/* Outer chevron, drawn as a closed outline with a hollow centre. */}
        <path
          d="M16 0.5 31.5 27.5H26.2L16 9.7 5.8 27.5H0.5L16 0.5Z"
          className="transition-opacity duration-500 ease-apex group-hover:opacity-80"
        />
        {/* Inner apex — the counter of the A. */}
        <path d="M16 16.4 21.3 25.6H10.7L16 16.4Z" />
      </svg>

      <span className="font-display text-[0.95rem] font-medium uppercase tracking-[0.34em]">{site.name}</span>
    </Link>
  )
}
