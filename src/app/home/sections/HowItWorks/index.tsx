'use client'

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { FiCamera, FiCheck, FiCheckSquare, FiCreditCard, FiMapPin } from 'react-icons/fi'
import { LuBike, LuShieldCheck, LuStore, LuUtensils } from 'react-icons/lu'
import {
  compactAccentLine,
  DownloadAppButton,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'
import { HOW_IT_WORKS_JOURNEYS, type HowItWorksJourney } from '@/app/home/data/how-it-works'

/** Time each step stays highlighted while auto-playing. */
const STEP_MS = 4500
/** After a click, hold that step this long before auto-play carries on. */
const HOLD_MS = 10000
const STEPS = 4

type IconType = ComponentType<{ className?: string }>
const ICONS: Record<HowItWorksJourney['id'], IconType[]> = {
  family: [FiMapPin, LuUtensils, FiCreditCard, LuBike],
  kitchen: [FiCheckSquare, FiCamera, LuShieldCheck, LuStore],
}

/** Steps alternate brand green / brand red. */
const tone = (i: number) => (i % 2 === 0 ? 'verified' : 'partner')
const CIRCLE_TONE = {
  verified: 'bg-gradient-to-br from-verified to-verified-dark',
  partner: 'bg-gradient-to-br from-customer to-partner',
} as const
const TEXT_TONE = { verified: 'text-verified-text', partner: 'text-partner' } as const
const SOFT_TONE = { verified: 'bg-verified-pill', partner: 'bg-partner-tag' } as const
const RING_STROKE = { verified: '#6f8a3e', partner: '#DB1A1A' } as const

/* ------------------------------------------------------------------ */
/* Autoplay over `count` positions while in view. A click jumps there, */
/* holds for HOLD_MS, then auto-play carries on.                       */
/* ------------------------------------------------------------------ */
function useStepper(inView: boolean, count: number) {
  const reduceMotion = useReducedMotion()
  const [pos, setPos] = useState(0)
  const [hold, setHold] = useState(0)
  const [holding, setHolding] = useState(false)
  const playing = !reduceMotion && !holding && inView

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setPos((p) => (p + 1) % count), STEP_MS)
    return () => window.clearTimeout(id)
  }, [playing, pos, count])

  useEffect(() => {
    if (!hold) return
    const id = window.setTimeout(() => setHolding(false), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [hold])

  const select = useCallback((p: number) => {
    setPos(p)
    setHolding(true)
    setHold((h) => h + 1)
  }, [])

  return { pos, select, playing }
}

/* --------------------------- Step marker --------------------------- */
function StepCircle({
  index,
  active,
  done,
  playing,
  onClick,
  dim,
}: {
  index: number
  active: boolean
  done: boolean
  playing: boolean
  onClick: () => void
  dim: number
}) {
  const t = tone(index)
  const lit = active || done
  const r = dim / 2 - 3
  const c = 2 * Math.PI * r
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-hidden
      className="relative z-10 flex shrink-0 cursor-pointer items-center justify-center rounded-full"
      style={{ width: dim, height: dim }}
    >
      {/* Timer ring — fills while this step is on screen */}
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${dim} ${dim}`}>
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="#FFFBF5" stroke="rgba(42,31,24,0.08)" strokeWidth="3" />
        {active ? (
          <motion.circle
            key={`${index}-${playing}`}
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            stroke={RING_STROKE[t]}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: playing ? c : 0 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: 'linear' }}
          />
        ) : null}
      </svg>
      <motion.span
        className={clsx(
          'relative flex flex-col items-center justify-center rounded-full transition-colors duration-500',
          lit ? clsx(CIRCLE_TONE[t], 'text-white shadow-[0_10px_24px_-10px_rgba(42,31,24,0.55)]') : 'bg-[#E9E1D5] text-ink/45',
        )}
        style={{ width: dim - 12, height: dim - 12 }}
        animate={{ scale: active ? 1.06 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      >
        <span className="mb-0.5 font-hand text-[10px] leading-none">step</span>
        <span className="text-[17px] font-extrabold leading-none">{index + 1}</span>
      </motion.span>
    </button>
  )
}

/* ------------------------------ Step card --------------------------- */
function StepCard({
  journey,
  index,
  active,
  onClick,
}: {
  journey: HowItWorksJourney
  index: number
  active: boolean
  onClick: () => void
}) {
  const step = journey.steps[index]
  const Icon = ICONS[journey.id][index]
  const t = tone(index)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'step' : undefined}
      className={clsx(
        'group relative w-full cursor-pointer rounded-[20px] border p-4 text-left transition-all duration-500 sm:p-5',
        active
          ? 'border-border-card bg-white shadow-[0_22px_44px_-26px_rgba(42,31,24,0.45)]'
          : 'border-transparent bg-transparent hover:bg-white/55',
      )}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={clsx(
            'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-500',
            active ? clsx(SOFT_TONE[t], TEXT_TONE[t]) : 'bg-[#EFE8DD] text-ink/40 group-hover:text-ink/60',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4
            className={clsx(
              'text-[17px] font-bold leading-snug tracking-tight transition-colors duration-500 sm:text-[18px]',
              active ? 'text-ink' : 'text-ink/60 group-hover:text-ink/80',
            )}
          >
            {step.title}
          </h4>
          <p
            className={clsx(
              'mt-1 text-[14.5px] leading-[1.55] transition-colors duration-500',
              active ? 'text-ink/70' : 'text-ink/45',
            )}
          >
            {step.body}
          </p>
          <AnimatePresence initial={false}>
            {active ? (
              <motion.span
                key="chip"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block overflow-hidden"
              >
                <span
                  className={clsx(
                    'mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold',
                    SOFT_TONE[t],
                    TEXT_TONE[t],
                  )}
                >
                  <FiCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  {step.chip}
                </span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </button>
  )
}

/* -------------------- One journey as a vertical timeline ------------ */
function JourneyTimeline({
  journey,
  activeStep,
  playing,
  onSelect,
  circle = 56,
}: {
  journey: HowItWorksJourney
  /** null = this journey is waiting its turn. */
  activeStep: number | null
  playing: boolean
  onSelect: (i: number) => void
  circle?: number
}) {
  const half = circle / 2
  return (
    <ol className="relative">
      <span aria-hidden className="absolute w-[2px] bg-ink/10" style={{ left: half - 1, top: half + 16, bottom: 72 }}>
        <motion.span
          className="block w-full bg-gradient-to-b from-verified via-customer to-partner"
          initial={false}
          animate={{ height: `${((activeStep ?? 0) / (STEPS - 1)) * 100}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </span>
      {journey.steps.map((s, i) => (
        <li key={s.title} className="relative flex items-start gap-2 pb-2">
          <div className="pt-4">
            <StepCircle
              dim={circle}
              index={i}
              active={activeStep === i}
              done={activeStep !== null && i < activeStep}
              playing={playing}
              onClick={() => onSelect(i)}
            />
          </div>
          <StepCard journey={journey} index={i} active={activeStep === i} onClick={() => onSelect(i)} />
        </li>
      ))}
    </ol>
  )
}

