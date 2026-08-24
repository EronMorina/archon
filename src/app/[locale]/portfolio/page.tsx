import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getRepos } from '@/lib/github'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { RepoFilter } from '@/components/features/repo-filter'
import { Button } from '@/components/ui/button'
import { Stats } from '@/components/sections/stats'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { Cta } from '@/components/sections/cta'

/** Match the GitHub fetch: the page is rebuilt at most once an hour. */
export const revalidate = 3600

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.portfolio
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/portfolio' })
}

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale)
  const repos = await getRepos()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.pages.portfolio.metaTitle,
    url: `${site.url}${localePath(locale, '/portfolio')}`,
    hasPart: repos.map((repo) => ({
      '@type': 'SoftwareSourceCode',
      name: repo.name,
      description: repo.description ?? undefined,
      codeRepository: repo.url,
      programmingLanguage: repo.language ?? undefined,
      url: repo.homepage ?? repo.url,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader eyebrow={t.pages.portfolio.eyebrow} title={t.pages.portfolio.title} lead={t.pages.portfolio.lead} />
      <section className="section pt-12 md:pt-16">
        <div className="container">
          {repos.length > 0 ? (
            <>
              <RepoFilter repos={repos} />
              <p className="mt-12 text-center text-sm text-muted-foreground">
                <a
                  href={site.github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {t.repos.profileLink(site.github.user)}
                </a>
              </p>
            </>
          ) : (
            /* GitHub is unreachable or rate-limiting. Say so, and send the
               reader to the source rather than showing an empty grid. */
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="font-display text-lg">{t.repos.unavailableTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{t.repos.unavailableBody}</p>
              <Button asChild variant="outline" className="mt-6">
                <a href={site.github.url} target="_blank" rel="noreferrer noopener">
                  {t.repos.profileLink(site.github.user)}
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
      <Stats locale={locale} />
      <TechMarquee locale={locale} />
      <Cta locale={locale} title={t.cta.portfolioTitle} />
    </>
  )
}
