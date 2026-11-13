'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Section, SectionHeader, compactAccentLine } from '@/components'
import { ROUTES } from '@/shared/seo'
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
          marginBottom="mb-0"
          lines={[
            { text: 'Every Order Builds Trust In Home Food' },
            compactAccentLine({
              text: 'Every kitchen builds',
              accent: 'her independence.',
            }),
          ]}
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ROUTES.kitchens}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#F04444] to-[#CB1C1C] px-7 py-3 text-[15.5px] font-bold !text-white visited:!text-white shadow-[0_4px_14px_rgba(219,26,26,0.22)] transition-all hover:brightness-105 active:scale-95 no-underline"
          >
            Order home food
          </Link>

          <Link
            href={ROUTES.partners}
            className="inline-flex items-center justify-center rounded-2xl border border-[#E02B2B] bg-transparent px-7 py-3 text-[15.5px] font-bold !text-[#E02B2B] visited:!text-[#E02B2B] transition-all hover:bg-[#E02B2B]/8 active:scale-95 no-underline"
          >
            Start your kitchen
          </Link>
        </div>

        <p className="mt-6 text-[14px] font-normal  tracking-tight">
          Local customers · full support · cook at your own pace · typical partners earn ~₹30,000 a month (earnings vary)
        </p>
      </motion.div>
    </Section>
  )
}