/* -------- Desktop: both journeys side by side, played one at a time -------- */
function SideBySide() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const { pos, select, playing } = useStepper(inView, STEPS * HOW_IT_WORKS_JOURNEYS.length)
  const current = Math.floor(pos / STEPS)
  const step = pos % STEPS

  return (
    <div ref={ref} className="relative hidden grid-cols-2 gap-10 lg:grid xl:gap-16">
      <span aria-hidden className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-ink/10" />
      {HOW_IT_WORKS_JOURNEYS.map((j, ji) => {
        const isCurrent = ji === current
        return (
          <section
            key={j.id}
            aria-labelledby={`hiw-col-${j.id}`}
            className={clsx('transition-opacity duration-700', isCurrent ? 'opacity-100' : 'opacity-45 hover:opacity-80')}
          >
            <header className="mb-5 flex items-end justify-between gap-4 pl-2">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">How to</p>
                <h3 id={`hiw-col-${j.id}`} className="mt-1 font-hand text-[30px] leading-tight text-ink">
                  {j.title}
                </h3>
              </div>
              {isCurrent ? (
                <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink/70 shadow-[0_6px_16px_-8px_rgba(42,31,24,0.35)] ring-1 ring-ink/5">
                  <span className="relative flex h-2 w-2">
                    {playing ? <span className="absolute inset-0 animate-ping rounded-full bg-customer/60" /> : null}
                    <span className="relative h-2 w-2 rounded-full bg-customer" />
                  </span>
                  Step {step + 1} of 4
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => select(ji * STEPS)}
                  className="mb-2 cursor-pointer rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-ink/60 ring-1 ring-ink/15 transition-colors hover:bg-white hover:text-ink"
                >
                  See these steps →
                </button>
              )}
            </header>
            <JourneyTimeline
              journey={j}
              activeStep={isCurrent ? step : null}
              playing={playing}
              onSelect={(i) => select(ji * STEPS + i)}
            />
          </section>
        )
      })}
    </div>
  )
}

/* --------------------- Mobile: one journey at a time ---------------- */
function JourneyTabs({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Choose a journey"
      className="mx-auto flex w-full max-w-[560px] rounded-full border border-border-subtle bg-surface p-1.5 shadow-[inset_0_1px_2px_rgba(42,31,24,0.06)]"
    >
      {HOW_IT_WORKS_JOURNEYS.map((j, i) => {
        const selected = value === i
        return (
          <button
            key={j.id}
            type="button"
            role="tab"
            id={`hiw-tab-${j.id}`}
            aria-selected={selected}
            aria-controls={`hiw-panel-${j.id}`}
            onClick={() => onChange(i)}
            className={clsx(
              'relative flex-1 cursor-pointer rounded-full px-3 py-3 text-[14px] font-semibold transition-colors sm:text-[15px]',
              selected ? 'text-ink' : 'text-ink/55 hover:text-ink/80',
            )}
          >
            {selected ? (
              <motion.span
                layoutId="hiw-tab-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(42,31,24,0.25)]"
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

function MobileJourney({ journey }: { journey: HowItWorksJourney }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const { pos, select, playing } = useStepper(inView, STEPS)
  return (
    <div ref={ref} className="mt-8">
      <JourneyTimeline journey={journey} activeStep={pos} playing={playing} onSelect={select} circle={52} />
    </div>
  )
}

/* ------------------------------ Section ---------------------------- */
export default function HowItWorks() {
  const [journeyIndex, setJourneyIndex] = useState(0)
  const journey = HOW_IT_WORKS_JOURNEYS[journeyIndex]

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

      <SideBySide />

      <div className="lg:hidden">
        <JourneyTabs value={journeyIndex} onChange={setJourneyIndex} />
        <div role="tabpanel" id={`hiw-panel-${journey.id}`} aria-labelledby={`hiw-tab-${journey.id}`}>
          {/* key restarts the journey at step 1 */}
          <MobileJourney key={journey.id} journey={journey} />
        </div>
      </div>

      <div className={clsx('mt-10 justify-center lg:mt-12 lg:flex', journey.id === 'family' ? 'flex' : 'hidden')}>
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>
    </Section>
  )
}
