'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import {
  compactAccentLine,
  DownloadAppButton,
  HEADER_TO_SUBROW_GAP,
  Section,
  SectionHeader,
} from '@/components'
import { EASE } from '@/shared/lib/motion'
import {
  HOW_IT_WORKS_JOURNEYS,
  type HowItWorksJourney,
  type HowItWorksStep,
} from '@/app/home/data/how-it-works'

const STEP_MS = 5000

/** Odd steps green (verified), even steps red (brand). */
const tone = (i: number) => (i % 2 === 0 ? 'verified' : 'partner')
const DOT_TONE = {
  verified: 'bg-gradient-to-b from-verified to-verified-dark',
  partner: 'bg-gradient-to-b from-customer to-partner',
} as const
const BAR_TONE = { verified: 'bg-verified', partner: 'bg-partner' } as const

/* ------------------------------------------------------------------ */
/* Autoplay: advances while in view; hover/touch pauses; a tap stops. */
/* ------------------------------------------------------------------ */
function useStepper(count: number, inView: boolean) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const playing = !reduceMotion && !stopped && !paused && inView

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), STEP_MS)
    return () => window.clearTimeout(id)
  }, [playing, active, count])

  const select = useCallback((i: number) => {
    setStopped(true)
    setActive(i)
  }, [])

  return { active, setActive, select, playing, autoplayOn: !reduceMotion && !stopped, setPaused, setStopped }
}

/* ------------------------------- Tabs ------------------------------ */
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

/* ------------------------------ Photo ------------------------------ */
function StepPhoto({ step, index, className }: { step: HowItWorksStep; index: number; className?: string }) {
  const contain = step.fit === 'contain'
  return (
    <div className={clsx('relative overflow-hidden bg-white', className)}>
      <Image
        src={step.image}
        alt={step.imageAlt}
        fill
        sizes="(max-width: 1024px) 90vw, 560px"
        className={contain ? 'object-contain p-4 sm:p-6' : 'object-cover'}
      />
      {!contain ? (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      ) : null}
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[13px] font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(42,31,24,0.45)] backdrop-blur">
        <span className={clsx('inline-flex h-6 w-6 items-center justify-center rounded-full text-white', DOT_TONE[tone(index)])}>
          <FiCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
        </span>
        {step.chip}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-white backdrop-blur">
        Step {index + 1} of 4
      </span>
    </div>
  )
}

/* ----------------------------- Desktop ----------------------------- */
function DesktopStory({ journey }: { journey: HowItWorksJourney }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const { active, select, playing, autoplayOn, setPaused } = useStepper(journey.steps.length, inView)
  const step = journey.steps[active]

  return (
    <div
      ref={ref}
      className="hidden grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center gap-12 lg:grid"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="space-y-3">
        {journey.steps.map((s, i) => {
          const isActive = i === active
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive ? 'step' : undefined}
                className={clsx(
                  'group relative w-full cursor-pointer overflow-hidden rounded-[18px] border px-5 py-4 text-left transition-all duration-300',
                  isActive
                    ? 'border-border-card bg-white shadow-[0_14px_34px_-18px_rgba(42,31,24,0.35)]'
                    : 'border-transparent hover:bg-white/60',
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={clsx(
                      'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-extrabold transition-all duration-300',
                      isActive ? clsx('text-white shadow-md', DOT_TONE[tone(i)]) : 'bg-surface text-ink/45 group-hover:text-ink/70',
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4
                      className={clsx(
                        'text-[18px] font-bold leading-snug tracking-tight transition-colors',
                        isActive ? 'text-ink' : 'text-ink/60 group-hover:text-ink/80',
                      )}
                    >
                      {s.title}
                    </h4>
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.p
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden pt-1.5 text-[15px] leading-[1.55] text-ink/65"
                        >
                          {s.body}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
                {isActive && autoplayOn ? (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-border-subtle">
                    {/* Restarts with the timer: paused → empty, resumed → fills over STEP_MS. */}
                    <motion.span
                      key={`${journey.id}-${active}-${playing}`}
                      className={clsx('block h-full origin-left', BAR_TONE[tone(i)])}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: playing ? 1 : 0 }}
                      transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: 'linear' }}
                    />
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ol>

      <div className="relative">
        <div aria-hidden className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-customer/10 via-transparent to-verified/15 blur-2xl" />
        <div className="relative aspect-[5/4] overflow-hidden rounded-[26px] border border-border-card shadow-[0_30px_60px_-30px_rgba(42,31,24,0.45)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${journey.id}-${active}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <StepPhoto step={step} index={active} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ Mobile ----------------------------- */
function MobileCards({ journey }: { journey: HowItWorksJourney }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(trackRef, { amount: 0.5 })
  const { active, setActive, select, setPaused, setStopped } = useStepper(journey.steps.length, inView)
  const programmatic = useRef(false)

  // Autoplay / dot taps → scroll the track to the active card.
  useEffect(() => {
    const track = trackRef.current
    const card = track?.children[active] as HTMLElement | undefined
    if (!track || !card) return
    programmatic.current = true
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    const t = window.setTimeout(() => (programmatic.current = false), 600)
    return () => window.clearTimeout(t)
  }, [active])

  // User swipes → update active card.
  const onScroll = () => {
    const track = trackRef.current
    if (!track || programmatic.current) return
    const cards = Array.from(track.children) as HTMLElement[]
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0
    cards.forEach((c, i) => {
      const mid = c.offsetLeft - track.offsetLeft + c.clientWidth / 2
      if (Math.abs(mid - center) < Math.abs(cards[best].offsetLeft - track.offsetLeft + cards[best].clientWidth / 2 - center)) best = i
    })
    if (best !== active) setActive(best)
  }

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={() => {
          setPaused(true)
          setStopped(true)
        }}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {journey.steps.map((s, i) => (
          <article
            key={s.title}
            className="w-[86%] shrink-0 snap-center overflow-hidden rounded-[22px] border border-border-card bg-white shadow-[0_18px_40px_-24px_rgba(42,31,24,0.45)] sm:w-[62%]"
            aria-label={`Step ${i + 1} of 4: ${s.title}`}
          >
            <StepPhoto step={s} index={i} className="aspect-[4/3] w-full" />
            <div className="p-5">
              <h4 className="text-[18px] font-bold leading-snug tracking-tight text-ink">{s.title}</h4>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink/65">{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Steps">
        {journey.steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => select(i)}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            aria-current={i === active ? 'step' : undefined}
            className={clsx(
              'h-2.5 cursor-pointer rounded-full transition-all duration-300',
              i === active ? clsx('w-8', BAR_TONE[tone(i)]) : 'w-2.5 bg-ink/15',
            )}
          />
        ))}
      </div>
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

      <JourneyTabs value={journeyIndex} onChange={setJourneyIndex} />

      <div
        role="tabpanel"
        id={`hiw-panel-${journey.id}`}
        aria-labelledby={`hiw-tab-${journey.id}`}
        className="mt-10 lg:mt-14"
      >
        {/* key remounts both views so each journey restarts at step 1 */}
        <DesktopStory key={`d-${journey.id}`} journey={journey} />
        <MobileCards key={`m-${journey.id}`} journey={journey} />

        {journey.id === 'family' ? (
          <div className="mt-10 flex justify-center lg:justify-start">
            <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
              Order now
            </DownloadAppButton>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
