import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import {
  Hero,
  HowItWorks,
  DaughtersPromise,
  FamiliesReview,
  EveryOrderChangesLives,
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
      {/* Hidden for now — re-add the import and uncomment to show again:
          <WhyMotherBhojanExists />  (Sunita — "The hands behind your meal")
          <KitchenAudit />           ("Sunita's kitchen passed the audit")
          <FeaturedKitchens />       ("Cooking near you this week")
          <YourNameOnTheDoor />      ("Your kitchen, your name on the door") */}
      <HowItWorks />
      <DaughtersPromise />
      <FamiliesReview />
      <EveryOrderChangesLives />
      <WeHandleEverythingElse />
      <BuildsTrustAndIndependence />
    </>
  )
}
