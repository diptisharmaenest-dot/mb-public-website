'use client'

import { useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import {
  compactAccentLine,
  DownloadAppButton,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'
import { FAMILY_JOURNEY, KITCHEN_JOURNEY, type HowItWorksJourney } from '@/app/home/data/how-it-works'

// Realistic step photos (no people), cropped from our own kitchen videos.
import f1Kitchen from '@/assets/images/how-it-works/f1-kitchen.jpg'
import f2Curry from '@/assets/images/how-it-works/f2-curry.jpg'
import f3Phone from '@/assets/images/how-it-works/f3-phone.jpg'
import f4Packed from '@/assets/images/how-it-works/f4-packed.jpg'
import k1Spices from '@/assets/images/how-it-works/k1-spices.jpg'
import k2Stove from '@/assets/images/how-it-works/k2-stove.jpg'
import k3Veg from '@/assets/images/how-it-works/k3-veg.jpg'
import k4Jar from '@/assets/images/how-it-works/k4-jar.jpg'

/**
 * "How Mother Bhojan works" — both journeys in parallel (as in the original
 * reference): home cooks on the left, families on the right, steps on a centre
 * spine. No auto-play: the spine fills and rows light up as you scroll.
 */

type StepPhoto = { src: StaticImageData; alt: string }
const PHOTOS: Record<HowItWorksJourney['id'], StepPhoto[]> = {
  kitchen: [
    { src: k1Spices, alt: 'A masala dabba spice box and rolled-out roti dough' },
    { src: k2Stove, alt: 'A home kitchen stove with a pressure cooker' },
    { src: k3Veg, alt: 'Fresh tomatoes, onions and greens ready to cook' },
    { src: k4Jar, alt: 'A Mother Bhojan branded jar on a kitchen table' },
  ],
  family: [
    { src: f1Kitchen, alt: 'A clean home kitchen with a stove, spices and fresh vegetables' },
    { src: f2Curry, alt: 'Kofta curry simmering in a pan' },
    { src: f3Phone, alt: 'The Mother Bhojan app showing order received and meal packed' },
    { src: f4Packed, alt: 'Meals packed in Mother Bhojan containers with fresh rotis' },
  ],
}

const STEPS = 4
/** Steps alternate brand green / brand red, like the reference markers. */
const tone = (i: number) => (i % 2 === 0 ? 'verified' : 'partner')
const CIRCLE = {
  verified: 'bg-gradient-to-br from-verified to-verified-dark',
  partner: 'bg-gradient-to-br from-customer to-partner',
} as const
const LINE = { verified: 'bg-verified', partner: 'bg-partner' } as const
const CHIP = { verified: 'bg-verified-pill text-verified-text', partner: 'bg-partner-tag text-partner' } as const

/** Lit-row count driven by scroll (all lit when reduced motion). */
function useScrollSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  const [lit, setLit] = useState(reduceMotion ? STEPS : 0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reduceMotion) setLit(Math.min(STEPS, Math.floor(v * (STEPS - 1) + 1.05)))
  })
  return { ref, fill: reduceMotion ? null : fill, lit }
}

/* ------------------------------ Step card --------------------------- */
function StepCard({
  journey,
  index,
  lit,
  side,
}: {
  journey: HowItWorksJourney
  index: number
  lit: boolean
  /** 'left' mirrors the card so its text faces the spine. */
  side: 'left' | 'right'
}) {
  const step = journey.steps[index]
  const photo = PHOTOS[journey.id][index]
  const t = tone(index)
  const mirrored = side === 'left'
  return (
    <article
      className={clsx(
        'group relative flex items-start gap-3.5 rounded-[22px] border bg-white p-4 sm:items-center sm:gap-5 transition-all duration-500 hover:-translate-y-1 sm:p-5',
        mirrored && 'lg:flex-row-reverse lg:text-right',
        lit
          ? 'border-border-card shadow-[0_22px_44px_-28px_rgba(42,31,24,0.5)]'
          : 'border-ink/5 opacity-60 shadow-none',
      )}
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] sm:h-28 sm:w-28 sm:rounded-[18px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="112px"
          className={clsx(
            'object-cover transition-all duration-700 group-hover:scale-110',
            lit ? 'grayscale-0' : 'grayscale-[70%]',
          )}
        />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="text-[17px] font-bold leading-snug tracking-tight text-ink sm:text-[18px]">{step.title}</h4>
        <p className="mt-1.5 text-[14px] leading-[1.55] text-ink/65 sm:text-[14.5px]">{step.body}</p>
        <span
          className={clsx(
            'mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-opacity duration-500',
            CHIP[t],
            lit ? 'opacity-100' : 'opacity-0',
          )}
        >
          <FiCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          {step.chip}
        </span>
      </div>
    </article>
  )
}

