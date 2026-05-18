'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { motionTokens } from '@/motion/tokens'
import type { Experience } from '@/lib/data'

// ── Individual Experience Card ──
function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  return (
    <Reveal delay={index * motionTokens.stagger.slow}>
      <div className="glass-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#bf5700]/35">
        {/* ── Timeline node (the dot on the track) ── */}
        <div className="-left-[43px] absolute top-8 h-3.5 w-3.5 rounded-full border-2 border-[#bf5700]/50 bg-[#0f1117] shadow-[0_0_0_4px_#0f1117] transition-all duration-400 group-hover:border-[#bf5700] group-hover:shadow-[0_0_0_4px_#0f1117,0_0_16px_rgba(191,87,0,0.5)]" />

        {/* ── Period badge ── */}
        <span className="inline-block rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-1 font-mono text-[11px] tracking-wide text-[#94a3b8]">
          {experience.period}
        </span>

        {/* ── Role ── */}
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#f1f5f9]">
          {experience.role}
        </h3>

        {/* ── Organization ── */}
        <p className="mt-1 text-sm text-[#bf5700]/70">
          {experience.org}
        </p>

        {/* ── Bullets ── */}
        <ul className="mt-5 space-y-2.5">
          {experience.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-[#94a3b8]">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#bf5700]/35" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* ── Card hover glow overlay ── */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              'inset 0 0 60px rgba(191,87,0,0.04), 0 0 40px rgba(191,87,0,0.08)',
          }}
        />
      </div>
    </Reveal>
  )
}

// ── Resume Section ──
export function ResumeSection({
  experiences,
  resumeUrl,
}: {
  experiences: Experience[]
  resumeUrl: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Scroll-driven track drawing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 18%', 'end 82%'],
  })

  const trackProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="resume" ref={sectionRef} className="container-shell py-20 md:py-28">
      {/* ── Header ── */}
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
            Interactive Resume
          </p>
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
            Launch Trajectory
          </h2>
          <p className="mt-3 max-w-lg text-sm text-[#64748b]">
            A chronological view of engineering experience — each role building
            momentum toward the next.
          </p>
        </div>

        {/* PDF Download */}
        <Button href={resumeUrl} variant="secondary">
          ↓ Download PDF
        </Button>
      </div>

      {/* ── Timeline ── */}
      <div className="relative">
        {/* Track rail */}
        <div className="absolute left-[19px] top-0 h-full w-[2px]">
          {/* Background rail (dim) */}
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.06)]" />

          {/* Active glowing rail (scroll-driven) */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              scaleY: reduce ? 1 : trackProgress,
              background:
                'linear-gradient(to bottom, #bf5700, rgba(191,87,0,0.5))',
              boxShadow:
                '0 0 10px rgba(191,87,0,0.5), 0 0 30px rgba(191,87,0,0.2)',
            }}
          />
        </div>

        {/* Cards */}
        <div className="space-y-10 pl-14">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={`${exp.org}-${exp.role}`}
              experience={exp}
              index={index}
            />
          ))}
        </div>

        {/* ── Terminal node (end of track) ── */}
        <div className="pl-14 pt-10">
          <div className="absolute left-[13px] top-10 h-3.5 w-3.5 rounded-full border-2 border-[#bf5700]/40 bg-[#0f1117]" />
          <p className="text-xs text-[#64748b]">
            Present — trajectory continues...
          </p>
        </div>
      </div>
    </section>
  )
}
