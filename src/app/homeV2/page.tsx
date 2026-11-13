import { createPageMetadata, ROUTES, SITE_NAME } from '@/shared/seo'
import {
  Hero,
  WhyMotherBhojanExists,
  MeetOurMothers,
  FeaturedKitchens,
  CareTimeline,
  FamiliesReview,
  DaughtersPromise,
  EveryOrderChangesLives,
  PartnerBanner,
  KitchenDashboard,
  HomeFAQ,
  FloatingTrustBadge,
} from './sections'

export const metadata = createPageMetadata({
  title: 'Home v2',
  absoluteTitle: `${SITE_NAME} — Refined verified home food marketplace`,
  description:
    'Real kitchens. Real cooks. Every one verified on Mother Bhojan — order maa ke haath ka khaana in Mohali.',
  path: ROUTES.homev2,
})

export default function HomeV2() {
  return (
    <>
      <Hero />
      <WhyMotherBhojanExists />
      <MeetOurMothers />
      <FeaturedKitchens />
      <CareTimeline />
      <FamiliesReview />
      <DaughtersPromise />
      <EveryOrderChangesLives />
      <PartnerBanner />
      <KitchenDashboard />
      <HomeFAQ />
      <FloatingTrustBadge />
    </>
  )
}
