import Image from 'next/image'
import { ArrowUpRight, GitFork, Github, Star } from 'lucide-react'
import type { Repo } from '@/lib/github'
import { previewFor } from '@/lib/preview'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { formatDate, formatNumber } from '@/lib/utils'

/**
 * One public repository: a picture of the deployed site where there is one,
 * then the name, what it does, its measurements, and the way in.
 *
 * The picture leads because a portfolio is looked at before it is read, and
 * where a repo is deployed the whole frame opens the live page rather than the
 * source — somebody clicking a screenshot wants the site in it, not a file
 * tree. Repos with nothing deployed show GitHub's repo card and link to the
 * code, because the code is genuinely all there is to see.
 */
export function RepoCard({ repo, locale }: { repo: Repo; locale: Locale }) {
  const t = getDictionary(locale).repos
  const preview = previewFor(repo)
  const isLive = preview.kind === 'screenshot'
  const primaryHref = repo.homepage ?? repo.url
  const primaryAria = repo.homepage ? t.liveAria(repo.name) : t.repoAria(repo.name)

  return (
    <article className="apex-ring group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-500 ease-apex hover:-translate-y-1">
      <a
        href={primaryHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={primaryAria}
        className="relative block overflow-hidden border-b border-border bg-gradient-to-br from-apex-strong/20 to-apex-soft/5"
      >
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={preview.src}
            alt={isLive ? t.shotAlt(repo.name) : t.cardAlt(repo.name)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={
              isLive
                ? // Top-anchored: a homepage puts its hero at the top, and that
                  // is the part worth showing when 3:2 crops a 4:3 capture.
                  'object-cover object-top transition-transform duration-700 ease-apex group-hover:scale-[1.03]'
                : // Letterboxed whole — the GitHub card is 2:1 and carries text
                  // to its edges, so cropping it would cut words in half.
                  'object-contain p-5'
            }
          />
        </div>
        {isLive && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
            {t.liveBadge}
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{repo.language ?? t.noLanguage}</span>
          <Github
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
          />
        </div>

        <h3 className="mt-4 break-all font-mono text-lg tracking-tight">
          <a
            href={primaryHref}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-primary"
          >
            {repo.name}
          </a>
        </h3>
        <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">{repo.fullName}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {repo.description ?? t.noDescription}
        </p>

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

        {/* mt-auto pins the actions to the bottom, so they line up across a row
            of cards whose descriptions run to different lengths. */}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
          {repo.homepage ? (
            <>
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t.liveAria(repo.name)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                {t.viewLive}
                <ArrowUpRight className="size-4 transition-transform duration-300 ease-apex group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t.repoAria(repo.name)}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github aria-hidden className="size-4" />
                {t.viewCode}
              </a>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </article>
  )
}
