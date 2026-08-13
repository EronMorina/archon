'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { categoryKeys, type CategoryKey, type Project } from '@/content/projects'
import { useDictionary, useLocale } from '@/components/layout/locale-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/sections/project-card'
import { cn } from '@/lib/utils'

/**
 * Portfolio browser: category filter + free-text search over title, client,
 * industry, summary and technologies.
 *
 * Projects arrive as a prop from the server page rather than being imported
 * here — that keeps three locales' worth of case-study copy out of the client
 * bundle, and is the seam a server action would slot into when the catalogue
 * outgrows client-side filtering.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const locale = useLocale()
  const t = useDictionary()
  const [category, setCategory] = useState<CategoryKey>('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = category === 'all' || project.category === category
      if (!needle) return matchesCategory
      const haystack = [project.title, project.client, project.industry, project.summary, ...project.technologies]
        .join(' ')
        .toLowerCase()
      return matchesCategory && haystack.includes(needle)
    })
  }, [projects, category, query])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t.filters.projectsGroupLabel}
          className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1"
        >
          {categoryKeys.map((option) => {
            const active = category === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                aria-pressed={active}
                className={cn(
                  'relative shrink-0 rounded-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                  active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-md bg-apex-gradient"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{t.categories[option]}</span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="project-search" className="sr-only">
            {t.filters.searchProjectsLabel}
          </label>
          <Input
            id="project-search"
            type="search"
            placeholder={t.filters.searchProjectsPlaceholder}
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
        {t.filters.projectCount(results.length)}
        {category !== 'all' && t.filters.inCategory(t.categories[category])}
      </p>

      <motion.div layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} locale={locale} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <SlidersHorizontal aria-hidden className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-4 font-display text-lg">{t.filters.noProjectsTitle}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{t.filters.noProjectsBody}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setCategory('all')
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
