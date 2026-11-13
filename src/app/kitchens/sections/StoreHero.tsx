'use client'

import {
  DISPLAY_HEADER_CLASS_ABOUT_HERO,
  HEADER_TO_COPY_GAP,
  PROSE_MAX_WIDTH,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'

const StoreHeroSection = () => {
  return (
    <Section
      id="kitchens-hero"
      aria-labelledby="kitchens-hero-heading"
      flushTop
      className="border-b border-border-subtle bg-paper"
      innerClassName="pt-24 md:pt-28 pb-12 md:pb-16"
    >
      <div className="max-w-3xl">

        <SectionHeader
          id="kitchens-hero-heading"
          as="h1"
          align="left"
          eyebrow="Verified & near you"
          gradient="ink"
          animated={false}
          className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
          classNames={{ eyebrow: 'text-verified' }}
          lines={[
            { text: 'Verified home kitchens' },
            compactAccentLine({
              text: 'cooking near you',
              accent: 'this week.',
            }),
          ]}
        />

        <p
          className={`body-copy ${HEADER_TO_COPY_GAP} ${PROSE_MAX_WIDTH} !mx-0`}
        >
          Every kitchen below passed our 80-point audit — cooked fresh at home
          by verified chefs, with real faces and real stories. Pick a cuisine,
          explore menus, and order directly.
        </p>
      </div>
    </Section>
  )
}

export default StoreHeroSection
