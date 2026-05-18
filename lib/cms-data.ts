import 'server-only'

import {
  defaultCertifications,
  defaultExperiences,
  defaultProfile,
  defaultProjects,
  defaultSkillsByGroup,
  type Certification,
  type Experience,
  type ProfileData,
  type Project,
} from '@/lib/data'

// ── CMS-driven data layer ──
// All content comes from Payload CMS (Postgres via Supabase).
// If Payload is unreachable, minimal empty defaults are returned
// so the site renders gracefully rather than crashing.

async function getPayloadClient() {
  const [{ getPayload }, { default: configPromise }] = await Promise.all([
    import('payload'),
    import('@payload-config'),
  ])
  return getPayload({ config: configPromise })
}

// ── Public data fetchers ──

export async function getHomeData(): Promise<{
  profile: ProfileData
  projects: Project[]
  experiences: Experience[]
  skillsByGroup: { technical: string[]; operational: string[] }
  certifications: Certification[]
}> {
  try {
    const payload = await getPayloadClient()

    const [projectsRes, experiencesRes, skillsRes, certificationsRes, profileDoc] =
      await Promise.all([
        payload.find({
          collection: 'projects',
          depth: 1,
          limit: 100,
          where: { status: { equals: 'published' } },
          sort: '-updatedAt',
        }),
        payload.find({
          collection: 'experiences',
          depth: 1,
          limit: 100,
          sort: '-updatedAt',
        }),
        payload.find({
          collection: 'skills',
          depth: 0,
          limit: 200,
          sort: 'label',
        }),
        payload.find({
          collection: 'certifications' as any,
          depth: 0,
          limit: 200,
          sort: 'name',
        }),
        payload.findGlobal({ slug: 'profile' as any }),
      ])

    return {
      profile: mapProfile(profileDoc),
      projects: mapProjects(projectsRes.docs),
      experiences: mapExperiences(experiencesRes.docs),
      skillsByGroup: mapSkills(skillsRes.docs),
      certifications: mapCertifications(certificationsRes.docs),
    }
  } catch (err) {
    // CMS unreachable — return empty defaults so the site still renders
    console.error('[cms-data] Failed to load home data:', err)
    return {
      profile: defaultProfile,
      projects: defaultProjects,
      experiences: defaultExperiences,
      skillsByGroup: defaultSkillsByGroup,
      certifications: defaultCertifications,
    }
  }
}

export async function getProjectsData(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 100,
      where: { status: { equals: 'published' } },
      sort: '-updatedAt',
    })
    return mapProjects(res.docs)
  } catch (err) {
    console.error('[cms-data] Failed to load projects:', err)
    return defaultProjects
  }
}

export async function getExperiencesData(): Promise<Experience[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'experiences',
      depth: 1,
      limit: 100,
      sort: '-updatedAt',
    })
    return mapExperiences(res.docs)
  } catch (err) {
    console.error('[cms-data] Failed to load experiences:', err)
    return defaultExperiences
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjectsData()
  return projects.find((project) => project.slug === slug) ?? null
}

export async function getProfile(): Promise<ProfileData> {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({ slug: 'profile' as any })
    return mapProfile(doc)
  } catch (err) {
    console.error('[cms-data] Failed to load profile:', err)
    return defaultProfile
  }
}

// ── CMS mappers ──

function mapProfile(doc: any): ProfileData {
  return {
    name: doc?.name ?? defaultProfile.name,
    major: doc?.major ?? defaultProfile.major,
    tagline: doc?.tagline ?? defaultProfile.tagline,
    email: doc?.email ?? defaultProfile.email,
    phone: doc?.phone ?? defaultProfile.phone,
    linkedin: doc?.linkedin ?? defaultProfile.linkedin,
    resume: typeof doc?.resume === 'object' && doc.resume?.url ? doc.resume.url : defaultProfile.resume,
    photoUrl: typeof doc?.photo === 'object' && doc.photo?.url ? doc.photo.url : null,
    university: doc?.university ?? defaultProfile.university,
  }
}

function mapProjects(docs: any[]): Project[] {
  if (!docs.length) return defaultProjects
  return docs.map((doc: any) => ({
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.role || 'Project',
    period: doc.year ? String(doc.year) : 'In Progress',
    summary: doc.summary,
    bullets: [doc.problem, doc.approach, doc.outcomes].filter(Boolean),
    stack: Array.isArray(doc.technologies)
      ? doc.technologies
          .map((tech: any) => (typeof tech === 'object' && tech?.name ? tech.name : null))
          .filter(Boolean)
      : [],
    link:
      Array.isArray(doc.links) && doc.links[0]?.url
        ? { label: doc.links[0]?.label || 'Project Link', href: doc.links[0].url }
        : undefined,
  }))
}

function mapExperiences(docs: any[]): Experience[] {
  if (!docs.length) return defaultExperiences
  return docs.map((doc: any) => ({
    org: doc.org,
    role: doc.role,
    period: doc.period,
    bullets: toTextArray(doc.bullets),
  }))
}

function mapSkills(docs: any[]): { technical: string[]; operational: string[] } {
  if (!docs.length) return defaultSkillsByGroup
  const techSkills = docs
    .filter((doc: any) => String(doc.category || '').toLowerCase().includes('tech'))
    .map((doc: any) => doc.label)
  const operationalSkills = docs
    .filter((doc: any) => !String(doc.category || '').toLowerCase().includes('tech'))
    .map((doc: any) => doc.label)
  return {
    technical: techSkills.length ? techSkills : defaultSkillsByGroup.technical,
    operational: operationalSkills.length ? operationalSkills : defaultSkillsByGroup.operational,
  }
}

function mapCertifications(docs: any[]): Certification[] {
  if (!docs.length) return defaultCertifications
  return docs.map((doc: any) => ({
    name: doc.name,
    issuer: doc.issuer ?? null,
    date: doc.date ?? null,
    url: doc.url ?? null,
    category: doc.category ?? null,
  }))
}

function toTextArray(rows: unknown): string[] {
  if (!Array.isArray(rows)) return []
  return rows
    .map((row) => {
      if (typeof row === 'string') return row
      if (row && typeof row === 'object' && 'item' in row && typeof (row as { item?: unknown }).item === 'string') {
        return (row as { item: string }).item
      }
      return null
    })
    .filter((item): item is string => Boolean(item))
}
