import Link from 'next/link'
import { getFeaturedRepos } from '@/lib/github'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { RepoCard } from './repo-card'

/**
 * Home-page proof section: the three most recent described repositories.
 *
 * Renders nothing at all when GitHub is unreachable — a heading over an empty
 * grid is worse than the section simply not being there, and the rest of the
 * home page reads fine without it.
 */
export async function PortfolioPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).portfolioSection
  const repos = await getFeaturedRepos(3)

  if (repos.length === 0) return null

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Button asChild variant="outline" className="shrink-0">
            <Link href={localePath(locale, '/portfolio')}>{t.allWork}</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 0.08}>
              <RepoCard repo={repo} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
