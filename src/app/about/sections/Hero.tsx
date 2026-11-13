'use client'

import {
  DISPLAY_HEADER_CLASS_ABOUT_HERO,
  HEADER_TO_COPY_GAP,
  PROSE_MAX_WIDTH,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'

const AboutHero = () => {
  return (
    <Section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      flushTop
      className="border-b border-border-subtle bg-paper"
      innerClassName="pt-24 md:pt-28 pb-12 md:pb-16"
    >
      <div className="max-w-3xl">


        <SectionHeader
          id="about-hero-heading"
          as="h1"
          align="left"
          eyebrow="From the founders"
          gradient="ink"
          animated={false}
          marginBottom="mb-0"
          className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
          classNames={{ eyebrow: 'text-verified' }}
          lines={[
            { text: 'Home food deserved' },
            compactAccentLine({
              text: '',
              accent: 'a name.',
            }),
          ]}
        />

        <p
          className={`body-copy ${HEADER_TO_COPY_GAP} ${PROSE_MAX_WIDTH} !mx-0`}
        >
          For years, the best meals in every neighbourhood came from kitchens
          nobody knew. We simply gave them a name.
        </p>

        <div className="mt-6 sm:mt-7 border-l-2 border-customer/40 pl-4">
          <p className="font-hand text-[20px] sm:text-[22px] font-normal text-ink/80 leading-snug">
            Jagdeep Chawla &amp; Amar Jyoti Chawla
          </p>
          <p className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.2em] text-ink/40 mt-0.5">
            Founders, Mother Bhojan
          </p>
        </div>
      </div>
    </Section>
  )
}

export default AboutHero
