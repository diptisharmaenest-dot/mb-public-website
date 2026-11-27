'use client'

import { DISPLAY_HEADER_CLASS_PARTNERS_HERO, Section, SectionHeader, compactAccentLine } from '@/components'
import { JOIN_CONTENT_WIDTH } from './constants'

const JoinHero = () => {
  return (
    <Section flushTop className="bg-paper" innerClassName="pt-24 pb-8 md:pt-28 md:pb-10">
      <div className={`mx-auto ${JOIN_CONTENT_WIDTH} text-center`}>
        <SectionHeader
          as="h1"
          align="center"
          eyebrow="Kitchen Partner application"
          gradient="ink"
          animated={false}
          marginBottom="mb-0"
          className={DISPLAY_HEADER_CLASS_PARTNERS_HERO}
          description="Four simple steps to start. We look at your cooking and your kitchen — never your age or background."
          lines={[compactAccentLine({ text: "Let's get your kitchen", accent: 'verified.' })]}
        />
      </div>
    </Section>
  )
}

export default JoinHero
