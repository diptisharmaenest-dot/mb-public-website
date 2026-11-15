import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import {
  Hero,
  HowItWorks,
  DaughtersPromise,
  WeHandleEverythingElse,
  BuildsTrustAndIndependence,
} from './sections'

import LiveYourNameOnTheDoor from '@/app/home-shared/sections/YourNameOnTheDoor/LiveYourNameOnTheDoor'

/** Re-check the live kitchen list every 10 minutes (matches STORES_REVALIDATE_SECONDS). */
export const revalidate = 600

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
          <FamiliesReview />         ("Dinner tonight, from kitchen you can trust")
          <EveryOrderChangesLives /> ("Every order has two sides") */}
      <HowItWorks />
      {/* Appears automatically once the back-end has a real kitchen. */}
      <LiveYourNameOnTheDoor design="classic" />
      <DaughtersPromise />
      <WeHandleEverythingElse />
      <BuildsTrustAndIndependence />
    </>
  )
}
