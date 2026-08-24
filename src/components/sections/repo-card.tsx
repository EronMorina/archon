import { ArrowUpRight, ExternalLink, GitFork, Github, Star } from 'lucide-react'
import type { Repo } from '@/lib/github'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { formatDate, formatNumber } from '@/lib/utils'

/**
 * One public repository, in the shape the old project cards used: a header
 * that carries the name, a body that explains it, a measured row, then links.
 *
 * There is no image because a repository does not have one, and a generated
 * placeholder would say nothing — the header block leans on the monospace
 * name and the language instead, which is what a reader scans for anyway.
 */
export function RepoCard({ repo, locale }: { repo: Repo; locale: Locale }) {
  const t = getDictionary(locale).repos

  return (
    <article className="apex-ring group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-500 ease-apex hover:-translate-y-1">
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer noopener"
        className="relative block border-b border-border bg-gradient-to-br from-apex-strong/20 to-apex-soft/5 px-6 pb-6 pt-5"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{repo.language ?? t.noLanguage}</span>
          <Github
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
          />
        </div>
        <h3 className="mt-5 break-all font-mono text-lg tracking-tight transition-colors group-hover:text-primary">
          {repo.name}
        </h3>
        <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">{repo.fullName}</p>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{repo.description ?? t.noDescription}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4">
          <div>
            <dd className="flex items-center gap-1.5 font-display text-base font-semibold tracking-tight">
              <Star aria-hidden className="size-3.5 text-muted-foreground" />
              {formatNumber(repo.stars, locale)}
            </dd>
            <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {t.stars}
            </dt>
          </div>
          <div>
            <dd className="flex items-center gap-1.5 font-display text-base font-semibold tracking-tight">
              <GitFork aria-hidden className="size-3.5 text-muted-foreground" />
              {formatNumber(repo.forks, locale)}
            </dd>
            <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {t.forks}
            </dt>
          </div>
          <div>
            <dd className="font-display text-base font-semibold tracking-tight">
              <time dateTime={repo.updatedAt}>{formatDate(repo.updatedAt, locale)}</time>
            </dd>
            <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {t.updated}
            </dt>
          </div>
        </dl>

        {repo.topics.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.topicsLabel}>
            {repo.topics.slice(0, 5).map((topic) => (
              <li
                key={topic}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t.repoAria(repo.name)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            {t.viewRepo}
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-apex group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t.liveAria(repo.name)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink aria-hidden className="size-4" />
              {t.viewLive}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
