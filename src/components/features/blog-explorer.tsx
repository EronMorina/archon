'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { postCategoryKeys, type Post, type PostCategoryKey } from '@/content/posts'
import { useDictionary, useLocale } from '@/components/layout/locale-provider'
import { localePath } from '@/lib/i18n/paths'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

/**
 * Blog index: category tabs, search across title/excerpt/author, animated grid.
 * Posts arrive as a prop from the server page so article bodies for three
 * locales never reach the browser.
 */
export function BlogExplorer({ posts }: { posts: Post[] }) {
  const locale = useLocale()
  const t = useDictionary()
  const [category, setCategory] = useState<PostCategoryKey>('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category
      if (!needle) return matchesCategory
      const haystack = [post.title, post.excerpt, t.postCategories[post.category], post.author.name]
        .join(' ')
        .toLowerCase()
      return matchesCategory && haystack.includes(needle)
    })
  }, [posts, category, query, t])

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t.filters.articlesGroupLabel}
          className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1"
        >
          {postCategoryKeys.map((option) => {
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
                    layoutId="blog-filter-pill"
                    className="absolute inset-0 rounded-md bg-arc-gradient"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{t.postCategories[option]}</span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="post-search" className="sr-only">
            {t.filters.searchArticlesLabel}
          </label>
          <Input
            id="post-search"
            type="search"
            placeholder={t.filters.searchArticlesPlaceholder}
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

      <p aria-live="polite" className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {t.filters.articleCount(results.length)}
      </p>

      <motion.div
        layout
        className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {results.map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col bg-background p-7 transition-colors duration-500 hover:bg-muted/40"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-primary">{t.postCategories[post.category]}</span>
                <span aria-hidden className="text-border">|</span>
                <time dateTime={post.date} className="text-muted-foreground">
                  {formatDate(post.date, locale)}
                </time>
              </div>

              <h2 className="mt-4 text-lg leading-snug">
                <Link
                  href={localePath(locale, `/blog/${post.slug}`)}
                  className="transition-colors group-hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{post.author.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {t.post.readingTime(post.readingTime)}
                  </p>
                </div>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-arc group-hover:translate-x-1 group-hover:text-primary"
                />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-display text-lg">{t.filters.noArticlesTitle}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{t.filters.noArticlesBody}</p>
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
