import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'

/**
 * Closing conversion block, used at the foot of most pages.
 * `title` and `lead` accept an override so a page can ask a more specific
 * question; both default to the translated general version.
 */
export function Cta({ locale, title, lead }: { locale: Locale; title?: string; lead?: string }) {
  const t = getDictionary(locale).cta

  return (
    <section className="section">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 text-center md:px-16 md:py-20">
          {/* Arc, one last time — behind the final ask. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-full h-[36rem] w-[min(90rem,140%)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-t border-apex-mid/30 bg-[radial-gradient(closest-side,hsl(var(--apex-mid)/0.18),transparent_70%)]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-[2.6rem] md:leading-[1.08]">{title ?? t.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {lead ?? t.lead}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="apex" size="lg" className="group w-full sm:w-auto">
                <Link href={localePath(locale, '/contact')}>
                  {t.button}
                  <ArrowRight className="transition-transform duration-300 ease-apex group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