/* --------------------------- Step marker --------------------------- */
function StepMarker({ index, lit, size = 76 }: { index: number; lit: boolean; size?: number }) {
  const t = tone(index)
  return (
    <motion.span
      aria-hidden
      className={clsx(
        'relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full ring-[6px] ring-white transition-colors duration-500',
        lit ? clsx(CIRCLE[t], 'text-white shadow-[0_14px_28px_-12px_rgba(42,31,24,0.55)]') : 'bg-[#EFE8DD] text-ink/40',
      )}
      style={{ width: size, height: size }}
      animate={{ scale: lit ? 1 : 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="mb-1 font-hand text-[13px] leading-none">step</span>
      <span className="text-[22px] font-extrabold leading-none">{index + 1}</span>
    </motion.span>
  )
}

function ColumnTitle({ kicker, title, align }: { kicker: string; title: string; align: 'left' | 'right' | 'center' }) {
  return (
    <div className={clsx(align === 'left' && 'text-left', align === 'right' && 'text-right', align === 'center' && 'text-center')}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">{kicker}</p>
      <h3 className="mt-1 font-hand text-[30px] leading-tight text-ink sm:text-[34px]">{title}</h3>
    </div>
  )
}

/* ------------------- Desktop: side by side on a spine ---------------- */
const COLS = 'grid grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] items-center'

function ParallelSteps() {
  const { ref, fill, lit } = useScrollSteps()
  const left = KITCHEN_JOURNEY
  const right = FAMILY_JOURNEY
  return (
    <div ref={ref} className="relative hidden lg:block">
      {/* Spine */}
      <span aria-hidden className="absolute bottom-[70px] left-1/2 top-[118px] w-[3px] -translate-x-1/2 rounded-full bg-ink/8">
        <motion.span
          className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-verified via-customer to-partner"
          style={{ scaleY: fill ?? 1 }}
        />
      </span>
      <span aria-hidden className="absolute left-1/2 top-[100px] h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-white bg-verified shadow" />

      <div className={clsx(COLS, 'pb-10')}>
        <ColumnTitle kicker="How to" title="Open your kitchen" align="left" />
        <span />
        <ColumnTitle kicker="How to" title="Order home food" align="right" />
      </div>

      <ol className="space-y-8">
        {left.steps.map((s, i) => {
          const isLit = i < lit
          return (
            <li key={s.title} className={COLS}>
              <StepCard journey={left} index={i} lit={isLit} side="left" />
              <div className="flex items-center">
                <span aria-hidden className="relative h-[2px] flex-1 bg-ink/10">
                  <motion.span
                    className={clsx('absolute inset-0 origin-right', LINE[tone(i)])}
                    initial={false}
                    animate={{ scaleX: isLit ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
                <StepMarker index={i} lit={isLit} />
                <span aria-hidden className="relative h-[2px] flex-1 bg-ink/10">
                  <motion.span
                    className={clsx('absolute inset-0 origin-left', LINE[tone(i)])}
                    initial={false}
                    animate={{ scaleX: isLit ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
              </div>
              <StepCard journey={right} index={i} lit={isLit} side="right" />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* -------------- Phones/tablets: each step shows both sides ---------- */
function StackedSteps() {
  const { ref, fill, lit } = useScrollSteps()
  return (
    <div ref={ref} className="relative lg:hidden">
      <span aria-hidden className="absolute bottom-24 left-[25px] top-6 w-[3px] rounded-full bg-ink/8 sm:left-[33px]">
        <motion.span
          className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-verified via-customer to-partner"
          style={{ scaleY: fill ?? 1 }}
        />
      </span>
      <ol className="space-y-8">
        {KITCHEN_JOURNEY.steps.map((s, i) => {
          const isLit = i < lit
          return (
            <li key={s.title} className="relative flex gap-3 sm:gap-5">
              <div className="pt-1">
                <StepMarker index={i} lit={isLit} size={54} />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink/45">Home cook</p>
                <StepCard journey={KITCHEN_JOURNEY} index={i} lit={isLit} side="right" />
                <p className="pt-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink/45">Family</p>
                <StepCard journey={FAMILY_JOURNEY} index={i} lit={isLit} side="right" />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
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

      <ParallelSteps />
      <StackedSteps />

      <div className="mt-12 flex justify-center">
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>
    </Section>
  )
}
