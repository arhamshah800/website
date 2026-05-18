'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TurbofanWireframe } from '@/components/three/turbofan-wireframe'
import { motionTokens } from '@/motion/tokens'
import type { ProfileData } from '@/lib/data'

export function Hero({ profile }: { profile: ProfileData }) {
  const reduce = useReducedMotion()

  const stagger = reduce ? 0 : motionTokens.stagger.slow
  const duration = reduce ? 0 : motionTokens.duration.slow
  const entry = motionTokens.easing.entry

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ── 3D Wireframe Background ── */}
      <TurbofanWireframe className="pointer-events-none" />

      {/* ── Overlay gradients for readability ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0f1117]/40" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,#0f1117_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-[linear-gradient(to_top,#0f1117,transparent)]" />

      {/* ── Foreground Content ── */}
      <div className="container-shell relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0, ease: entry }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-[#bf5700]/80"
        >
          Aerospace Engineering Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0.12, ease: entry }}
          className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[1.08] tracking-tight text-[#f1f5f9] md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0.24, ease: entry }}
          className="mt-5 max-w-xl text-balance text-lg text-[#94a3b8] md:text-xl"
        >
          Aerospace Engineer — Structures &amp; Analysis
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0.3, ease: entry }}
          className="mt-2 text-sm text-[#64748b]"
        >
          The University of Texas at Austin
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0.42, ease: entry }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#projects">Explore Work</Button>
          <Button href={profile.resume ?? '/SpringResume.pdf'} variant="secondary">
            View Resume
          </Button>
          <Button href="#contact" variant="ghost">
            Get in Touch
          </Button>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: entry }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#64748b]">Scroll</span>
          <motion.div
            animate={reduce ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: motionTokens.easing.entry }}
            className="h-5 w-[1px] rounded-full bg-[#bf5700]/50"
          />
        </motion.div>
      </div>
    </section>
  )
}
