import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'

export const runtime = 'edge'

/**
 * Dynamic Open Graph card.
 * Rendered at the edge so every page — including new CMS entries — gets a
 * branded social image without anyone opening a design tool. `locale` picks the
 * language for the fallback title and the footer label.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = toLocale(searchParams.get('locale'))
  const t = getDictionary(locale)
  const title = searchParams.get('title')?.slice(0, 110) ?? t.site.tagline

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0a0b10',
          backgroundImage:
            'radial-gradient(120% 60% at 50% -10%, rgba(124,92,255,0.35), rgba(10,11,16,0) 60%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: 'linear-gradient(100deg,#5b7cfa,#7c5cff,#22d3ee)',
            }}
          />
          <span style={{ color: '#e7e9ee', fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {site.name}
          </span>
        </div>

        <p
          style={{
            color: '#f4f5f7',
            fontSize: 66,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            fontWeight: 600,
            maxWidth: 940,
            margin: 0,
          }}
        >
          {title}
        </p>

        <p style={{ color: '#8a90a0', fontSize: 26, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
          {t.hero.eyebrow.split('·')[0].trim()} · {site.url.replace('https://', '')}
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
