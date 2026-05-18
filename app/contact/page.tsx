import { getProfile } from '@/lib/cms-data'

export default async function ContactPage() {
  const profile = await getProfile()

  return (
    <section className="container-shell py-20 md:py-28">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          Contact
        </p>
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          Let&apos;s connect
        </h1>
        <p className="mt-3 max-w-lg text-sm text-[#64748b]">
          Open to engineering opportunities, collaboration, and conversations
          about aerospace structures and analysis.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact details */}
        <div className="glass-surface rounded-2xl p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[#f1f5f9]">
            Reach out directly
          </h2>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748b]">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block text-sm text-[#94a3b8] transition-colors hover:text-[#bf5700]"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748b]">
                LinkedIn
              </p>
              <a
                href={profile.linkedin ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm text-[#94a3b8] transition-colors hover:text-[#bf5700]"
              >
                {(profile.linkedin ?? '').replace('https://www.', '')}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748b]">
                Phone
              </p>
              <p className="mt-1 text-sm text-[#94a3b8]">{profile.phone}</p>
            </div>
          </div>
        </div>

        {/* Contact CTA card */}
        <div className="glass-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-[#bf5700]/35">
          <h2 className="text-lg font-semibold tracking-tight text-[#f1f5f9]">
            Current focus
          </h2>
          <p className="mt-3 leading-relaxed text-sm text-[#94a3b8]">
            I&apos;m currently pursuing aerospace engineering at UT Austin with a
            focus on structures and analysis. I&apos;m actively involved with
            Longhorn Rocketry as a Structures Engineer, working on the vertical
            rocket engine test stand.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={profile.resume ?? '/SpringResume.pdf'}
              className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] px-4 py-2 text-sm font-medium text-[#e2e8f0] transition-all duration-300 hover:border-[#bf5700]/50 hover:text-[#bf5700] hover:-translate-y-0.5"
            >
              ↓ Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full bg-[#bf5700] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#d4650a] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(191,87,0,0.35)]"
            >
              Send Email
            </a>
          </div>

          {/* Hover glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow:
                'inset 0 0 50px rgba(191,87,0,0.03), 0 0 30px rgba(191,87,0,0.05)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
