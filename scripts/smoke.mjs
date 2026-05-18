const baseUrl = process.env.SMOKE_BASE_URL || 'http://localhost:3000'

const checks = [
  { path: '/', expect: 200 },
  { path: '/about', expect: 200 },
  { path: '/projects', expect: 200 },
  { path: '/contact', expect: 200 },
  { path: '/experience', expect: 200 },
  { path: '/robots.txt', expect: 200 },
  { path: '/sitemap.xml', expect: 200 },
  { path: '/api/auth-check', expect: 200, contains: 'loggedIn' },
]

async function run() {
  const failures = []

  for (const check of checks) {
    const url = `${baseUrl}${check.path}`
    try {
      const res = await fetch(url)
      const text = await res.text()
      if (res.status !== check.expect) {
        failures.push(`${check.path}: expected ${check.expect}, got ${res.status}`)
        continue
      }
      if (check.contains && !text.includes(check.contains)) {
        failures.push(`${check.path}: response missing expected text '${check.contains}'`)
      }
      console.log(`PASS ${check.path} -> ${res.status}`)
    } catch (error) {
      failures.push(`${check.path}: request failed (${error instanceof Error ? error.message : String(error)})`)
    }
  }

  if (failures.length > 0) {
    console.error('\nSmoke test failures:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }

  console.log('\nSmoke checks passed.')
}

run()
