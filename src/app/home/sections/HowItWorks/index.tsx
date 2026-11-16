'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
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

// Step images — no people. Food photos are cropped from our own kitchen videos;
// app/brand images are rendered with the real Mother Bhojan logo and app QR code.
import f1Kitchen from '@/assets/images/how-it-works/f1-kitchen.jpg'
import f2Curry from '@/assets/images/how-it-works/f2-curry.jpg'
import f3Pay from '@/assets/images/how-it-works/f3-pay.jpg'
import f4Bag from '@/assets/images/how-it-works/f4-bag.jpg'
import k1Download from '@/assets/images/how-it-works/k1-download.jpg'
import k2Verify from '@/assets/images/how-it-works/k2-verify.jpg'
import k3Dal from '@/assets/images/how-it-works/f3-dal.jpg'
import k4Connect from '@/assets/images/how-it-works/k4-connect.jpg'

/**
 * "How Mother Bhojan works" — both journeys side by side (families left,
 * home cooks right) on a centre spine. Nothing lights up on its own: a step is
 * highlighted only while you hover it (tap on phones). Phones show one journey
 * at a time via the switch.
 */

type JourneyId = HowItWorksJourney['id']
type StepPhoto = { src: StaticImageData; alt: string }
const PHOTOS: Record<JourneyId, StepPhoto[]> = {
  family: [
    { src: f1Kitchen, alt: 'A clean home kitchen with a stove, spices and fresh vegetables' },
    { src: f2Curry, alt: 'Kofta curry simmering in a pan' },
    { src: f3Pay, alt: 'A phone showing a successful UPI payment to Mother Bhojan' },
    { src: f4Bag, alt: 'A kraft paper delivery bag with the Mother Bhojan logo' },
  ],
  kitchen: [
    { src: k1Download, alt: 'A phone showing the Mother Bhojan logo and a QR code to download the app' },
    { src: k2Verify, alt: 'A phone showing an OTP entered and the number verified' },
    { src: k3Dal, alt: 'Fresh dal with tadka steaming in a brass pot' },
    { src: k4Connect, alt: 'A Mother Bhojan welcome card: our team will get in touch with you soon' },
  ],
}

const JOURNEYS: Record<JourneyId, HowItWorksJourney> = { family: FAMILY_JOURNEY, kitchen: KITCHEN_JOURNEY }
const ORDER: JourneyId[] = ['family', 'kitchen']

/** Each journey has one accent colour (families red, home cooks green). */
const ACCENT = {
  family: {
    circle: 'bg-gradient-to-br from-customer to-partner',
    line: 'bg-partner',
    chip: 'bg-partner-tag text-partner',
    border: 'border-customer/40',
  },
  kitchen: {
    circle: 'bg-gradient-to-br from-verified to-verified-dark',
    line: 'bg-verified',
    chip: 'bg-verified-pill text-verified-text',
    border: 'border-verified/50',
  },
} as const

type Hover = { id: JourneyId; index: number } | null

/* ------------------------------ Switch (phones) ------------------------------ */
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
            <span className="relative">{j.tabShort}</span>
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
  on,
  mirrored,
  onEnter,
  onLeave,
  onTap,
}: {
  id: JourneyId
  index: number
  /** Highlighted (hovered on desktop, tapped on phones). */
  on: boolean
  mirrored?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onTap?: () => void
}) {
  const step = JOURNEYS[id].steps[index]
  const photo = PHOTOS[id][index]
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      className={clsx(
        'group relative flex w-full items-start gap-3.5 rounded-[22px] border bg-white p-4 text-left transition-all duration-300 sm:items-center sm:gap-5 sm:p-5',
        mirrored && 'lg:flex-row-reverse lg:text-right',
        onTap && 'cursor-pointer',
        on
          ? clsx('-translate-y-1 shadow-[0_24px_46px_-26px_rgba(42,31,24,0.55)]', ACCENT[id].border)
          : 'border-ink/8 shadow-[0_10px_26px_-24px_rgba(42,31,24,0.35)]',
      )}
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] sm:h-28 sm:w-28 sm:rounded-[18px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="112px"
          className={clsx('object-cover transition-transform duration-500', on && 'scale-105')}
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
              transition={{ duration: 0.25, ease: EASE }}
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
    </div>
  )
}

