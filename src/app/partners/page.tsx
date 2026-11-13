import { createPageMetadata, ROUTES } from '@/shared/seo'
// Intentionally homeV2's copy — the self-contained, zero-prop closing CTA (earnings line + "Become a Kitchen Partner" button to /join).
import PartnerBanner from '@/app/homeV2/sections/PartnerBanner'
// Intentionally homeV3's copy (not homeV2's near-duplicate) — this one is wired to the canonical shared mothers dataset.
import MeetOurMothers from '@/app/homeV3/sections/MeetOurMothers'
import Flexibility from './sections/Flexibility'
import SolutionsHero from './sections/SolutionsHero'
import ScaleOperation from './sections/ScaleOperation'
import SoloKitchen from './sections/SoloKitchen'

export const metadata = createPageMetadata({
  title: 'For Partners',
  description:
    'Become a Kitchen Partner on Mother Bhojan — solutions for solo kitchens, scaling operations, and flexible selling whether you cook full-time or occasionally.',
  path: ROUTES.partners,
})

export default function Page() {
  return (
    <div className="bg-white">
      <SolutionsHero />
      <SoloKitchen />
      <ScaleOperation />
      <Flexibility />
      <MeetOurMothers />
      <PartnerBanner />
    </div>
  )
}
