'use client'

import { motion, useScroll } from 'framer-motion'

/**
 * Reading progress bar that tracks document scroll.
 *
 * Uses framer-motion's useScroll() which listens to native scroll events.
 * Lenis 1.x (initialized without a wrapper element) updates native
 * window.scrollY on each RAF tick, so useScroll() picks up the smooth-scrolled
 * position naturally. If this ever jitters, try useScroll({ target: window }).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[9998] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #bf5700, #d4650a, #e87400)',
      }}
    />
  )
}
