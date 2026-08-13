import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createContactSchema } from '@/lib/contact-schema'

/**
 * Contact endpoint.
 *
 * - Validates with the same zod schema the client uses (never trust the client).
 * - Applies a simple in-memory rate limit per IP. For multi-instance
 *   deployments swap this for Upstash Redis or Vercel KV.
 * - Sends via Resend when RESEND_API_KEY is set; otherwise logs and returns
 *   success in development so the form is testable without credentials.
 */

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5
const hits = new Map<string, { count: number; expires: number }>()

function rateLimited(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || entry.expires < now) {
    hits.set(ip, { count: 1, expires: now + WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_REQUESTS
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from this address. Try again in a minute.' },
      { status: 429 }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Send a JSON body.' }, { status: 400 })
  }

  // Newsletter signups post a smaller shape, so validate them separately.
  const isNewsletter =
    typeof payload === 'object' && payload !== null && (payload as { topic?: string }).topic === 'newsletter'

  // Server-side messages are never shown to the visitor — the client renders
  // its own localised errors — so the default locale's schema is enough here.
  const schema = createContactSchema()

  const parsed = isNewsletter
    ? schema.pick({ email: true }).safeParse(payload)
    : schema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Some fields need attention.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data as Record<string, unknown>
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // No credentials configured — succeed loudly in the server log instead.
    console.info('[contact] RESEND_API_KEY not set. Payload:', data)
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const resend = new Resend(apiKey)
    const subject = isNewsletter
      ? `Newsletter signup — ${data.email}`
      : `New enquiry — ${data.name} (${data.company || 'no company'})`

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'website@archon.studio',
      to: process.env.CONTACT_TO_EMAIL ?? 'hello@archon.studio',
      replyTo: String(data.email),
      subject,
      text: Object.entries(data)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join('\n'),
    })

    return NextResponse.json({ ok: true, delivered: true })
  } catch (error) {
    console.error('[contact] delivery failed', error)
    return NextResponse.json({ error: 'Message could not be delivered. Email us directly.' }, { status: 502 })
  }
}
