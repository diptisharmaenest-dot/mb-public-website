'use client'

import {
  DISPLAY_HEADER_CLASS_ABOUT_HERO,
  HEADER_TO_COPY_GAP,
  PROSE_MAX_WIDTH,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'

const FaqHero = () => {
  return (
    <Section
      id="faq-hero"
      aria-labelledby="faq-hero-heading"
      flushTop
      className="border-b border-border-subtle bg-yellow/10"
      innerClassName="pt-24 md:pt-28 pb-12 md:pb-16"
    >
      <div className="max-w-3xl">


        <SectionHeader
          id="faq-hero-heading"
          as="h1"
          align="left"
          eyebrow="Got questions"
          gradient="ink"
          animated={false}
          marginBottom="mb-0"
          className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
          classNames={{ eyebrow: 'text-verified' }}
          lines={[
            { text: 'Answers for' },
            compactAccentLine({
              text: 'families &',
              accent: 'partners.',
            }),
          ]}
        />

        <p
          className={`body-copy ${HEADER_TO_COPY_GAP} ${PROSE_MAX_WIDTH} !mx-0`}
        >
          Ordering from a verified kitchen or cooking from home — here are the
          questions we hear most. Still stuck? Reach out and we&apos;ll help.
        </p>
      </div>
    </Section>
  )
}

export default FaqHero
