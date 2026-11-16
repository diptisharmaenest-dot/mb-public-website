'use client'

import { motion } from 'framer-motion'
import { LuChefHat } from 'react-icons/lu'
import { DownloadAppButton, Section, SectionHeader, compactAccentLine, HEADER_TO_SUBROW_GAP } from '@/components'
import { EASE } from '@/shared/lib/motion'

export default function BuildsTrustAndIndependence() {
  return (
    <Section
      id="builds-independence"
      aria-labelledby="builds-independence-heading"
      className="bg-[#F8D878]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto flex w-full flex-col items-center text-center px-4"
      >
        <SectionHeader
          id="builds-independence-heading"
          align="center"
          solid="ink"
          marginBottom={HEADER_TO_SUBROW_GAP}
          lines={[
            { text: 'Every order builds trust in home food.' },
            compactAccentLine({
              text: 'Every kitchen builds',
              accent: 'her independence.',
            }),
          ]}
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <DownloadAppButton
            source="home-bottom-banner"
            openLabel="Order now"
            variant="none"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-b from-[#F04444] to-[#CB1C1C] px-7 py-3 text-[15.5px] font-bold !text-white shadow-[0_4px_14px_rgba(219,26,26,0.22)] transition-all hover:brightness-105 active:scale-95"
          >
            Order now
          </DownloadAppButton>

          {/* Kitchen-owner CTA — app popup until the kitchen app is live */}
          <DownloadAppButton
            source="home-bottom-banner-kitchen"
            openLabel="Open the app"
            variant="none"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-verified-dark bg-white/70 px-7 py-[10px] text-[15.5px] font-bold !text-ink transition-all hover:bg-white active:scale-95"
          >
            <LuChefHat className="h-5 w-5 text-verified-dark" aria-hidden />
            Open your kitchen
          </DownloadAppButton>
        </div>

        <p className="mt-6 text-[14px] font-normal  tracking-tight">
          Verified home kitchens · cooked fresh · delivered warm in Mohali
        </p>
      </motion.div>
    </Section>
  )
}
