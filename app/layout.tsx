import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { CursorSpotlight } from '@/components/motion/cursor-spotlight'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { AdminBar } from '@/components/admin/admin-bar'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CursorSpotlight />
          <ScrollProgress />

          {/* ── Header ── */}
          <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0f1117]/75 backdrop-blur-xl">
            <div className="container-shell flex h-16 items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-[#f1f5f9] transition-colors hover:text-[#bf5700]"
              >
                Arham Shah
              </Link>

              {/* Nav */}
              <nav className="flex items-center gap-6 text-sm">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Contact CTA */}
                <Link
                  href="#contact"
                  className="ml-2 rounded-full border border-[#bf5700]/40 px-4 py-2 text-sm font-medium text-[#bf5700] transition-all hover:border-[#bf5700] hover:bg-[#bf5700]/10 hover:-translate-y-0.5"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </header>

          {/* ── Main ── */}
          <main className="relative z-10">{children}</main>

          {/* ── Admin Bar (visible only to logged-in CMS users) ── */}
          <AdminBar />

          {/* ── Footer ── */}
          <footer className="border-t border-[rgba(255,255,255,0.06)] py-10">
            <div className="container-shell flex flex-col items-center gap-3 text-sm text-[#64748b] md:flex-row md:justify-between">
              <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
              <div className="flex gap-5">
                <a href="mailto:arhamshah@utexas.edu" className="transition-colors hover:text-[#f1f5f9]">Email</a>
                <a href="https://www.linkedin.com/in/arhamjshah" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f1f5f9]">LinkedIn</a>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  )
}
