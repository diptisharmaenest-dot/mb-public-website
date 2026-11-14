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
import {
  FAMILY_JOURNEY,
  HOW_IT_WORKS_JOURNEYS,
  KITCHEN_JOURNEY,
  type HowItWorksJourney,
} from '@/app/home/data/how-it-works'

/** Time each step stays highlighted while auto-playing. */
const STEP_MS = 4500
const STEPS = 4

type IconType = ComponentType<{ className?: string }>
const ICONS: Record<HowItWorksJourney['id'], IconType[]> = {
  family: [FiMapPin, LuUtensils, FiCreditCard, LuBike],
  kitchen: [FiCheckSquare, FiCamera, LuShieldCheck, LuStore],
}

/** Steps alternate brand green / brand red, like the step markers on the spine. */
const tone = (i: number) => (i % 2 === 0 ? 'verified' : 'partner')
const CIRCLE_TONE = {
  verified: 'bg-gradient-to-br from-verified to-verified-dark',
  partner: 'bg-gradient-to-br from-customer to-partner',
} as const
const LINE_TONE = { verified: 'bg-verified', partner: 'bg-partner' } as const
const TEXT_TONE = { verified: 'text-verified-text', partner: 'text-partner' } as const
const SOFT_TONE = { verified: 'bg-verified-pill', partner: 'bg-partner-tag' } as const
const RING_STROKE = { verified: '#6f8a3e', partner: '#DB1A1A' } as const

/* ------------------------------------------------------------------ */
/* Autoplay: advances while in view; hover pauses; a click/tap stops.  */
/* ------------------------------------------------------------------ */
function useStepper(inView: boolean) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const playing = !reduceMotion && !stopped && !paused && inView

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % STEPS), STEP_MS)
    return () => window.clearTimeout(id)
  }, [playing, active])

  const select = useCallback((i: number) => {
    setStopped(true)
    setActive(i)
  }, [])

  return { active, select, playing, setPaused }
}

/* --------------------------- Step marker --------------------------- */
function StepCircle({
  index,
  active,
  done,
  playing,
  onClick,
  size = 'lg',
}: {
  index: number
  active: boolean
  done: boolean
  playing: boolean
  onClick: () => void
  size?: 'lg' | 'sm'
}) {
  const t = tone(index)
  const lit = active || done
  const dim = size === 'lg' ? 84 : 52
  const r = dim / 2 - 3
  const c = 2 * Math.PI * r
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Step ${index + 1}`}
      aria-current={active ? 'step' : undefined}
      className="group relative z-10 flex shrink-0 cursor-pointer items-center justify-center rounded-full"
      style={{ width: dim, height: dim }}
    >
      {/* Timer ring — fills while this step is on screen */}
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${dim} ${dim}`} aria-hidden>
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
        style={{ width: dim - 14, height: dim - 14 }}
        animate={{ scale: active ? 1.06 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      >
        <span className={clsx('font-hand leading-none', size === 'lg' ? '-mt-0.5 mb-1.5 text-[14px]' : 'mb-0.5 text-[10px]')}>step</span>
        <span className={clsx('font-extrabold leading-none', size === 'lg' ? 'text-[24px]' : 'text-[16px]')}>{index + 1}</span>
      </motion.span>
    </button>
  )
}

