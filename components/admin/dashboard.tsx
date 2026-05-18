// ── Custom Payload Admin Dashboard ──
// Replaces the default dashboard with a content overview showing
// draft/publish status and collection stats at a glance.
//
// This is a server component — all data is fetched server-side via
// the Payload Local API. Hover effects use CSS, no client JS needed.

import { getPayload } from 'payload'
import type { Payload } from 'payload'
import configPromise from '@payload-config'

// ── Types ──

type CollectionMeta = {
  slug: string
  label: string
  /** Has a custom 'status' select field (e.g. Projects) */
  hasCustomStatus: boolean
  /** Uses Payload's built-in versioning with _status (e.g. Experiences) */
  isVersioned: boolean
}

type CollectionStat = {
  slug: string
  label: string
  total: number
  published: number
  draft: number
}

// ── Collections to track ──

const TRACKED: CollectionMeta[] = [
  { slug: 'projects', label: 'Projects', hasCustomStatus: true, isVersioned: true },
  { slug: 'experiences', label: 'Experiences', hasCustomStatus: false, isVersioned: true },
  { slug: 'skills', label: 'Skills', hasCustomStatus: false, isVersioned: false },
  { slug: 'certifications', label: 'Certifications', hasCustomStatus: false, isVersioned: false },
  { slug: 'technologies', label: 'Technologies', hasCustomStatus: false, isVersioned: false },
  { slug: 'media-assets', label: 'Media Assets', hasCustomStatus: false, isVersioned: false },
  { slug: 'featured-sets', label: 'Featured Sets', hasCustomStatus: false, isVersioned: true },
]

// ── Helpers ──

async function getCollectionStats(
  payload: Payload,
  meta: CollectionMeta,
): Promise<CollectionStat> {
  const slug = meta.slug as any

  const total = await payload.count({ collection: slug })

  let published = 0
  let draft = 0

  if (meta.hasCustomStatus) {
    // Projects has a custom 'status' select field
    const pubRes = await payload.count({
      collection: slug,
      where: { status: { equals: 'published' } },
    })
    const draftRes = await payload.count({
      collection: slug,
      where: { status: { equals: 'draft' } },
    })
    published = pubRes.totalDocs
    draft = draftRes.totalDocs
  } else if (meta.isVersioned) {
    // Experiences, FeaturedSets — Payload's built-in _status
    const pubRes = await payload.count({
      collection: slug,
      where: { _status: { equals: 'published' } },
    })
    const draftRes = await payload.count({
      collection: slug,
      where: { _status: { equals: 'draft' } },
    })
    published = pubRes.totalDocs
    draft = draftRes.totalDocs
  } else {
    // Skills, Certs, Technologies — no drafts
    published = total.totalDocs
  }

  return {
    slug: meta.slug,
    label: meta.label,
    total: total.totalDocs,
    published,
    draft,
  }
}

// ── Dashboard Component ──

export default async function CustomDashboard() {
  const payload = await getPayload({ config: configPromise })

  // Fetch stats for all collections in parallel (single Payload client)
  const stats = await Promise.all(
    TRACKED.map((meta) => getCollectionStats(payload, meta)),
  )

  // Summary
  const totalItems = stats.reduce((sum, s) => sum + s.total, 0)
  const totalPublished = stats.reduce((sum, s) => sum + s.published, 0)
  const totalDrafts = stats.reduce((sum, s) => sum + s.draft, 0)

  return (
    <div>
      <style>{`
        .cd-row:hover{background:var(--theme-elevation-100)!important}
        .cd-qbtn:hover{background:var(--theme-elevation-200)!important}
        .cd-editlink:hover{color:var(--theme-elevation-1000)!important}
      `}</style>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
            Content Overview
          </h1>
          <p style={{ color: 'var(--theme-elevation-500)', marginTop: '0.5rem' }}>
            At-a-glance status of all site content
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <SummaryCard label="Total Items" value={totalItems} color="var(--theme-elevation-800)" />
          <SummaryCard label="Published" value={totalPublished} color="#22c55e" />
          <SummaryCard label="Drafts" value={totalDrafts} color="#f59e0b" />
          <SummaryCard label="Collections" value={stats.length} color="var(--theme-elevation-600)" />
        </div>

        {/* ── Collections Table ── */}
        <div
          style={{
            background: 'var(--theme-elevation-50)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--theme-elevation-150)',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '0.75rem 1.25rem',
              background: 'var(--theme-elevation-100)',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--theme-elevation-600)',
            }}
          >
            <span>Collection</span>
            <span style={{ textAlign: 'center' }}>Total</span>
            <span style={{ textAlign: 'center' }}>Published</span>
            <span style={{ textAlign: 'center' }}>Drafts</span>
            <span style={{ textAlign: 'right' }}>Action</span>
          </div>

          {stats.map((stat, i) => (
            <div
              key={stat.slug}
              className="cd-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '0.85rem 1.25rem',
                borderTop: i > 0 ? '1px solid var(--theme-elevation-100)' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
            >
              <span style={{ fontWeight: 500 }}>{stat.label}</span>
              <span style={{ textAlign: 'center' }}>{stat.total}</span>
              <span style={{ textAlign: 'center', color: '#22c55e' }}>
                {stat.published}
              </span>
              <span style={{ textAlign: 'center' }}>
                {stat.draft > 0 ? (
                  <span
                    style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {stat.draft}
                  </span>
                ) : (
                  <span style={{ color: 'var(--theme-elevation-400)' }}>—</span>
                )}
              </span>
              <a
                href={`/admin/collections/${stat.slug}`}
                className="cd-editlink"
                style={{
                  textAlign: 'right',
                  color: 'var(--theme-elevation-800)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                Edit →
              </a>
            </div>
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <QuickAction href="/admin/collections/projects/create" label="+ New Project" />
            <QuickAction href="/admin/collections/experiences/create" label="+ New Experience" />
            <QuickAction href="/admin/collections/certifications/create" label="+ New Certification" />
            <QuickAction href="/admin/collections/skills/create" label="+ New Skill" />
            <QuickAction href="/admin/globals/profile" label="Edit Profile" />
            <QuickAction href="/admin/globals/site-settings" label="Site Settings" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div
      style={{
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '8px',
        padding: '1.25rem',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--theme-elevation-600)',
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color,
          margin: '0.25rem 0 0',
        }}
      >
        {value}
      </p>
    </div>
  )
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="cd-qbtn"
      style={{
        padding: '0.6rem 1.25rem',
        background: 'var(--theme-elevation-100)',
        border: '1px solid var(--theme-elevation-200)',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: 'var(--theme-elevation-800)',
        textDecoration: 'none',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </a>
  )
}
