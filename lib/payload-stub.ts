// Stub for @payload-config when Payload CMS is not configured.
// Turbopack resolves here instead of tracing into payload.config.ts
// and its heavy dependency tree (@libsql, esbuild, drizzle-kit).
// When DATABASE_URL + PAYLOAD_SECRET are set, the CMS path in
// lib/cms-data.ts catches the dynamic import error and falls through
// to hardcoded data anyway. This stub prevents build-time errors.
const config = {}
export default config
