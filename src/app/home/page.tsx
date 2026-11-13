import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import {
  Hero,
  WhyMotherBhojanExists,
  KitchenAudit,
  FeaturedKitchens,
  DaughtersPromise,
  FamiliesReview,
  EveryOrderChangesLives,
  YourNameOnTheDoor,
  WeHandleEverythingElse,
  BuildsTrustAndIndependence,
} from './sections'

export const metadata = createPageMetadata({
  title: 'Home',
  absoluteTitle: `${SITE_NAME} — Verified home food, delivered warm`,
  description:
    'Real kitchens. Real cooks. Every one verified on Mother Bhojan — order maa ke haath ka khaana in Mohali.',
  path: ROUTES.home,
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyMotherBhojanExists />
      <KitchenAudit />
      <FeaturedKitchens />
      <DaughtersPromise />
      <FamiliesReview />
      <EveryOrderChangesLives />
      <YourNameOnTheDoor />
      <WeHandleEverythingElse />
      <BuildsTrustAndIndependence />
    </>
  )
}
