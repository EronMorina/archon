'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, readConsent } from './cookie-consent'

/**
 * Google Analytics 4, consent-gated.
 * The script tag is not rendered at all until consent is granted, so a visitor
 * who declines pays no bytes and sets no cookies.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(readConsent() === 'granted')
    const onChange = (event: Event) => {
      setAllowed((event as CustomEvent<string>).detail === 'granted')
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (!gaId || !allowed) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
