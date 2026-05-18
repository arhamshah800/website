import Link from 'next/link'
import { getProjectsData } from '@/lib/cms-data'

export const metadata = {
  title: 'Projects | Arham Shah',
}

export default async function ProjectsPage() {
  const projects = await getProjectsData()

  return (
    <section className="container-shell py-20 md:py-28">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          Projects
        </p>
        <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          All Projects
        </h1>
        <p className="mt-3 max-w-lg text-sm text-[#64748b]">
          Technical depth preserved — each project includes context, methods, and outcomes.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="glass-surface group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#bf5700]/35"
          >
            {/* Period badge */}
            <span className="inline-block w-fit rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#64748b]">
              {project.period}
            </span>

            {/* Title */}
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#f1f5f9] transition-colors duration-300 group-hover:text-[#bf5700]">
              {project.title}
            </h2>

            {/* Subtitle */}
            <p className="mt-1.5 text-sm text-[#94a3b8]">{project.subtitle}</p>

            {/* Summary */}
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748b]">
              {project.summary}
            </p>

            {/* Bullets */}
            <ul className="mt-4 space-y-2">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[#94a3b8]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#bf5700]/35" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech stack pills */}
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

            {/* View case study */}
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-[#64748b] opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:text-[#bf5700] group-hover:opacity-100">
              View Case Study
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </div>

            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                boxShadow:
                  'inset 0 0 50px rgba(191,87,0,0.04), 0 0 35px rgba(191,87,0,0.07)',
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
