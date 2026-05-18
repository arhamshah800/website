import { getExperiencesData } from '@/lib/cms-data'

export default async function ExperiencePage() {
  const experiences = await getExperiencesData()

  return (
    <section className="container-shell py-20 md:py-28">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          Experience
        </p>
        <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          Professional Journey
        </h1>
        <p className="mt-3 max-w-lg text-sm text-[#64748b]">
          A chronological view of engineering roles — each building momentum toward the next.
        </p>
      </div>

      <div className="space-y-5">
        {experiences.map((item) => (
          <article
            key={`${item.org}-${item.role}`}
            className="glass-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#bf5700]/35"
          >
            {/* Period badge */}
            <span className="inline-block rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-1 font-mono text-[11px] tracking-wide text-[#94a3b8]">
              {item.period}
            </span>

            {/* Role */}
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#f1f5f9]">
              {item.role}
            </h2>

            {/* Organization */}
            <p className="mt-1 text-sm text-[#bf5700]/70">{item.org}</p>

            {/* Bullets */}
            <ul className="mt-5 space-y-2.5">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[#94a3b8]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#bf5700]/35" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                boxShadow:
                  'inset 0 0 60px rgba(191,87,0,0.04), 0 0 40px rgba(191,87,0,0.08)',
              }}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
