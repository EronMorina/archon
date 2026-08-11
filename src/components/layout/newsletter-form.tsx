'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDictionary } from './locale-provider'

/** Footer newsletter. Posts to the same contact endpoint with a `newsletter` topic. */
export function NewsletterForm() {
  const t = useDictionary().footer.newsletter
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function subscribe(event: React.FormEvent) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState('error')
      setMessage(t.invalid)
      return
    }

    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Newsletter subscriber', email, message: 'Newsletter signup', topic: 'newsletter' }),
      })
      if (!res.ok) throw new Error('request failed')
      setState('done')
      setMessage(t.success)
    } catch {
      setState('error')
      setMessage(t.failed)
    }
  }

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-foreground">
        <Check className="size-4 text-arc-cyan" aria-hidden />
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={subscribe} className="space-y-2.5" noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t.emailLabel}
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state === 'error') setState('idle')
          }}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
          className="h-10"
        />
        <Button type="submit" variant="outline" size="icon" disabled={state === 'sending'} aria-label={t.subscribe}>
          {state === 'sending' ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </Button>
      </div>
      {state === 'error' ? (
        <p id="newsletter-error" role="alert" className="text-xs text-destructive">
          {message}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">{t.note}</p>
      )}
    </form>
  )
}
