'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  compactAccentLine,
  DownloadAppButton,
  Section,
  SectionHeader,
} from '@/components'
import { kitchenStorefrontPreview } from '@/assets'

const KitchenDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const hasReducedMotion = !!prefersReducedMotion

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })

  // Scales from 0.8 up to 1.0 as the card enters the viewport center
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.0])

  return (
    <Section
      id="kitchen-dashboard"
      className="bg-surface"
      aria-labelledby="kitchen-dashboard-heading"
      fullWidth
    >
      <div>
        <SectionHeader
          eyebrow="Kitchen Dashboard"
          id="kitchen-dashboard-heading"
          align="left"
          gradient="olive"
          accent="text-partner"
          marginBottom="mb-10"
          className="min-w-0"
          lines={[
            compactAccentLine({
              text: `Your kitchen,`,
              accent: 'reimagined',
            }),
          ]}
          action={
            <DownloadAppButton source="home-v2-kitchen-dashboard" openLabel="Open the app" variant="partner" className="mt-8">
              See your kitchen store
            </DownloadAppButton>
          }
          description="From your own kitchen, with your name on every order. We handle customers, packaging, FSSAI registration and delivery — you cook."
        />
      </div>

      <motion.div
        ref={containerRef}
        style={{ scale: hasReducedMotion ? 1 : scale }}
        className="relative mx-auto w-full max-w-5xl lg:mx-0 origin-center overflow-hidden rounded-2xl border border-border-card shadow-lg"
      >
        <Image
          src={kitchenStorefrontPreview}
          alt="Kitchen Storefront Preview"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </Section>
  )
}

export default KitchenDashboard
