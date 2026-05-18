# Release Checklist (Strict Gate)

## 1. Required Environment Variables

Set in Vercel Production:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`

If using Cloudflare R2:

- `CLOUDFLARE_R2_BUCKET`
- `CLOUDFLARE_R2_ENDPOINT`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_PUBLIC_URL`

Optional:

- `NEXT_PUBLIC_ADMIN_URL`

## 2. Local Strict Verification

Run:

```bash
./scripts/verify-gate.sh
```

This runs:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck` (twice)
4. `npm run test:proxy`
5. `npm run build`
6. starts app and executes `npm run smoke`

## 3. Manual Smoke Coverage

- Public routes: `/`, `/about`, `/projects`, `/contact`, `/experience`
- Dynamic route sample: open at least one project details URL (`/projects/<slug>`)
- System routes: `/robots.txt`, `/sitemap.xml`, `/api/auth-check`
- Admin route behavior:
  - `https://arhamshah.dev/admin` should redirect away from main domain
  - `https://admin.arhamshah.dev/admin` should load admin
  - Non-admin page on admin host should redirect to `/admin`
- Admin bar behavior:
  - logged out on main site => hidden
  - logged in with payload cookie => visible

## 4. Security Triage Notes

`npm audit` currently reports moderate vulnerabilities in transitive dependencies from `payload`/`next` ecosystem.
No critical/high findings were detected at this time.

Policy for this release:

- Block release on any **critical/high** vulnerability affecting runtime path.
- For moderate-only transitive findings without safe non-breaking patch path, document and monitor.
- Re-run `npm audit` before each production release.

## 5. Rollback Plan

- Keep last successful production deployment in Vercel.
- If issue appears post-deploy, rollback in Vercel Deployments immediately.
- Re-open stabilization branch and patch forward.
