'use client'

import {
  DISPLAY_HEADER_CLASS_ABOUT_HERO,
  HEADER_TO_COPY_GAP,
  PROSE_MAX_WIDTH,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'

const ContactHero = () => {
  return (
    <Section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      flushTop
      className="border-b border-border-subtle bg-yellow/10"
      innerClassName="pt-24 md:pt-28 pb-12 md:pb-16"
    >
      <div className="max-w-3xl">
        <SectionHeader
          id="contact-hero-heading"
          as="h1"
          align="left"
          eyebrow="Contact us"
          gradient="ink"
          animated={false}
          marginBottom="mb-0"
          className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
          classNames={{ eyebrow: 'text-verified' }}
          lines={[
            { text: "We're here" },
            compactAccentLine({ text: '', accent: 'to help.' }),
          ]}
        />

        <p className={`body-copy ${HEADER_TO_COPY_GAP} ${PROSE_MAX_WIDTH} !mx-0`}>
          A question about an order, or thinking of opening your kitchen? Write
          to us. A real person reads every message, and we usually reply within
          one working day.
        </p>
      </div>
    </Section>
  )
}

export default ContactHero
