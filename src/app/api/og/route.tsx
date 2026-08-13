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
          background: '#0b0c0e',
          backgroundImage:
            'radial-gradient(120% 60% at 50% -10%, rgba(250,250,250,0.14), rgba(11,12,14,0) 60%)',
        }}
      >
        {/* The mark, drawn inline: Satori has no access to the site's SVG assets. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="46" height="40" viewBox="0 0 32 28" fill="#fafafa">
            <path d="M16 0.5 31.5 27.5H26.2L16 9.7 5.8 27.5H0.5L16 0.5Z" />
            <path d="M16 16.4 21.3 25.6H10.7L16 16.4Z" />
          </svg>
          <span
            style={{
              color: '#fafafa',
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
            }}
          >
            {site.name}
          </span>
        </div>

        <p
          style={{
            color: '#f5f5f6',
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

        <p style={{ color: '#8d9096', fontSize: 26, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
          {t.site.kicker} · {site.url.replace('https://', '')}
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
