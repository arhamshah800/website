'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ── Floating Admin Bar ──
// Appears at the bottom of the screen when a user is logged into Payload CMS.
// Provides quick access to the admin panel and context-aware edit links.
// Not rendered at all for regular visitors — invisible to the public.

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || '/admin'

export function AdminBar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check auth status on mount
    fetch('/api/auth-check')
      .then((res) => res.json())
      .then((data: { loggedIn: boolean }) => {
        setLoggedIn(data.loggedIn)
        if (data.loggedIn) {
          // Slight delay for smooth entrance
          requestAnimationFrame(() => setVisible(true))
        }
      })
      .catch(() => setLoggedIn(false))
  }, [])

  if (!loggedIn) return null

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-[#bf5700]/30 bg-[#0f1117]/95 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-4 text-xs font-medium">
        {/* Admin badge */}
        <span className="flex items-center gap-1.5 rounded-full bg-[#bf5700]/10 px-2.5 py-1 text-[#bf5700]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#bf5700] animate-pulse" />
          Admin
        </span>

        {/* Quick links */}
        <Link
          href={`${ADMIN_URL}/collections/projects`}
          className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
        >
          Projects
        </Link>
        <Link
          href={`${ADMIN_URL}/collections/experiences`}
          className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
        >
          Experiences
        </Link>
        <Link
          href={`${ADMIN_URL}/collections/skills`}
          className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
        >
          Skills
        </Link>
        <Link
          href={`${ADMIN_URL}/collections/certifications`}
          className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
        >
          Certs
        </Link>
        <Link
          href={`${ADMIN_URL}/globals/profile`}
          className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
        >
          Profile
        </Link>

        {/* Divider */}
        <span className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />

        {/* Main admin link */}
        <Link
          href={ADMIN_URL}
          className="rounded-full bg-[#bf5700] px-3 py-1 text-white transition-all hover:bg-[#d4650a] hover:shadow-[0_0_16px_rgba(191,87,0,0.4)]"
        >
          Open Admin
        </Link>
      </div>
    </div>
  )
}
