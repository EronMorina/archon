import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { defaultLocale, localeMeta } from '@/lib/i18n/config'

/**
 * One manifest at the root. A web manifest describes the installed app, not a
 * page, so it uses the default locale and points `start_url` at the unprefixed
 * home — visitors switch language in-app from there.
 */
export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary(defaultLocale)

  return {
    name: `${site.name} — Software studio`,
    short_name: site.name,
    description: t.site.description,
    lang: localeMeta[defaultLocale].tag,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b10',
    theme_color: '#0a0b10',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
