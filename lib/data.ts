export type Project = {
  slug: string
  title: string
  subtitle: string
  period: string
  summary: string
  bullets: string[]
  link?: { label: string; href: string }
  stack: string[]
}

export type Experience = {
  org: string
  role: string
  period: string
  bullets: string[]
}

export type Certification = {
  name: string
  issuer?: string | null
  date?: string | null
  url?: string | null
  category?: string | null
}

export type ProfileData = {
  name: string
  major?: string | null
  tagline?: string | null
  email?: string | null
  phone?: string | null
  linkedin?: string | null
  resume?: string | null
  photoUrl?: string | null
  university?: string | null
}

// ── Default fallback values used when CMS is unreachable ──
// These are minimal defaults so the site never fully breaks.

export const defaultProfile: ProfileData = {
  name: 'Arham Shah',
  major: 'Aerospace Engineering Student at The University of Texas at Austin',
  tagline: 'Aerospace Engineer — Structures & Analysis',
  email: 'arhamshah@utexas.edu',
  phone: '224-509-2980',
  linkedin: 'https://www.linkedin.com/in/arhamjshah',
  resume: '/SpringResume.pdf',
  university: 'The University of Texas at Austin',
}

export const defaultProjects: Project[] = []

export const defaultExperiences: Experience[] = []

export const defaultSkillsByGroup = {
  technical: [] as string[],
  operational: [] as string[],
}

export const defaultCertifications: Certification[] = []
