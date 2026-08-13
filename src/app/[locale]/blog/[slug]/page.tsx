import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPost, getPosts, postSlugs } from '@/content/posts'
import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localeMeta, toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { formatDate } from '@/lib/utils'
import { ApexBackdrop } from '@/components/ui/apex-backdrop'
import { Reveal } from '@/components/ui/reveal'
import { Cta } from '@/components/sections/cta'
import { NotFoundView } from '@/components/layout/not-found-view'

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const locale = toLocale(params.locale)
  const post = getPost(locale, params.slug)
  if (!post) {
    const t = getDictionary(locale).pages.notFound
    return { title: t.metaTitle, robots: { index: false, follow: true } }
  }
  return buildMetadata({ locale, title: post.title, description: post.excerpt, path: `/blog/${post.slug}` })
}

export default function PostPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = toLocale(params.locale)
  const post = getPost(locale, params.slug)
  if (!post) return <NotFoundView locale={locale} />

  const t = getDictionary(locale)
  const related = getPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    inLanguage: localeMeta[locale].tag,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: t.postCategories[post.category],
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}${localePath(locale, `/blog/${post.slug}`)}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article>
        <header className="relative isolate overflow-hidden border-b border-border pb-14 pt-32 md:pt-40">
          <ApexBackdrop intensity="soft" />
          <div className="container relative max-w-3xl">
            <Link
              href={localePath(locale, '/blog')}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              {t.post.backToAll}
            </Link>

            <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-primary">{t.postCategories[post.category]}</span>
              <span aria-hidden className="text-border">|</span>
              <time dateTime={post.date} className="text-muted-foreground">
                {formatDate(post.date, locale)}
              </time>
              <span aria-hidden className="text-border">|</span>
              <span className="text-muted-foreground">{t.post.readingTime(post.readingTime)}</span>
            </div>

            <h1 className="mt-5 text-3xl leading-[1.1] md:text-[2.9rem]">{post.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{post.excerpt}</p>

            <div className="mt-9 flex items-center gap-3 border-t border-border pt-7">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-apex-strong to-apex-mid font-mono text-xs text-background"
              >
                {post.author.initials}
              </span>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Body. Prose styles are set locally so the article does not depend on a plugin. */}
        <div className="container max-w-3xl py-16 md:py-20">
          {post.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <p className="mb-6 text-lg leading-[1.75] text-foreground/90 text-pretty last:mb-0">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border">
        <div className="container py-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {t.post.keepReading}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={localePath(locale, `/blog/${item.slug}`)}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                  {t.postCategories[item.category]}
                </p>
                <h3 className="mt-3 text-lg leading-snug transition-colors group-hover:text-primary">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                  {t.post.read}
                  <ArrowRight className="size-4 transition-transform duration-300 ease-apex group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta locale={locale} title={t.cta.postTitle} lead={t.cta.postLead} />
    </>
  )
}
