'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { localePath } from '@/lib/i18n/paths'
import { useDictionary, useLocale } from './locale-provider'

export const CONSENT_KEY = 'archon-consent'
const CONSENT_EVENT = 'archon-consent-change'

export type ConsentValue = 'granted' | 'denied'

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(CONSENT_KEY)
  return stored === 'granted' || stored === 'denied' ? stored : null
}

/**
 * Cookie banner. Analytics stay unloaded until consent is granted, and the
 * decision is broadcast on a custom event so <Analytics /> can react instantly.
 */
export function CookieConsent() {
  const locale = useLocale()
  const t = useDictionary().cookies
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Delay slightly so the banner never competes with the hero's entrance.
    const timer = setTimeout(() => setVisible(readConsent() === null), 1200)
    return () => clearTimeout(timer)
  }, [])

  function decide(value: ConsentValue) {
    window.localStorage.setItem(CONSENT_KEY, value)
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl"
        >
          <div className="glass rounded-xl p-5 shadow-glass sm:flex sm:items-center sm:gap-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.message}{' '}
              <Link href={localePath(locale, '/cookies')} className="text-foreground underline underline-offset-4">
                {t.policy}
              </Link>
            </p>
            <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
              <Button variant="ghost" size="sm" onClick={() => decide('denied')}>
                {t.decline}
              </Button>
              <Button variant="apex" size="sm" onClick={() => decide('granted')}>
                {t.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { CONSENT_EVENT }
