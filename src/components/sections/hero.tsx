'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, CheckCircle2, GitBranch, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApexBackdrop } from '@/components/ui/apex-backdrop'
import { Counter } from '@/components/ui/counter'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'

/** Words animate in on load; the first line lands before the second starts. */
const line = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/** Floating glass cards — each shows a real signal from a live engagement. */
const floatingCards = [
  { key: 'uptime', icon: Activity, value: '99.98%', className: 'left-[2%] top-[14%] md:left-[4%] md:top-[18%]', delay: '0s' },
  { key: 'lcp', icon: Zap, value: '0.8s', className: 'right-[3%] top-[10%] md:right-[6%] md:top-[14%]', delay: '-2.2s' },
  { key: 'deploys', icon: GitBranch, value: '38', className: 'left-[6%] bottom-[16%] md:left-[9%] md:bottom-[18%]', delay: '-4.4s' },
  { key: 'ci', icon: CheckCircle2, value: '412/412', className: 'right-[4%] bottom-[20%] md:right-[8%] md:bottom-[22%]', delay: '-1.1s' },
] as const

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44">
      <ApexBackdrop />

      {/* Floating cards sit behind the text on small screens by being hidden entirely. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute ${card.className}`}
          >
            <div className="glass animate-float rounded-xl px-4 py-3 shadow-glass" style={{ animationDelay: card.delay }}>
              <div className="flex items-center gap-2.5">
                <card.icon className="size-3.5 text-apex-soft" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.cards[card.key]}
                </span>
              </div>
              <p className="mt-1 font-display text-xl font-semibold tracking-tight">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-display-sm md:text-display-md lg:text-display-lg">
            <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">
              {t.titleLine1}
            </motion.span>
            <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
              {t.titleLine2Before}
              <span className="text-apex">{t.titleLine2Highlight}</span>
              {t.titleLine2After}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl"
          >
            {t.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild variant="apex" size="lg" className="group w-full sm:w-auto">
              <Link href={localePath(locale, '/contact')}>
                {t.primaryCta}
                <ArrowRight className="transition-transform duration-300 ease-apex group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={localePath(locale, '/portfolio')}>{t.secondaryCta}</Link>
            </Button>
          </motion.div>

          {/* Proof line, not a stats grid: three numbers set inline under the CTA. */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border/70 pt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
          >
            <div className="flex items-baseline gap-2">
              <dd className="font-display text-base font-semibold tracking-tight text-foreground">
                <Counter to={112} suffix="+" locale={locale} />
              </dd>
              <dt>{t.stats.projects}</dt>
            </div>
            <div className="flex items-baseline gap-2">
              <dd className="font-display text-base font-semibold tracking-tight text-foreground">
                <Counter to={96} suffix="%" locale={locale} />
              </dd>
              <dt>{t.stats.returning}</dt>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
