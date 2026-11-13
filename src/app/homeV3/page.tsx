import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import {
  Hero,
  WhyMotherBhojanExists,
  KitchenAudit,
  MeetOurMothers,
  FeaturedKitchens,
  CareTimeline,
  DaughtersPromise,
  FamiliesReview,
  EveryOrderChangesLives,
  YourNameOnTheDoor,
  WeHandleEverythingElse,
  BuildsTrustAndIndependence,
} from './sections'

export const metadata = createPageMetadata({
  title: 'Home v3',
  absoluteTitle: `${SITE_NAME} — Verified home food, delivered warm`,
  description:
    'Real kitchens. Real cooks. Every one verified on Mother Bhojan — order maa ke haath ka khaana in Mohali.',
  path: ROUTES.homev3,
})

export default function HomeV3() {
  return (
    <>
      <Hero />
      <WhyMotherBhojanExists />
      <KitchenAudit />
      <MeetOurMothers />
      <FeaturedKitchens />
      <CareTimeline />
      <DaughtersPromise />
      <FamiliesReview />
      <EveryOrderChangesLives />
      <YourNameOnTheDoor />
      <WeHandleEverythingElse />
      <BuildsTrustAndIndependence />
    </>
  )
}
