import Image from 'next/image'
import { getProfile } from '@/lib/cms-data'

export default async function AboutPage() {
  const profile = await getProfile()

  return (
    <section className="container-shell py-20 md:py-28">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          About
        </p>
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          Engineering is in the details
        </h1>
      </div>

      <div className="grid items-start gap-10 md:grid-cols-[280px_1fr]">
        {/* Profile image */}
        <div className="relative">
          <Image
            src={profile.photoUrl ?? '/profile.jpg'}
            alt={profile.name}
            width={280}
            height={280}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] object-cover"
            priority
          />
          {/* Glow behind image */}
          <div
            className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(191,87,0,0.2), transparent 70%)',
            }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#f1f5f9]">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-[#bf5700]/70">{profile.major}</p>
          </div>

          <div className="glass-surface rounded-2xl p-6">
            <p className="leading-relaxed text-[#94a3b8]">
              I am an aerospace engineering student at UT Austin focused on structures,
              analysis, and technical execution. I care about rigorous engineering
              decisions and clear communication of results — every project here reflects
              that commitment to precision and thoughtful execution.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.resume ?? '/SpringResume.pdf'}
              className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] px-5 py-2.5 text-sm font-medium text-[#e2e8f0] transition-all duration-300 hover:border-[#bf5700]/50 hover:text-[#bf5700] hover:-translate-y-0.5"
            >
              ↓ View Resume
            </a>
            <a
              href={profile.linkedin ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] px-5 py-2.5 text-sm font-medium text-[#e2e8f0] transition-all duration-300 hover:border-[#bf5700]/50 hover:text-[#bf5700] hover:-translate-y-0.5"
            >
              LinkedIn →
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#94a3b8] transition-all duration-300 hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.05)]"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
