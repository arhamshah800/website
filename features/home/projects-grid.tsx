'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/reveal'
import { motionTokens } from '@/motion/tokens'
import type { Project } from '@/lib/data'

// ── Abstract background patterns per project ──
const projectPatterns: Record<string, React.ReactNode> = {
  'rocket-test-stand': (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Rocket nozzle / thrust chamber geometry */}
      <path
        d="M100 20 L120 60 L125 80 L125 120 L75 120 L75 80 L80 60 Z"
        stroke="#bf5700"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="40" r="10" stroke="#bf5700" strokeWidth="1" />
      <path d="M85 90 L115 90 M85 100 L115 100 M85 110 L115 110" stroke="#bf5700" strokeWidth="0.8" opacity="0.5" />
      <path d="M60 120 L140 120" stroke="#bf5700" strokeWidth="0.8" opacity="0.4" />
      {/* Flame exhaust */}
      <path d="M90 120 Q100 145 110 120" stroke="#bf5700" strokeWidth="0.6" opacity="0.3" />
      <path d="M85 120 Q100 155 115 120" stroke="#bf5700" strokeWidth="0.5" opacity="0.2" />
    </svg>
  ),
  'simulated-catapult-system': (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Airfoil / wing cross-section */}
      <path
        d="M30 70 Q65 50 100 65 Q135 80 170 70 Q135 60 100 55 Q65 50 30 70 Z"
        stroke="#bf5700"
        strokeWidth="1.5"
      />
      {/* Flow lines */}
      <path d="M15 55 Q50 55 100 58 Q150 61 185 55" stroke="#bf5700" strokeWidth="0.6" opacity="0.3" />
      <path d="M15 75 Q50 77 100 75 Q150 73 185 77" stroke="#bf5700" strokeWidth="0.6" opacity="0.3" />
      <path d="M15 85 Q50 87 100 82 Q150 77 185 85" stroke="#bf5700" strokeWidth="0.5" opacity="0.2" />
      {/* Angle of attack indicator */}
      <path d="M100 60 L130 40" stroke="#bf5700" strokeWidth="0.6" opacity="0.4" />
    </svg>
  ),
}

// ── Project Card ──
function ProjectCard({
  project,
  isFeatured,
  index,
}: {
  project: Project
  isFeatured: boolean
  index: number
}) {
  const pattern = projectPatterns[project.slug]

  return (
    <Reveal delay={index * motionTokens.stagger.slow}>
      <Link
        href={`/projects/${project.slug}`}
        className="glass-surface group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#bf5700]/35"
      >
        {/* ── Abstract pattern background ── */}
        {pattern}

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-1 flex-col p-6">
          {/* Period */}
          <span className="inline-block w-fit rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#64748b]">
            {project.period}
          </span>

          {/* Title */}
          <h3
            className={`mt-3 font-semibold tracking-tight text-[#f1f5f9] transition-colors duration-300 group-hover:text-[#bf5700] ${
              isFeatured ? 'text-2xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="mt-1.5 text-sm text-[#94a3b8]">{project.subtitle}</p>

          {/* Summary */}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748b]">
            {project.summary}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(191,87,0,0.06)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#bf5700]/80 transition-colors duration-300 group-hover:border-[#bf5700]/25 group-hover:bg-[rgba(191,87,0,0.12)] group-hover:text-[#bf5700]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View case study indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-[#64748b] opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:text-[#bf5700] group-hover:opacity-100">
            View Case Study
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>

        {/* ── Hover glow overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              'inset 0 0 50px rgba(191,87,0,0.04), 0 0 35px rgba(191,87,0,0.07)',
          }}
        />
      </Link>
    </Reveal>
  )
}

// ── Projects Grid Section ──
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  // First project is featured (spans more columns)
  const [featured, ...secondary] = projects

  return (
    <section id="projects" className="container-shell py-20 md:py-28">
      {/* ── Header ── */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          Featured Projects
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          Engineering work with context, not just screenshots
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[#64748b]">
          Each project includes technical contributions, tools used, and
          measurable outcomes.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Featured project (spans 2 cols) */}
        {featured ? (
          <div className="md:col-span-2">
            <ProjectCard
              project={featured}
              isFeatured
              index={0}
            />
          </div>
        ) : null}

        {/* Secondary projects */}
        {secondary.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isFeatured={false}
            index={i + 1}
          />
        ))}
      </div>
    </section>
  )
}
