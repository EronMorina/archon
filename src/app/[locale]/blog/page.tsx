import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getPosts } from '@/content/posts'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { BlogExplorer } from '@/components/features/blog-explorer'
import { Cta } from '@/components/sections/cta'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.blog
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/blog' })
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale)
  const posts = getPosts(locale)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${site.name} engineering notes`,
    url: `${site.url}${localePath(locale, '/blog')}`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author.name },
      url: `${site.url}${localePath(locale, `/blog/${post.slug}`)}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader eyebrow={t.pages.blog.eyebrow} title={t.pages.blog.title} lead={t.pages.blog.lead} />
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <BlogExplorer posts={posts} />
        </div>
      </section>
      <Cta locale={locale} title={t.cta.blogTitle} />
    </>
  )
}
