'use client'

import { motion } from 'framer-motion'
import {
  DownloadAppButton,
  compactAccentLine,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'

export default function FamiliesReview() {
  return (
    <Section
      id="reviews"
      className="bg-paper"
      aria-labelledby="dinner-tonight-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto flex flex-col items-center justify-center text-center"
      >
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#FFF0D4] px-4 py-1.5 text-xs font-semibold text-ink shadow-sm sm:text-[13px]">
          <span className="text-[#D97706]" aria-hidden>
            ★
          </span>
          <span>4.8 average · 2,400+ orders delivered warm</span>
        </div>

        <SectionHeader
          id="dinner-tonight-heading"
          align="center"
          gradient="ink"
          marginBottom={HEADER_TO_SUBROW_GAP}
          animated={false}
          lines={[
            { text: 'Dinner tonight,' },
            compactAccentLine({
              text: 'from kitchen you can',
              accent: 'trust.',
            }),
          ]}
        />

        <DownloadAppButton source="home-families-review" openLabel="Order now" variant="customer">
          Order now
        </DownloadAppButton>
      </motion.div>
    </Section>
  )
}
