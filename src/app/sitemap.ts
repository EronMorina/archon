import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { getPosts } from '@/content/posts'
import { defaultLocale, locales } from '@/lib/i18n/config'
import { languageAlternates, localePath } from '@/lib/i18n/paths'

/**
 * Generated at build time — new CMS entries appear without a code change.
 *
 * Every URL is emitted once per locale, and each entry carries the full
 * `alternates.languages` set so Google can pair the three versions of a page
 * from the sitemap alone.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
  ]

  // Dates come from the default locale — slugs and publication dates are shared.
  const postDates = new Map(getPosts(defaultLocale).map((post) => [post.slug, new Date(post.date)]))

  const entries = [
    ...staticRoutes.map((route) => ({
      path: route.path,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...[...postDates.entries()].map(([slug, date]) => ({
      path: `/blog/${slug}`,
      lastModified: date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]

  return entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, entry.path)}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languageAlternates(entry.path, site.url) },
    }))
  )
}
