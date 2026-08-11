import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Button } from '@/components/ui/button'
import { ArcBackdrop } from '@/components/ui/arc-backdrop'

/**
 * The 404 page body, as a server component that is handed its locale.
 *
 * Deliberately not wired to `notFound()` and a `not-found.tsx` boundary: in
 * this app the root layout lives under `[locale]`, and a nested not-found
 * boundary renders to an empty document on the server — the content only
 * appears after hydration, which is no use to a crawler or a visitor without
 * JavaScript. Rendering it as an ordinary page keeps it server-rendered and in
 * the right language; the pages that use it send `noindex` so the URLs stay out
 * of search results.
 */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).pages.notFound

  return (
    <section className="relative isolate overflow-hidden">
      <ArcBackdrop intensity="soft" />
      <div className="container relative flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <p className="eyebrow">
          <span aria-hidden className="h-px w-7 bg-arc-gradient" />
          {t.eyebrow}
        </p>
        <h1 className="mt-6 text-display-sm md:text-display-md">{t.title}</h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">{t.lead}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="arc" size="lg">
            <Link href={localePath(locale, '/')}>{t.home}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={localePath(locale, '/portfolio')}>{t.work}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
