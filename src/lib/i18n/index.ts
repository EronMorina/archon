import { type Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { de } from './dictionaries/de'
import { fr } from './dictionaries/fr'

const dictionaries: Record<Locale, Dictionary> = { en, de, fr }

/**
 * Look up the UI dictionary for a locale.
 *
 * Synchronous by design: the dictionaries are plain modules, so server
 * components read them without awaiting and client components can import this
 * too. Long-form content lives in `src/content/*` and is fetched separately by
 * server components, which keeps it out of the client bundle entirely.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
export * from './config'
export * from './paths'
