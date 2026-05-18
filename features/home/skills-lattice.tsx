'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { motionTokens } from '@/motion/tokens'

// ── Individual skill pill ──
function SkillPill({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: motionTokens.duration.micro,
        delay: 0.1 + index * 0.03,
        ease: motionTokens.easing.bounce,
      }}
      className="inline-flex items-center rounded-full border border-[rgba(191,87,0,0.15)] bg-[rgba(191,87,0,0.05)] px-3 py-1.5 text-xs font-medium text-[#bf5700]/85 transition-all duration-300 hover:border-[#bf5700]/40 hover:bg-[rgba(191,87,0,0.12)] hover:text-[#bf5700] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(191,87,0,0.15)]"
    >
      {skill}
    </motion.span>
  )
}

// ── Skill group card ──
function SkillGroupCard({
  title,
  subtitle,
  items,
  index,
}: {
  title: string
  subtitle: string
  items: string[]
  index: number
}) {
  return (
    <Reveal delay={index * motionTokens.stagger.slow}>
      <div className="glass-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-[#bf5700]/25 hover:-translate-y-1">
        {/* ── Group header ── */}
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
            {title}
          </p>
          <p className="mt-1 text-sm text-[#64748b]">{subtitle}</p>
        </div>

        {/* ── Skill pills lattice ── */}
        <div className="flex flex-wrap gap-2">
          {items.map((skill, i) => (
            <SkillPill key={skill} skill={skill} index={i} />
          ))}
        </div>

        {/* ── Density indicator ── */}
        <div className="mt-5 flex items-center gap-1">
          {Array.from({ length: Math.min(items.length, 10) }).map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full bg-[rgba(191,87,0,0.15)] transition-colors duration-500 group-hover:bg-[rgba(191,87,0,0.3)]"
            />
          ))}
          <span className="ml-2 font-mono text-[10px] text-[#64748b]">
            {items.length} skills
          </span>
        </div>

        {/* ── Hover glow ── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              'inset 0 0 50px rgba(191,87,0,0.03), 0 0 30px rgba(191,87,0,0.05)',
          }}
        />
      </div>
    </Reveal>
  )
}

// ── Skills Section ──
export function SkillsSection({
  skillsByGroup,
}: {
  skillsByGroup: { technical: string[]; operational: string[] }
}) {
  const groups = [
    {
      key: 'technical' as const,
      title: 'Technical',
      subtitle: 'Engineering tools, analysis methods, and design capabilities',
    },
    {
      key: 'operational' as const,
      title: 'Operational',
      subtitle: 'Project execution, documentation, and risk management',
    },
  ]

  return (
    <section id="skills" className="container-shell py-20 md:py-28">
      {/* ── Header ── */}
      <div className="mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          Capabilities
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
          Technical depth meets operational discipline
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[#64748b]">
          From FEA and CAD to project management and risk assessment — the full
          engineering toolkit.
        </p>
      </div>

      {/* ── Group cards ── */}
      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((group, i) => (
          <SkillGroupCard
            key={group.key}
            title={group.title}
            subtitle={group.subtitle}
            items={skillsByGroup[group.key]}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
