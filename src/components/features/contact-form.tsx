'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react'
import { budgetOptions, createContactSchema, topicOptions } from '@/lib/contact-schema'
import { useDictionary, useLocale } from '@/components/layout/locale-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<string, string>>

/**
 * Contact form.
 * Validated with the shared zod schema built for the active locale, errors
 * announced with role="alert" and wired to inputs via aria-describedby, and the
 * first invalid field is focused on failed submit so keyboard users are not
 * left guessing.
 */
export function ContactForm() {
  const locale = useLocale()
  const t = useDictionary().contactForm
  const schema = useMemo(() => createContactSchema(locale), [locale])
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    const parsed = schema.safeParse({ ...data, consent: data.consent === 'on' })

    if (!parsed.success) {
      const fieldErrors: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0])
        fieldErrors[key] ??= issue.message
      }
      setErrors(fieldErrors)
      const firstInvalid = form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)
      firstInvalid?.focus()
      return
    }

    setErrors({})
    setState('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('Request failed')
      setState('sent')
      form.reset()
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-arc-gradient">
          <Check className="size-6 text-white" aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl">{t.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.sentBody}</p>
        <Button variant="outline" className="mt-7" onClick={() => setState('idle')}>
          {t.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {state === 'failed' && (
        <div role="alert" className="flex gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
          <p className="text-sm text-muted-foreground">{t.failed}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={t.nameLabel} error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field id="email" label={t.emailLabel} error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <Field id="company" label={t.companyLabel} hint={t.optional} error={errors.company}>
        <Input id="company" name="company" autoComplete="organization" placeholder={t.companyPlaceholder} />
      </Field>

      {/* Radio groups rather than selects: fewer taps on mobile, all options visible. */}
      <fieldset>
        <legend className="text-sm font-medium">{t.topicLegend}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topicOptions.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-lg border border-border px-3.5 py-2 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-foreground hover:border-foreground/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
            >
              <input type="radio" name="topic" value={option.value} className="sr-only" />
              {t.topics[option.labelKey]}
            </label>
          ))}
        </div>
        {errors.topic && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {errors.topic}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium">{t.budgetLegend}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgetOptions.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-lg border border-border px-3.5 py-2 font-mono text-xs transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-foreground hover:border-foreground/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
            >
              <input type="radio" name="budget" value={option.value} className="sr-only" />
              {t.budgets[option.labelKey]}
            </label>
          ))}
        </div>
        {errors.budget && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {errors.budget}
          </p>
        )}
      </fieldset>

      <Field id="message" label={t.messageLabel} error={errors.message}>
        <Textarea
          id="message"
          name="message"
          placeholder={t.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4 rounded border-input accent-primary"
          aria-invalid={!!errors.consent}
        />
        <span>
          {t.consent}
          {errors.consent && (
            <span role="alert" className="mt-1 block text-xs text-destructive">
              {errors.consent}
            </span>
          )}
        </span>
      </label>

      <Button type="submit" variant="arc" size="lg" disabled={state === 'sending'} className="group w-full sm:w-auto">
        {state === 'sending' ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            {t.sending}
          </>
        ) : (
          <>
            {t.submit}
            <ArrowRight className="transition-transform duration-300 ease-arc group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  )
}

/** Field wrapper — keeps label, hint and error markup identical across inputs. */
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('space-y-2')}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {hint && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
