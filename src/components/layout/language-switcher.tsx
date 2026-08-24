'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, Languages } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useDictionary, useLocale } from './locale-provider'
import { localeMeta, locales } from '@/lib/i18n/config'
import { localePath, splitLocale } from '@/lib/i18n/paths'
import { cn } from '@/lib/utils'

/**
 * Language switcher.
 *
 * Switching keeps you on the page you are reading: the current pathname is
 * stripped of its locale prefix and rebuilt for the target language. Because
 * slugs are shared across locales, `/de/blog/the-handover-is-the-product`
 * maps cleanly to `/blog/the-handover-is-the-product`.
 *
 * Each option is a real <Link>, so it is middle-clickable and navigates
 * client-side. Radix mounts the menu contents only when open, so these links
 * are not in the initial HTML — search engines pair the translations from the
 * `hreflang` alternates in <head> instead, which is what they use anyway.
 */
export function LanguageSwitcher() {
  const active = useLocale()
  const t = useDictionary().language
  const pathname = usePathname()
  const { path } = splitLocale(pathname ?? '/')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`${t.change} — ${t.current(localeMeta[active].label)}`}
          className="gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Languages className="size-[18px]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.1em]">{localeMeta[active].short}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[9rem]">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <Link
              href={localePath(locale, path)}
              hrefLang={localeMeta[locale].tag}
              lang={localeMeta[locale].tag}
              aria-current={locale === active ? 'true' : undefined}
              className={cn('flex cursor-pointer items-center justify-between gap-3', locale === active && 'font-medium')}
            >
              {localeMeta[locale].label}
              {locale === active && <Check className="size-3.5 text-primary" aria-hidden />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
