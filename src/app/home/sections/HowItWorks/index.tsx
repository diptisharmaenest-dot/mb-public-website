'use client'

import { useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
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
import f3Dal from '@/assets/images/how-it-works/f3-dal.jpg'
// Rendered with the real Mother Bhojan logo files (no people, no tiffin).
import f4Bag from '@/assets/images/how-it-works/f4-bag.jpg'
import k1App from '@/assets/images/how-it-works/k1-app.jpg'
import k2Verified from '@/assets/images/how-it-works/k2-verified.jpg'
import k3Spices from '@/assets/images/how-it-works/k1-spices.jpg'
import k4Call from '@/assets/images/how-it-works/k4-call.jpg'

/**
 * "How Mother Bhojan works" — both journeys side by side (families left,
 * home cooks right) on a centre spine. Only ONE journey is in focus at a time:
 * pick it with the switch (or click the faded column). The focused journey
 * lights up step by step as you scroll; the other stays faded. No auto-play.
 */

type JourneyId = HowItWorksJourney['id']
type StepPhoto = { src: StaticImageData; alt: string }
const PHOTOS: Record<JourneyId, StepPhoto[]> = {
  family: [
    { src: f1Kitchen, alt: 'A clean home kitchen with a stove, spices and fresh vegetables' },
    { src: f2Curry, alt: 'Kofta curry simmering in a pan' },
    { src: f3Dal, alt: 'Fresh dal steaming in a brass pot' },
    { src: f4Bag, alt: 'A kraft paper delivery bag with the Mother Bhojan logo' },
  ],
  kitchen: [
    { src: k1App, alt: 'The Mother Bhojan app open on a phone' },
    { src: k2Verified, alt: 'The Mother Bhojan app showing green check marks' },
    { src: k3Spices, alt: 'A masala dabba spice box and rolled-out roti dough' },
    { src: k4Call, alt: 'A phone showing an incoming call from the Mother Bhojan team' },
  ],
}

const JOURNEYS: Record<JourneyId, HowItWorksJourney> = { family: FAMILY_JOURNEY, kitchen: KITCHEN_JOURNEY }
const ORDER: JourneyId[] = ['family', 'kitchen']
const STEPS = 4

/** Each journey has one accent colour, so the focused side reads as one story. */
const ACCENT = {
  family: {
    circle: 'bg-gradient-to-br from-customer to-partner',
    line: 'bg-partner',
    spine: 'from-customer to-partner',
    chip: 'bg-partner-tag text-partner',
  },
  kitchen: {
    circle: 'bg-gradient-to-br from-verified to-verified-dark',
    line: 'bg-verified',
    spine: 'from-verified to-verified-dark',
    chip: 'bg-verified-pill text-verified-text',
  },
} as const

/** Lit-row count for the focused journey, driven by scroll. */
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

/* ------------------------------ Switch ------------------------------ */
function JourneySwitch({ value, onChange }: { value: JourneyId; onChange: (id: JourneyId) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Choose a journey"
      className="mx-auto flex w-full max-w-[520px] rounded-full border border-border-subtle bg-surface p-1.5 shadow-[inset_0_1px_2px_rgba(42,31,24,0.06)]"
    >
      {ORDER.map((id) => {
        const j = JOURNEYS[id]
        const selected = value === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(id)}
            className={clsx(
              'relative flex-1 cursor-pointer rounded-full px-3 py-3 text-[14px] font-semibold transition-colors sm:text-[15px]',
              selected ? 'text-white' : 'text-ink/60 hover:text-ink',
            )}
          >
            {selected ? (
              <motion.span
                layoutId="hiw-switch-pill"
                className={clsx('absolute inset-0 rounded-full shadow-[0_8px_18px_-8px_rgba(42,31,24,0.45)]', ACCENT[id].circle)}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            ) : null}
            <span className="relative sm:hidden">{j.tabShort}</span>
            <span className="relative hidden sm:inline">{j.tabLabel}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------ Step card --------------------------- */
function StepCard({
  id,
  index,
  focused,
  lit,
  mirrored,
  onFocusJourney,
}: {
  id: JourneyId
  index: number
  /** This card's journey is the one in focus. */
  focused: boolean
  /** Step reached while scrolling (only matters when focused). */
  lit: boolean
  mirrored?: boolean
  onFocusJourney?: () => void
}) {
  const step = JOURNEYS[id].steps[index]
  const photo = PHOTOS[id][index]
  const on = focused && lit
  const Tag = focused ? 'div' : 'button'
  return (
    <Tag
      {...(focused ? {} : { type: 'button' as const, onClick: onFocusJourney, 'aria-label': `Show steps: ${JOURNEYS[id].title}` })}
      className={clsx(
        'group relative flex w-full items-start gap-3.5 rounded-[22px] border bg-white p-4 text-left transition-all duration-500 sm:items-center sm:gap-5 sm:p-5',
        mirrored && 'lg:flex-row-reverse lg:text-right',
        !focused && 'cursor-pointer',
        on
          ? 'border-border-card shadow-[0_22px_44px_-28px_rgba(42,31,24,0.5)]'
          : focused
            ? 'border-ink/8 opacity-75'
            : 'border-ink/5 opacity-40 hover:opacity-70',
      )}
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] sm:h-28 sm:w-28 sm:rounded-[18px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="112px"
          className={clsx('object-cover transition-all duration-700 group-hover:scale-105', on ? 'grayscale-0' : 'grayscale')}
        />
      </span>
      <span className="block min-w-0 flex-1">
        <span className="block text-[17px] font-bold leading-snug tracking-tight text-ink sm:text-[18px]">{step.title}</span>
        <span className="mt-1.5 block text-[14px] leading-[1.55] text-ink/65 sm:text-[14.5px]">{step.body}</span>
        <AnimatePresence initial={false}>
          {on ? (
            <motion.span
              key="chip"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="block overflow-hidden"
            >
              <span className={clsx('mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold', ACCENT[id].chip)}>
                <FiCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                {step.chip}
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </Tag>
  )
}

/* --------------------------- Step marker --------------------------- */
function StepMarker({ index, lit, focus, size = 76 }: { index: number; lit: boolean; focus: JourneyId; size?: number }) {
  return (
    <motion.span
      aria-hidden
      className={clsx(
        'relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full ring-[6px] ring-white transition-colors duration-500',
        lit ? clsx(ACCENT[focus].circle, 'text-white shadow-[0_14px_28px_-12px_rgba(42,31,24,0.55)]') : 'bg-[#EFE8DD] text-ink/40',
      )}
      style={{ width: size, height: size }}
      animate={{ scale: lit ? 1 : 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className={clsx('font-hand leading-none', size > 60 ? 'mb-1 text-[13px]' : 'mb-0.5 text-[10px]')}>step</span>
      <span className={clsx('font-extrabold leading-none', size > 60 ? 'text-[22px]' : 'text-[16px]')}>{index + 1}</span>
    </motion.span>
  )
}

/** Connector between a card and the spine — drawn only on the focused side. */
function Connector({ active, focus, from }: { active: boolean; focus: JourneyId; from: 'left' | 'right' }) {
  return (
    <span aria-hidden className="relative h-[2px] flex-1 bg-ink/8">
      <motion.span
        className={clsx('absolute inset-0', ACCENT[focus].line, from === 'left' ? 'origin-left' : 'origin-right')}
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </span>
  )
}

function ColumnTitle({ id, focused, align, onClick }: { id: JourneyId; focused: boolean; align: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'cursor-pointer transition-opacity duration-500',
        align === 'right' ? 'text-right' : 'text-left',
        focused ? 'opacity-100' : 'opacity-40 hover:opacity-70',
      )}
    >
      <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">How to</span>
      <span className="mt-1 block font-hand text-[30px] leading-tight text-ink sm:text-[34px]">{JOURNEYS[id].title}</span>
    </button>
  )
}

/* ------------------- Desktop: side by side on a spine ---------------- */
const COLS = 'grid grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] items-center'

function ParallelSteps({ focus, setFocus }: { focus: JourneyId; setFocus: (id: JourneyId) => void }) {
  const { ref, fill, lit } = useScrollSteps()
  return (
    <div ref={ref} className="relative mt-12 hidden lg:block">
      <span aria-hidden className="absolute bottom-[70px] left-1/2 top-[118px] w-[3px] -translate-x-1/2 rounded-full bg-ink/8">
        <motion.span
          className={clsx('block h-full w-full origin-top rounded-full bg-gradient-to-b', ACCENT[focus].spine)}
          style={{ scaleY: fill ?? 1 }}
        />
      </span>

      <div className={clsx(COLS, 'pb-10')}>
        <ColumnTitle id="family" focused={focus === 'family'} align="left" onClick={() => setFocus('family')} />
        <span />
        <ColumnTitle id="kitchen" focused={focus === 'kitchen'} align="right" onClick={() => setFocus('kitchen')} />
      </div>

      <ol className="space-y-8">
        {FAMILY_JOURNEY.steps.map((s, i) => {
          const isLit = i < lit
          return (
            <li key={s.title} className={COLS}>
              <StepCard
                id="family"
                index={i}
                focused={focus === 'family'}
                lit={isLit}
                mirrored
                onFocusJourney={() => setFocus('family')}
              />
              <div className="flex items-center">
                <Connector active={isLit && focus === 'family'} focus={focus} from="right" />
                <StepMarker index={i} lit={isLit} focus={focus} />
                <Connector active={isLit && focus === 'kitchen'} focus={focus} from="left" />
              </div>
              <StepCard
                id="kitchen"
                index={i}
                focused={focus === 'kitchen'}
                lit={isLit}
                onFocusJourney={() => setFocus('kitchen')}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ------------------ Phones/tablets: one journey at a time ------------ */
function SingleJourney({ focus }: { focus: JourneyId }) {
  const { ref, fill, lit } = useScrollSteps()
  return (
    <div ref={ref} className="relative mt-8 lg:hidden">
      <span aria-hidden className="absolute bottom-10 left-[26px] top-6 w-[3px] rounded-full bg-ink/8">
        <motion.span
          className={clsx('block h-full w-full origin-top rounded-full bg-gradient-to-b', ACCENT[focus].spine)}
          style={{ scaleY: fill ?? 1 }}
        />
      </span>
      <ol className="space-y-5">
        {JOURNEYS[focus].steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-3 sm:gap-5">
            <div className="pt-3">
              <StepMarker index={i} lit={i < lit} focus={focus} size={54} />
            </div>
            <div className="min-w-0 flex-1">
              <StepCard id={focus} index={i} focused lit={i < lit} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ------------------------------ Section ---------------------------- */
export default function HowItWorks() {
  const [focus, setFocus] = useState<JourneyId>('family')

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

      <JourneySwitch value={focus} onChange={setFocus} />

      <ParallelSteps focus={focus} setFocus={setFocus} />
      {/* key restarts the phone timeline when the journey changes */}
      <SingleJourney key={focus} focus={focus} />

      {focus === 'family' ? (
        <div className="mt-12 flex justify-center">
          <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
            Order now
          </DownloadAppButton>
        </div>
      ) : null}
    </Section>
  )
}
