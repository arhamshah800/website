import test from 'node:test'
import assert from 'node:assert/strict'

import { evaluateProxyPolicy } from '../lib/proxy-policy.js'

const prodDomain = 'arhamshah.dev'
const adminSubdomain = 'admin.arhamshah.dev'

test('allows localhost admin paths in development', () => {
  const decision = evaluateProxyPolicy({
    host: 'localhost:3000',
    path: '/admin',
    nodeEnv: 'development',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'allow')
})

test('allows auth-check API on main domain', () => {
  const decision = evaluateProxyPolicy({
    host: prodDomain,
    path: '/api/auth-check',
    nodeEnv: 'production',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'allow')
})

test('redirects admin path on main domain to home', () => {
  const decision = evaluateProxyPolicy({
    host: prodDomain,
    path: '/admin',
    nodeEnv: 'production',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'redirect-home')
})

test('redirects non-admin path on admin subdomain to /admin', () => {
  const decision = evaluateProxyPolicy({
    host: adminSubdomain,
    path: '/projects',
    nodeEnv: 'production',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'redirect-admin')
})

test('blocks admin paths on unknown host in production', () => {
  const decision = evaluateProxyPolicy({
    host: 'preview-123.vercel.app',
    path: '/api/users/me',
    nodeEnv: 'production',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'redirect-home')
})

test('allows non-admin paths on unknown host', () => {
  const decision = evaluateProxyPolicy({
    host: 'preview-123.vercel.app',
    path: '/projects',
    nodeEnv: 'production',
    prodDomain,
    adminSubdomain,
  })
  assert.equal(decision, 'allow')
})