/* ------------------------------ Step card --------------------------- */
function StepCard({
  journey,
  index,
  active,
  side,
  onClick,
}: {
  journey: HowItWorksJourney
  index: number
  active: boolean
  side: 'left' | 'right' | 'mobile'
  onClick: () => void
}) {
  const step = journey.steps[index]
  const Icon = ICONS[journey.id][index]
  const t = tone(index)
  const alignRight = side === 'right'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'step' : undefined}
      className={clsx(
        'group relative w-full cursor-pointer rounded-[20px] border p-5 text-left transition-all duration-500 sm:p-6',
        alignRight && 'text-right',
        active
          ? 'border-border-card bg-white shadow-[0_22px_44px_-26px_rgba(42,31,24,0.45)]'
          : 'border-transparent bg-transparent hover:bg-white/55',
      )}
    >
      <div className={clsx('flex items-start gap-4', alignRight && 'flex-row-reverse')}>
        <span
          className={clsx(
            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500',
            active ? clsx(SOFT_TONE[t], TEXT_TONE[t]) : 'bg-[#EFE8DD] text-ink/40 group-hover:text-ink/60',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4
            className={clsx(
              'text-[17px] font-bold leading-snug tracking-tight transition-colors duration-500 sm:text-[19px]',
              active ? 'text-ink' : 'text-ink/60 group-hover:text-ink/80',
            )}
          >
            {step.title}
          </h4>
          <p
            className={clsx(
              'mt-1.5 text-[14.5px] leading-[1.55] transition-colors duration-500 sm:text-[15px]',
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

/** Short connector between a card and the spine; draws in when active. */
function Connector({ index, active, from }: { index: number; active: boolean; from: 'left' | 'right' }) {
  return (
    <span aria-hidden className="relative h-[2px] flex-1 bg-ink/10">
      <motion.span
        className={clsx('absolute inset-0', LINE_TONE[tone(index)], from === 'left' ? 'origin-left' : 'origin-right')}
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </span>
  )
}

function ColumnTitle({ journey, align }: { journey: HowItWorksJourney; align: 'left' | 'right' }) {
  return (
    <div className={clsx(align === 'right' ? 'text-right' : 'text-left', 'px-6')}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">How to</p>
      <h3 className="mt-1 font-hand text-[30px] leading-tight text-ink">{journey.title}</h3>
    </div>
  )
}

/* ----------------------- Desktop: side by side ---------------------- */
const COLS = 'grid grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]'

function ParallelTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const { active, select, playing, setPaused } = useStepper(inView)
  const left = FAMILY_JOURNEY
  const right = KITCHEN_JOURNEY

  return (
    <div
      ref={ref}
      className="relative hidden lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Spine — fills down to the active step */}
      <span aria-hidden className="absolute bottom-0 left-1/2 top-[6px] w-[2px] -translate-x-1/2 bg-ink/10">
        <motion.span
          className="block w-full bg-gradient-to-b from-verified via-customer to-partner"
          initial={false}
          animate={{ height: `${((active + 0.6) / STEPS) * 100}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </span>
      <span aria-hidden className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-paper bg-verified" />

      <div className={clsx(COLS, 'items-end pb-8 pt-6')}>
        <ColumnTitle journey={left} align="left" />
        <span />
        <ColumnTitle journey={right} align="right" />
      </div>

      <ol className="space-y-5">
        {left.steps.map((s, i) => (
          <li key={s.title} className={clsx(COLS, 'items-center')}>
            <StepCard journey={left} index={i} active={active === i} side="left" onClick={() => select(i)} />
            <div className="flex items-center">
              <Connector index={i} active={active === i} from="right" />
              <StepCircle index={i} active={active === i} done={i < active} playing={playing} onClick={() => select(i)} />
              <Connector index={i} active={active === i} from="left" />
            </div>
            <StepCard journey={right} index={i} active={active === i} side="right" onClick={() => select(i)} />
          </li>
        ))}
      </ol>
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
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const { active, select, playing } = useStepper(inView)
  return (
    <ol ref={ref} className="relative mt-8">
      <span aria-hidden className="absolute bottom-24 left-[25px] top-10 w-[2px] bg-ink/10">
        <motion.span
          className="block w-full bg-gradient-to-b from-verified via-customer to-partner"
          initial={false}
          animate={{ height: `${(active / (STEPS - 1)) * 100}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </span>
      {journey.steps.map((s, i) => (
        <li key={s.title} className="relative flex items-start gap-1 pb-2">
          <div className="pt-4">
            <StepCircle size="sm" index={i} active={active === i} done={i < active} playing={playing} onClick={() => select(i)} />
          </div>
          <StepCard journey={journey} index={i} active={active === i} side="mobile" onClick={() => select(i)} />
        </li>
      ))}
    </ol>
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

      <ParallelTimeline />

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
