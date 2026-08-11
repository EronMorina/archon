'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { getDictionary, type Dictionary, type Locale } from '@/lib/i18n'

type LocaleContextValue = { locale: Locale; t: Dictionary }

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * Makes the active locale available to client components.
 *
 * Only the locale *string* crosses the server/client boundary — the dictionary
 * is resolved from the bundled modules on the client, so nothing is serialised
 * into the RSC payload on every navigation.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(() => ({ locale, t: getDictionary(locale) }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>')
  return value
}

/** Active locale — use with `localePath()` to build locale-aware hrefs. */
export function useLocale(): Locale {
  return useLocaleContext().locale
}

/** Active UI dictionary. */
export function useDictionary(): Dictionary {
  return useLocaleContext().t
}
