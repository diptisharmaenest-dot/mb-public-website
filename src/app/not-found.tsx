import { Button, RADIUS_SECTION } from '@/components'
import { createPageMetadata, ROUTES } from '@/shared/seo'

export const metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist on Mother Bhojan.',
  noIndex: true,
})

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-mb-verified-section px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-24 top-14 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-yellow/20 blur-3xl" />

      <div className={`relative mx-auto max-w-4xl ${RADIUS_SECTION} border border-white/30 bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm md:p-12`}>
        <p className="text-5xl font-semibold text-partner md:text-6xl">Oops!</p>
        <h1 className="mt-2 font-jakarta text-5xl font-extrabold uppercase tracking-[0.02em] text-ink md:text-7xl">
          404
        </h1>
        <p className="body-copy mt-6">
          Looks like this recipe is missing from the menu.
        </p>
        <p className="body-copy-muted mt-2">
          The page you entered does not exist, or may have moved.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="customer">
            Back to Home
          </Button>
          <Button href={ROUTES.kitchens} variant="customerOutline">
            Browse Kitchens
          </Button>
        </div>
      </div>
    </section>
  )
}
