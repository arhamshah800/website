import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const base =
  'inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bf5700]'

const variants = {
  primary:
    'bg-[#bf5700] text-white hover:bg-[#d4650a] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(191,87,0,0.35)] active:translate-y-0',
  secondary:
    'border border-[rgba(255,255,255,0.14)] text-[#e2e8f0] hover:border-[#bf5700]/50 hover:text-[#bf5700] hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.05)]',
}

export function Button({ href, children, variant = 'primary' }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  )
}