/* --------------------------- Step marker --------------------------- */
function StepMarker({ index, tone, size = 76 }: { index: number; tone: JourneyId | null; size?: number }) {
  return (
    <motion.span
      aria-hidden
      className={clsx(
        'relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full ring-[6px] ring-white transition-colors duration-300',
        tone ? clsx(ACCENT[tone].circle, 'text-white shadow-[0_14px_28px_-12px_rgba(42,31,24,0.55)]') : 'bg-[#EFE8DD] text-ink/55',
      )}
      style={{ width: size, height: size }}
      animate={{ scale: tone ? 1.06 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className={clsx('font-hand leading-none', size > 60 ? 'mb-1 text-[13px]' : 'mb-0.5 text-[10px]')}>step</span>
      <span className={clsx('font-extrabold leading-none', size > 60 ? 'text-[22px]' : 'text-[16px]')}>{index + 1}</span>
    </motion.span>
  )
}

/** Connector between a card and the spine — drawn while that card is hovered. */
function Connector({ tone, from }: { tone: JourneyId | null; from: 'left' | 'right' }) {
  return (
    <span aria-hidden className="relative h-[2px] flex-1 bg-ink/10">
      <motion.span
        className={clsx('absolute inset-0', tone ? ACCENT[tone].line : 'bg-transparent', from === 'left' ? 'origin-left' : 'origin-right')}
        initial={false}
        animate={{ scaleX: tone ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  )
}

function ColumnTitle({ id, align }: { id: JourneyId; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">How to</span>
      <span className="mt-1 block font-hand text-[30px] leading-tight text-ink sm:text-[34px]">{JOURNEYS[id].title}</span>
    </div>
  )
}

/* ------------------- Desktop: side by side on a spine ---------------- */
const COLS = 'grid grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] items-center'

function ParallelSteps() {
  const [hover, setHover] = useState<Hover>(null)
  const isOn = (id: JourneyId, i: number) => hover?.id === id && hover.index === i
  return (
    <div className="relative mt-4 hidden lg:block" onMouseLeave={() => setHover(null)}>
      <span aria-hidden className="absolute bottom-[70px] left-1/2 top-[118px] w-[3px] -translate-x-1/2 rounded-full bg-ink/8" />

      <div className={clsx(COLS, 'pb-10')}>
        <ColumnTitle id="family" align="left" />
        <span />
        <ColumnTitle id="kitchen" align="right" />
      </div>

      <ol className="space-y-8">
        {FAMILY_JOURNEY.steps.map((s, i) => {
          const rowTone = hover && hover.index === i ? hover.id : null
          return (
            <li key={s.title} className={COLS}>
              <StepCard
                id="family"
                index={i}
                on={isOn('family', i)}
                mirrored
                onEnter={() => setHover({ id: 'family', index: i })}
                onLeave={() => setHover(null)}
              />
              <div className="flex items-center">
                <Connector tone={rowTone === 'family' ? 'family' : null} from="right" />
                <StepMarker index={i} tone={rowTone} />
                <Connector tone={rowTone === 'kitchen' ? 'kitchen' : null} from="left" />
              </div>
              <StepCard
                id="kitchen"
                index={i}
                on={isOn('kitchen', i)}
                onEnter={() => setHover({ id: 'kitchen', index: i })}
                onLeave={() => setHover(null)}
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
  const [tapped, setTapped] = useState<number | null>(null)
  return (
    <div className="relative mt-8 lg:hidden">
      <span aria-hidden className="absolute bottom-10 left-[26px] top-6 w-[3px] rounded-full bg-ink/8" />
      <ol className="space-y-5">
        {JOURNEYS[focus].steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-3 sm:gap-5">
            <div className="pt-3">
              <StepMarker index={i} tone={tapped === i ? focus : null} size={54} />
            </div>
            <div className="min-w-0 flex-1">
              <StepCard id={focus} index={i} on={tapped === i} onTap={() => setTapped((t) => (t === i ? null : i))} />
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

      <ParallelSteps />

      <div className="lg:hidden">
        <JourneySwitch value={focus} onChange={setFocus} />
        {/* key resets the tapped step when the journey changes */}
        <SingleJourney key={focus} focus={focus} />
      </div>

      <div className="mt-12 flex justify-center">
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>
    </Section>
  )
}
