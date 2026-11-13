import { createPageMetadata, ROUTES } from '@/shared/seo'
import {
  AboutHero,
  FoundersPortraits,
  WomenWhoCook,
  WhatWeBelieve,
  TheTeam,
  CompanyClosing,
  EndCta,
} from './sections'

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'Why we started Mother Bhojan: home food deserved a name. A verified, women-led home-food marketplace, a brand of Womro Solutions Private Limited.',
  path: ROUTES.about,
})

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FoundersPortraits />
      <WhatWeBelieve />
      <WomenWhoCook />
      <TheTeam />
      <CompanyClosing />
      <EndCta />
    </>
  )
}
