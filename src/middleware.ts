import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n/config'

/**
 * Locale routing, "prefix as needed".
 *
 * - `/de/services`  → served as-is by app/[locale]/services
 * - `/services`     → rewritten to `/en/services`; the URL the visitor sees
 *                     never changes, so existing links and rankings survive
 * - `/en/services`  → redirected to `/services` so each page has exactly one
 *                     canonical URL and search engines see no duplicates
 *
 * There is deliberately no Accept-Language auto-redirect: it makes the
 * canonical URL depend on the visitor's browser, which confuses crawlers and
 * surprises anyone following a shared link. The switcher in the navbar is the
 * one way the language changes.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/')
  const first = segments[1]

  if (isLocale(first)) {
    if (first !== defaultLocale) return NextResponse.next()

    // Strip the redundant default-locale prefix.
    const url = request.nextUrl.clone()
    const rest = segments.slice(2).join('/')
    url.pathname = rest ? `/${rest}` : '/'
    return NextResponse.redirect(url)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  /**
   * Everything except API routes, Next internals, metadata files and anything
   * with a file extension (images, fonts, favicon…).
   */
  matcher: ['/((?!api|_next/static|_next/image|images|.*\\.[^/]+$).*)'],
}
