import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/cms-data'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <article className="container-shell py-14 md:py-20">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-[#64748b] transition-colors hover:text-[#bf5700]"
      >
        ← Back to Projects
      </Link>

      {/* Period */}
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[#64748b]">
        {project.period}
      </p>

      {/* Title */}
      <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-[#f1f5f9] md:text-5xl">
        {project.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg text-[#94a3b8]">{project.subtitle}</p>

      {/* Summary */}
      <p className="mt-6 max-w-3xl leading-relaxed text-[#cbd5e1]">
        {project.summary}
      </p>

      {/* ── Technical Contributions ── */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-[#f1f5f9]">
          Technical Contributions
        </h2>
        <div className="card-surface mt-4 rounded-2xl p-6">
          <ul className="space-y-3">
            {project.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2.5 text-sm leading-relaxed text-[#94a3b8]"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#bf5700]/40" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tools & Methods ── */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight text-[#f1f5f9]">
          Tools &amp; Methods
        </h2>
        <div className="card-surface mt-4 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgba(191,87,0,0.2)] bg-[rgba(191,87,0,0.08)] px-3 py-1 text-sm font-medium text-[#bf5700]/90"
              >
                {item}
              </span>
            ))}
          </div>

          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#bf5700] transition-colors hover:text-[#d4650a]"
            >
              {project.link.label} →
            </a>
          ) : null}
        </div>
      </section>

      {/* ── Back to projects ── */}
      <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8">
        <Link
          href="/#projects"
          className="text-sm text-[#64748b] transition-colors hover:text-[#bf5700]"
        >
          ← Back to Projects
        </Link>
      </div>
    </article>
  )
}
