import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { NotFoundView } from '@/components/layout/not-found-view'

/**
 * Catch-all for unmatched URLs inside a locale.
 *
 * Static segments always win over a catch-all, so real routes are unaffected;
 * anything else lands here and gets the 404 page with full chrome, in the
 * language the URL asked for. `noindex` keeps these URLs out of search results.
 */
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(toLocale(params.locale)).pages.notFound
  return { title: t.metaTitle, robots: { index: false, follow: true } }
}

export default function CatchAllNotFound({ params }: { params: { locale: string } }) {
  return <NotFoundView locale={toLocale(params.locale)} />
}
