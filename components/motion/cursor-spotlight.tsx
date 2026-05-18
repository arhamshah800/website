'use client'

import { useEffect, useState } from 'react'

export function CursorSpotlight() {
  const [xy, setXy] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const mediaFine = window.matchMedia('(pointer:fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mediaFine || reduce) return
    const move = (event: MouseEvent) => setXy({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(420px circle at ${xy.x}px ${xy.y}px, rgba(191,87,0,0.10), transparent 50%)`,
      }}
    />
  )
}
