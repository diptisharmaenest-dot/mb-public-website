'use client'

import { FiHeart, FiHome, FiUserCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'
import {
  CARD_GRID_GAP,
  CARD_PADDING,
  CARD_TITLE_TO_BODY_GAP,
  FEATURE_CARD,
  HEADER_TO_BODY_GAP,
  RADIUS_DEFAULT,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'

const BELIEFS = [
  {
    id: 'store',
    title: 'Her own store',
    body: 'Every cook on Mother Bhojan runs her own store — her name on the door, her menu, her prices.',
    icon: FiHome,
    tone: 'verified' as const,
  },
  {
    id: 'name',
    title: 'A name & a story',
    body: (
      <>
        Your food comes from a named chef —{' '}
        <span className="font-hand italic text-partner">never </span> an
        anonymous cloud kitchen. You see her face before you order.
      </>
    ),
    icon: FiUserCheck,
    tone: 'customer' as const,
  },
  {
    id: 'promise',
    title: "The Daughter's Promise",
    body: "Anything wrong with an order — a full refund, no questions asked. The way you'd want your own daughter treated.",
    icon: FiHeart,
    tone: 'customer' as const,
  },
] as const

const iconShell = {
  verified: 'bg-verified/15 text-verified-text',
  customer: 'bg-customer/12 text-customer',
} as const

const WhatWeBelieve = () => {
  return (
    <Section
      id="what-we-believe"
      aria-labelledby="what-we-believe-heading"
      className="bg-paper"
    >
      <SectionHeader
        id="what-we-believe-heading"
        align="left"
        eyebrow="What we believe"
        accent="text-verified-text"
        gradient="ink"
        animated={true}
        marginBottom={HEADER_TO_BODY_GAP}
        classNames={{
          eyebrow: 'text-verified-text',
        }}
        lines={[
          compactAccentLine({
            text: 'Three beliefs, not',
            accent: 'a manifesto.',
          }),
        ]}
      />

      <div className={`grid grid-cols-1 md:grid-cols-3 ${CARD_GRID_GAP}`}>
        {BELIEFS.map((belief, idx) => {
          const Icon = belief.icon
          return (
            <motion.article
              key={belief.id}
              initial={{ opacity: 0, scale: 0.91, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.14,
                type: 'spring',
                stiffness: 110,
                damping: 14,
              }}
              className={`${FEATURE_CARD} border border-border-card ${CARD_PADDING} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-customer/40 group`}
            >
              <motion.div
                initial={{ scale: 0.6, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.14 + 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
                className={`mb-s5 flex h-12 w-12 items-center justify-center ${RADIUS_DEFAULT} ${iconShell[belief.tone]} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </motion.div>
              <h3 className="text-h3 text-ink">{belief.title}</h3>
              <p className={`body-copy ${CARD_TITLE_TO_BODY_GAP} !text-text-500`}>
                {belief.body}
              </p>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}

export default WhatWeBelieve
