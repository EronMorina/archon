'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { mainNav } from '@/lib/site'
import { localePath, splitLocale } from '@/lib/i18n/paths'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useDictionary, useLocale } from './locale-provider'

/**
 * Sticky navbar. Transparent over the hero, then frosted once the page
 * scrolls — the standard Linear/Vercel behaviour, done with one scroll listener.
 *
 * Active-link detection compares the *locale-neutral* path, so /de/services
 * highlights the same item as /services.
 */
export function Navbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useDictionary()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on navigation and lock scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const { path } = splitLocale(pathname ?? '/')
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-apex',
        scrolled ? 'border-b border-border/70 bg-background/70 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-6" aria-label={t.a11y.mainNavigation}>
        <Logo locale={locale} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={localePath(locale, item.href)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors',
                  isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.nav.links[item.key]}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-apex-gradient"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild variant="apex" size="sm" className="group hidden lg:inline-flex">
            <Link href={localePath(locale, '/contact')}>
              {t.nav.cta}
              <ArrowRight className="transition-transform duration-300 ease-apex group-hover:translate-x-0.5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container flex flex-col py-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    className={cn(
                      'flex items-center justify-between border-b border-border/60 py-4 text-base',
                      isActive(item.href) ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {t.nav.links[item.key]}
                    <ArrowRight className="size-4 opacity-40" />
                  </Link>
                </li>
              ))}
              <li className="pt-5">
                <Button asChild variant="apex" size="lg" className="w-full">
                  <Link href={localePath(locale, '/contact')}>{t.nav.cta}</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
