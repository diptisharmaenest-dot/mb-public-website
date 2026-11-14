'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  compactAccentLine,
  DownloadAppButton,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'
import {
  FAMILY_JOURNEY,
  KITCHEN_JOURNEY,
  type HowItWorksJourney,
  type HowItWorksStep,
} from '@/app/home/data/how-it-works'

/** Odd steps green (verified), even steps red (brand) — mirrors the alternating reference. */
const stepTone = (i: number) => (i % 2 === 0 ? 'verified' : 'partner')

const CIRCLE_TONE = {
  verified: 'bg-gradient-to-b from-verified to-verified-dark shadow-[0_8px_20px_-6px_rgba(111,138,62,0.55)]',
  partner: 'bg-gradient-to-b from-customer to-partner shadow-[0_8px_20px_-6px_rgba(219,26,26,0.45)]',
} as const

const CONNECTOR_TONE = { verified: 'bg-verified', partner: 'bg-partner' } as const

function StepCircle({ index, size = 'lg' }: { index: number; size?: 'lg' | 'sm' }) {
  return (
    <span
      className={clsx(
        'relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full text-white ring-4 ring-paper',
        CIRCLE_TONE[stepTone(index)],
        size === 'lg' ? 'h-[76px] w-[76px]' : 'h-12 w-12',
      )}
      aria-hidden
    >
      {size === 'lg' ? <span className="mb-1 font-hand text-[14px] leading-none">step</span> : null}
      <span className={clsx('font-extrabold leading-none', size === 'lg' ? 'text-[22px]' : 'text-[18px]')}>
        {index + 1}
      </span>
    </span>
  )
}

function JourneyTitle({ journey, align }: { journey: HowItWorksJourney; align: 'left' | 'right' | 'center' }) {
  return (
    <div className={clsx(align === 'right' && 'text-right', align === 'center' && 'text-center')}>
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-verified-text">{journey.kicker}</p>
      <h3 className="mt-1 font-hand text-[30px] leading-tight text-ink sm:text-[34px]">{journey.title}</h3>
    </div>
  )
}

function StepText({ step, align }: { step: HowItWorksStep; align: 'left' | 'right' }) {
  return (
    <div className={clsx('max-w-[360px]', align === 'right' && 'ml-auto text-right')}>
      <h4 className="text-[19px] font-bold leading-snug tracking-tight text-ink">{step.title}</h4>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-ink/65">{step.body}</p>
    </div>
  )
}

/** Desktop: kitchen journey left, family journey right, shared centre spine. */
function DesktopTimeline() {
  return (
    <div className="relative hidden lg:block">
      {/* centre spine + top dot */}
      <div aria-hidden className="absolute bottom-0 left-1/2 top-2 w-px -translate-x-1/2 bg-border" />
      <div aria-hidden className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-verified" />

      <div className="grid grid-cols-[1fr_76px_1fr] gap-x-10 pt-6">
        <JourneyTitle journey={KITCHEN_JOURNEY} align="left" />
        <span />
        <JourneyTitle journey={FAMILY_JOURNEY} align="right" />
      </div>

      <ol className="mt-12 space-y-14">
        {KITCHEN_JOURNEY.steps.map((kStep, i) => {
          const fStep = FAMILY_JOURNEY.steps[i]
          const tone = CONNECTOR_TONE[stepTone(i)]
          return (
            <motion.li
              key={kStep.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
              className="relative grid grid-cols-[1fr_76px_1fr] items-center gap-x-10"
            >
              {/* connector stubs, offset like the reference */}
              <span aria-hidden className={clsx('absolute right-1/2 h-0.5 w-[88px] -translate-y-3', tone)} />
              <span aria-hidden className={clsx('absolute left-1/2 h-0.5 w-[88px] translate-y-3', tone)} />
              <StepText step={kStep} align="left" />
              <StepCircle index={i} />
              <StepText step={fStep} align="right" />
            </motion.li>
          )
        })}
      </ol>

      <div className="mt-12 flex justify-end">
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>
    </div>
  )
}

/** Phones/tablets: each journey as its own vertical list. Families first (primary audience). */
function MobileJourney({ journey, withCta }: { journey: HowItWorksJourney; withCta?: boolean }) {
  return (
    <div>
      <JourneyTitle journey={journey} align="left" />
      <ol className="relative mt-6 space-y-7">
        <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-border" />
        {journey.steps.map((step, i) => (
          <li key={step.title} className="relative flex items-start gap-4">
            <StepCircle index={i} size="sm" />
            <div className="pt-1">
              <h4 className="text-[17px] font-bold leading-snug tracking-tight text-ink">{step.title}</h4>
              <p className="mt-1 text-[14.5px] leading-[1.55] text-ink/65">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {withCta ? (
        <DownloadAppButton
          source="home-how-it-works"
          openLabel="Order now"
          variant="customer"
          size="md"
          fullWidth
          className="mt-7 sm:w-auto sm:px-8"
        >
          Order now
        </DownloadAppButton>
      ) : null}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-paper" aria-labelledby="how-it-works-heading">
      <SectionHeader
        eyebrow="How it works"
        id="how-it-works-heading"
        align="center"
        marginBottom={HEADER_TO_SUBROW_GAP}
        classNames={{ eyebrow: 'text-verified-text' }}
        gradient="ink"
        lines={[compactAccentLine({ text: 'How Mother Bhojan', accent: 'works.' })]}
      />

      <DesktopTimeline />

      <div className="space-y-14 lg:hidden">
        <MobileJourney journey={FAMILY_JOURNEY} withCta />
        <div className="h-px bg-border-subtle" aria-hidden />
        <MobileJourney journey={KITCHEN_JOURNEY} />
      </div>
    </Section>
  )
}
