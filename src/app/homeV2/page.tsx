import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import HeroV2 from './sections/HeroV2'
import HowItWorksV2 from './sections/HowItWorksV2'
// Same sections as the main Home page.
import { DaughtersPromise, WeHandleEverythingElse, BuildsTrustAndIndependence } from '@/app/home/sections'

/*
 * Home — version 2 (new hero + "How it works" from the v2 mockups; the rest
 * matches the main Home page). The previous /homeV2 composition is in git
 * history; its section files are kept because other pages still use them.
 */

import LiveYourNameOnTheDoor from '@/app/home-shared/sections/YourNameOnTheDoor/LiveYourNameOnTheDoor'

/** Re-check the live kitchen list every 10 minutes (matches STORES_REVALIDATE_SECONDS). */
export const revalidate = 600

export const metadata = createPageMetadata({
  title: 'Home v2',
  absoluteTitle: `${SITE_NAME} — Verified home food, delivered warm`,
  description:
    'Real kitchens. Real cooks. Every one verified on Mother Bhojan — order maa ke haath ka khaana in Mohali.',
  path: ROUTES.homev2,
})

export default function HomeV2() {
  return (
    <>
      <HeroV2 />
      <HowItWorksV2 />
      {/* Appears automatically once the back-end has a real kitchen. */}
      <LiveYourNameOnTheDoor />
      <DaughtersPromise />
      <WeHandleEverythingElse />
      <BuildsTrustAndIndependence />
    </>
  )
}
