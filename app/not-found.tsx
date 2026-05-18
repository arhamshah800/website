import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#bf5700]">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#f1f5f9] md:text-5xl">
        Orbit not found
      </h1>
      <p className="mt-4 max-w-md text-sm text-[#64748b]">
        The trajectory you&apos;re looking for doesn&apos;t exist. Return to base and try a different heading.
      </p>
      <div className="mt-8">
        <Button href="/" variant="secondary">
          ← Return Home
        </Button>
      </div>
    </section>
  )
}
