export type ProxyDecision = 'allow' | 'redirect-home' | 'redirect-admin'

const ADMIN_PATH_PREFIXES = ['/admin', '/api']
const PUBLIC_API_PATHS = ['/api/auth-check']

export function evaluateProxyPolicy(input: {
  host: string
  path: string
  prodDomain: string
  adminSubdomain: string
  nodeEnv?: string
}): ProxyDecision {
  const host = input.host
  const path = input.path
  const prodDomain = input.prodDomain
  const adminSubdomain = input.adminSubdomain
  const nodeEnv = input.nodeEnv

  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return 'allow'
  }

  const isPublicApiPath = PUBLIC_API_PATHS.some((publicPath) =>
    path.startsWith(publicPath),
  )
  const isAdminPath =
    !isPublicApiPath && ADMIN_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
  const isAdminSubdomain = host === adminSubdomain
  const isMainDomain = host === prodDomain

  if (isMainDomain && isAdminPath) {
    return 'redirect-home'
  }

  if (isAdminSubdomain && !isAdminPath) {
    return 'redirect-admin'
  }

  if (nodeEnv === 'production' && isAdminPath && !isAdminSubdomain) {
    return 'redirect-home'
  }

  return 'allow'
}
