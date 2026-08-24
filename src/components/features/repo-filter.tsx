'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Repo } from '@/lib/github'
import { useDictionary, useLocale } from '@/components/layout/locale-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RepoCard } from '@/components/sections/repo-card'
import { cn } from '@/lib/utils'

/** Languages present in a set of repos, most used first — the filter tabs. */
function repoLanguages(repos: Repo[]): string[] {
  const counts = new Map<string, number>()
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([language]) => language)
}

/**
 * Repository browser: language tabs + free-text search over name, description,
 * topics and language.
 *
 * The tabs are derived from the repositories themselves rather than from a
 * fixed list, so a first Go or Rust repo adds its own filter and an emptied
 * language stops appearing. Language names are proper nouns and stay in
 * English in all three locales; only the surrounding chrome is translated.
 *
 * Repos arrive as a prop from the server page — the GitHub fetch stays on the
 * server, so no API request is made from the reader's browser.
 */
export function RepoFilter({ repos }: { repos: Repo[] }) {
  const locale = useLocale()
  const t = useDictionary()
  const [language, setLanguage] = useState<string>('all')
  const [query, setQuery] = useState('')

  const languages = useMemo(() => ['all', ...repoLanguages(repos)], [repos])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return repos.filter((repo) => {
      const matchesLanguage = language === 'all' || repo.language === language
      if (!needle) return matchesLanguage
      const haystack = [repo.name, repo.description ?? '', repo.language ?? '', ...repo.topics].join(' ').toLowerCase()
      return matchesLanguage && haystack.includes(needle)
    })
  }, [repos, language, query])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t.repos.groupLabel}
          className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1"
        >
          {languages.map((option) => {
            const active = language === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={active}
                className={cn(
                  'relative shrink-0 rounded-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                  active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="repo-filter-pill"
                    className="absolute inset-0 rounded-md bg-apex-gradient"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{option === 'all' ? t.repos.allLanguages : option}</span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="repo-search" className="sr-only">
            {t.repos.searchLabel}
          </label>
          <Input
            id="repo-search"
            type="search"
            placeholder={t.repos.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 pl-10 pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t.filters.clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live region so filter results are announced, not just repainted. */}
      <p aria-live="polite" className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {t.repos.count(results.length)}
        {language !== 'all' && t.repos.inLanguage(language)}
      </p>

      <motion.div layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((repo) => (
            <motion.div
              key={repo.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <RepoCard repo={repo} locale={locale} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <SlidersHorizontal aria-hidden className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-4 font-display text-lg">{t.repos.noMatchTitle}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{t.repos.noMatchBody}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setLanguage('all')
              setQuery('')
            }}
          >
            {t.filters.clearFilters}
          </Button>
        </div>
      )}
    </div>
  )
}
