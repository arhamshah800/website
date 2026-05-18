import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { evaluateProxyPolicy } from '@/lib/proxy-policy'

// ── Admin subdomain guard ──
// Only admin.arhamshah.dev can reach /admin and /api routes.
// Visitors on the main domain arhamshah.dev get redirected to homepage.
// In production, any unknown host is also blocked from admin paths.
// This keeps the admin panel invisible from the public site.

const PROD_DOMAIN = 'arhamshah.dev'
const ADMIN_SUBDOMAIN = 'admin.arhamshah.dev'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const path = request.nextUrl.pathname

  const decision = evaluateProxyPolicy({
    host,
    path,
    nodeEnv: process.env.NODE_ENV,
    prodDomain: PROD_DOMAIN,
    adminSubdomain: ADMIN_SUBDOMAIN,
  })

  if (decision === 'redirect-home') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (decision === 'redirect-admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
