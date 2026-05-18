'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { Project, Experience, Certification } from '@/lib/data'

// ── Animated counter ──
function CountUp({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return

    let raf: number
    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

// ── Metric Card ──
function MetricCard({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  return (
    <div className="glass-surface group flex flex-col items-center justify-center rounded-2xl p-5 text-center transition-all duration-400 hover:-translate-y-1 hover:border-[#bf5700]/25">
      <span className="text-3xl font-bold tracking-tight text-[#bf5700] md:text-4xl">
        <CountUp target={value} suffix={suffix} />
      </span>
      <span className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748b] transition-colors duration-400 group-hover:text-[#94a3b8]">
        {label}
      </span>
    </div>
  )
}

// ── Compute years of experience from earliest period ──
function computeYearsExp(experiences: Experience[]): number {
  const years = experiences.map((e) => {
    const match = e.period.match(/(\d{4})/)
    return match ? parseInt(match[1], 10) : null
  })
  const valid = years.filter((y): y is number => y !== null)
  if (valid.length === 0) return 0
  const earliest = Math.min(...valid)
  return new Date().getFullYear() - earliest
}

// ── Proof Strip (Metrics Bar) ──
export function ProofStrip({
  projects,
  experiences,
  certifications,
  skillsByGroup,
}: {
  projects: Project[]
  experiences: Experience[]
  certifications: Certification[]
  skillsByGroup: { technical: string[]; operational: string[] }
}) {
  const yearsExp = computeYearsExp(experiences)
  const totalSkills =
    skillsByGroup.technical.length + skillsByGroup.operational.length

  const metrics = [
    { value: yearsExp, suffix: '+', label: 'Years Experience' },
    { value: projects.length, suffix: '', label: 'Projects' },
    { value: certifications.length, suffix: '', label: 'Certifications' },
    { value: totalSkills, suffix: '', label: 'Skills' },
  ]

  return (
    <section className="container-shell py-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            value={m.value}
            suffix={m.suffix}
            label={m.label}
          />
        ))}
      </div>
    </section>
  )
}
