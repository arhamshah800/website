'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from '@/motion/tokens'

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionTokens.duration.base, delay, ease: motionTokens.easing.entry }}
    >
      {children}
    </motion.div>
  )
}
