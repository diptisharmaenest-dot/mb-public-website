'use client'

import { motion } from 'framer-motion'
import {
  Button,
  PROSE_MAX_WIDTH,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'
import { ROUTES } from '@/shared/seo'

const WomenWhoCook = () => {
  return (
    <Section
      id="women-who-cook"
      aria-labelledby="women-who-cook-heading"
    >
      {/* Soft warm background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[min(500px,100%)] rounded-full bg-customer/5 blur-[80px]"
      />

      <SectionHeader
        id="women-who-cook-heading"
        align="center"
        eyebrow="The women who cook"
        gradient="ink"
        animated={true}
        lines={[
          compactAccentLine({
            text: "The heart of Mother Bhojan isn't us —",
            accent: "it's them.",
          }),
        ]}
      />

      {/* Warm Editorial Blur Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.96, y: 15 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 mx-auto text-center ${PROSE_MAX_WIDTH}`}
      >
        <p className="body-copy font-medium text-ink/85 leading-relaxed text-[17px] sm:text-[19px]">
          Behind every order is a real woman cooking from her own home kitchen —
          with her name, her recipes, and her story. They are the reason Mother
          Bhojan exists.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 inline-block"
        >
          <Button
            href={ROUTES.kitchens}
            variant="partnerOutline"
            className="shrink-0 self-start sm:self-center hover:scale-105 transition-transform duration-300"
          >
            See all kitchens
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default WomenWhoCook
