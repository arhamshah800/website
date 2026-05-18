export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="container-shell py-20 md:py-28">
      <div className="mb-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#bf5700]">
          {title}
        </p>
        {subtitle ? (
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-[#f1f5f9] md:text-4xl">
            {subtitle}
          </h2>
        ) : null}
      </div>
      {children}
    </section>
  )
}
