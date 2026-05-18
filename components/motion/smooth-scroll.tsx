'use client'

import { useLayoutEffect } from 'react'
import Lenis from 'lenis'
import type { ReactNode } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      instance.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
    }
  }, [])

  return children
}
