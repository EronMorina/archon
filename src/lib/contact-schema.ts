import { z } from 'zod'
import { getDictionary, type Dictionary } from './i18n'
import { defaultLocale, type Locale } from './i18n/config'

/**
 * One schema, built per locale so validation messages are in the visitor's
 * language. It runs on the client for instant feedback and again in the route
 * handler — because client-side validation is a courtesy, not a control.
 */
export function createContactSchema(locale: Locale = defaultLocale) {
  const e = getDictionary(locale).contactForm.errors

  return z.object({
    name: z.string().trim().min(2, e.name).max(100),
    email: z.string().trim().email(e.email),
    company: z.string().trim().max(120).optional().or(z.literal('')),
    budget: z.enum(['under-15k', '15k-50k', '50k-150k', '150k-plus', 'not-sure'], {
      errorMap: () => ({ message: e.budget }),
    }),
    topic: z.enum(['new-project', 'existing-product', 'ai-automation', 'retainer', 'newsletter', 'other'], {
      errorMap: () => ({ message: e.topic }),
    }),
    message: z.string().trim().min(20, e.messageShort).max(4000, e.messageLong),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
  })
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>

type BudgetKey = keyof Dictionary['contactForm']['budgets']
type TopicKey = keyof Dictionary['contactForm']['topics']

/** Stable submitted values paired with the dictionary key that labels them. */
export const budgetOptions = [
  { value: 'under-15k', labelKey: 'under15k' },
  { value: '15k-50k', labelKey: '15kTo50k' },
  { value: '50k-150k', labelKey: '50kTo150k' },
  { value: '150k-plus', labelKey: '150kPlus' },
  { value: 'not-sure', labelKey: 'notSure' },
] as const satisfies readonly { value: string; labelKey: BudgetKey }[]

export const topicOptions = [
  { value: 'new-project', labelKey: 'newProject' },
  { value: 'existing-product', labelKey: 'existingProduct' },
  { value: 'ai-automation', labelKey: 'aiAutomation' },
  { value: 'retainer', labelKey: 'retainer' },
  { value: 'other', labelKey: 'other' },
] as const satisfies readonly { value: string; labelKey: TopicKey }[]
