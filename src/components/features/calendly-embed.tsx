'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { CalendarClock, ExternalLink } from 'lucide-react'
import { site } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useDictionary } from '@/components/layout/locale-provider'

/**
 * Calendly inline embed, loaded lazily.
 * The widget script is ~90KB and blocks nothing above the fold, so it is only
 * requested once the embed scrolls into view. A direct link is always present as
 * a fallback for blocked third-party scripts.
 */
export function CalendlyEmbed() {
  const t = useDictionary().calendly
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">
            <CalendarClock className="size-3.5" aria-hidden />
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-xl">{t.title}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{t.body}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a href={site.calendly} target="_blank" rel="noreferrer noopener">
            {t.open}
            <ExternalLink className="size-3.5" />
          </a>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        {!loaded && <Skeleton className="h-[620px] w-full rounded-none" />}
        {inView && (
          <>
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
              onLoad={() => setLoaded(true)}
            />
            <div
              className="calendly-inline-widget"
              data-url={`${site.calendly}?hide_gdpr_banner=1&background_color=transparent`}
              style={{ minWidth: '320px', height: '620px', display: loaded ? 'block' : 'none' }}
            />
          </>
        )}
      </div>
    </div>
  )
}
