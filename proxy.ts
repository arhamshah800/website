import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ── Admin subdomain guard ──
// Only admin.arhamshah.dev can reach /admin and /api routes.
// Visitors on the main domain arhamshah.dev get redirected to homepage.
// In production, any unknown host is also blocked from admin paths.
// This keeps the admin panel invisible from the public site.

const ADMIN_PATH_PREFIXES = ['/admin', '/api']
const PUBLIC_API_PATHS = ['/api/auth-check']
const PROD_DOMAIN = 'arhamshah.dev'
const ADMIN_SUBDOMAIN = 'admin.arhamshah.dev'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const path = request.nextUrl.pathname

  // In development (localhost), allow all access
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next()
  }

  const isPublicApiPath = PUBLIC_API_PATHS.some((publicPath) => path.startsWith(publicPath))
  const isAdminPath =
    !isPublicApiPath && ADMIN_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
  const isAdminSubdomain = host === ADMIN_SUBDOMAIN
  const isMainDomain = host === PROD_DOMAIN

  // On main domain, block admin paths — redirect to homepage
  if (isMainDomain && isAdminPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // On admin subdomain, only allow admin/api paths; redirect everything else
  if (isAdminSubdomain && !isAdminPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // In production, block admin paths on any unknown host (e.g. Vercel preview URLs)
  if (process.env.NODE_ENV === 'production' && isAdminPath && !isAdminSubdomain) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
