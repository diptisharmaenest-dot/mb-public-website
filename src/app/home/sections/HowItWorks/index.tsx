'use client'

import type { ComponentType } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FiCamera, FiCheckSquare, FiChevronRight, FiCreditCard, FiMapPin } from 'react-icons/fi'
import { LuBike, LuShieldCheck, LuStore, LuUtensils } from 'react-icons/lu'
import {
  compactAccentLine,
  DownloadAppButton,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'
import { FAMILY_JOURNEY, KITCHEN_JOURNEY } from '@/app/home/data/how-it-works'

/**
 * "How Mother Bhojan works" — static and scannable (no auto-play):
 * families get the main 4-step row; home cooks get a separate band below.
 */

type IconType = ComponentType<{ className?: string }>
const FAMILY_ICONS: IconType[] = [FiMapPin, LuUtensils, FiCreditCard, LuBike]
const KITCHEN_ICONS: IconType[] = [FiCheckSquare, FiCamera, LuShieldCheck, LuStore]

/** Alternating brand tints for the step tiles. */
const TILE = [
  'bg-gradient-to-br from-[#FDEBE8] to-[#F9D8D3] text-partner',
  'bg-gradient-to-br from-[#EEF2E3] to-[#DCE5C6] text-verified-text',
] as const

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, ease: EASE, delay: 0.12 * i },
})

/* ------------------------- Families: main row ------------------------ */
function FamilySteps() {
  return (
    <div className="relative">
      {/* Dashed connector through the tiles (desktop) */}
      <motion.span
        aria-hidden
        className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-0 origin-left border-t-2 border-dashed border-ink/15 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      {/* Vertical connector (phones) */}
      <span aria-hidden className="absolute bottom-10 left-12 top-12 border-l-2 border-dashed border-ink/15 sm:hidden" />

      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-6">
        {FAMILY_JOURNEY.steps.map((step, i) => {
          const Icon = FAMILY_ICONS[i]
          return (
            <motion.li
              key={step.title}
              {...reveal(i)}
              className="group flex items-start gap-5 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              <div className="relative shrink-0">
                <span
                  className={clsx(
                    'flex h-24 w-24 items-center justify-center rounded-[28px] shadow-[0_16px_32px_-18px_rgba(42,31,24,0.45)] ring-[6px] ring-white transition-transform duration-300 group-hover:-translate-y-1',
                    TILE[i % 2],
                  )}
                >
                  <Icon className="h-9 w-9" />
                </span>
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white ring-4 ring-white">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 pt-2 sm:mt-6 sm:pt-0">
                <h3 className="text-[19px] font-bold leading-snug tracking-tight text-ink">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-[1.55] text-ink/65 sm:max-w-[240px]">
                  {step.body}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

/* ------------------------- Home cooks: band ------------------------- */
function KitchenBand() {
  return (
    <motion.div
      {...reveal(0)}
      className="relative mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#5f7a33] via-[#56702e] to-[#455b24] px-6 py-10 text-white sm:px-10 lg:mt-20 lg:px-12 lg:py-12"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] [background-size:20px_20px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />
      <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-yellow/20 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:items-center lg:gap-12">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">For home cooks</p>
          <h3 className="mt-2 font-hand text-[34px] leading-tight text-white sm:text-[38px]">Want to cook from home?</h3>
          <p className="mt-3 max-w-[340px] text-[15px] leading-[1.55] text-white/80">
            Open your kitchen in your own name. Here&rsquo;s how you join.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KITCHEN_JOURNEY.steps.map((step, i) => {
            const Icon = KITCHEN_ICONS[i]
            return (
              <motion.li
                key={step.title}
                {...reveal(i + 1)}
                className="relative rounded-[20px] bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-bold text-verified-text">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-white/70" />
                </div>
                <h4 className="mt-4 text-[16px] font-bold leading-snug">{step.title}</h4>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-white/75">{step.body}</p>
                {i < 3 ? (
                  <FiChevronRight
                    aria-hidden
                    className="absolute -right-[13px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-[#56702e] text-white/80 lg:block"
                  />
                ) : null}
              </motion.li>
            )
          })}
        </ol>
      </div>
    </motion.div>
  )
}

/* ------------------------------ Section ---------------------------- */
export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-white" aria-labelledby="how-it-works-heading">
      <SectionHeader
        eyebrow="How it works"
        id="how-it-works-heading"
        align="center"
        marginBottom={HEADER_TO_SUBROW_GAP}
        classNames={{ eyebrow: 'text-verified-text' }}
        gradient="ink"
        lines={[compactAccentLine({ text: 'How Mother Bhojan', accent: 'works.' })]}
      />

      <p className="-mt-4 mb-12 text-center text-[15px] font-medium text-ink/55 lg:mb-14">
        Home food in four simple steps
      </p>

      <FamilySteps />

      <div className="mt-12 flex justify-center">
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>

      <KitchenBand />
    </Section>
  )
}
