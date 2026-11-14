'use client'

import { useRef, useState, type ComponentType } from 'react'
import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { FiCamera, FiCheck, FiCheckSquare, FiChevronDown, FiCreditCard, FiMapPin } from 'react-icons/fi'
import { LuBike, LuChefHat, LuShieldCheck, LuStore, LuUtensils } from 'react-icons/lu'
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
 * "How Mother Bhojan works" — no auto-play; the visitor drives it.
 * Families: steps light up as you scroll; hover/tap a step for its result.
 * Home cooks: tap a step to open it; the tracker shows how far that gets you.
 */

type IconType = ComponentType<{ className?: string }>
const FAMILY_ICONS: IconType[] = [FiMapPin, LuUtensils, FiCreditCard, LuBike]
const KITCHEN_ICONS: IconType[] = [FiCheckSquare, FiCamera, LuShieldCheck, LuStore]

/** Alternating brand tones: soft (not reached yet) and solid (lit). */
const TILE_SOFT = [
  'bg-gradient-to-br from-[#FDEBE8] to-[#F9D8D3] text-partner',
  'bg-gradient-to-br from-[#EEF2E3] to-[#DCE5C6] text-verified-text',
] as const
const TILE_LIT = [
  'bg-gradient-to-br from-customer to-partner text-white',
  'bg-gradient-to-br from-verified to-verified-dark text-white',
] as const
const CHIP_TONE = ['bg-partner-tag text-partner', 'bg-verified-pill text-verified-text'] as const

/* ------------------------- Families: main row ------------------------ */
function FamilySteps() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  const [lit, setLit] = useState(reduceMotion ? 4 : 0)
  const [focus, setFocus] = useState<number | null>(null)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduceMotion) return
    // Step i lights once the line reaches it (i / 3 of the way).
    setLit(Math.min(4, Math.floor(v * 3 + 1.05)))
  })

  return (
    <div ref={ref} className="relative">
      {/* Connector — desktop: horizontal, fills with scroll */}
      <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-0 border-t-2 border-dashed border-ink/15 lg:block" />
      <motion.span
        aria-hidden
        className="absolute left-[12.5%] right-[12.5%] top-[47px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-customer via-verified to-partner lg:block"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />
      {/* Connector — phones/tablets: vertical */}
      <span aria-hidden className="absolute bottom-16 left-12 top-12 border-l-2 border-dashed border-ink/15 sm:hidden" />
      <motion.span
        aria-hidden
        className="absolute bottom-16 left-[47px] top-12 w-[3px] origin-top rounded-full bg-gradient-to-b from-customer via-verified to-partner sm:hidden"
        style={{ scaleY: reduceMotion ? 1 : progress }}
      />

      <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-6">
        {FAMILY_JOURNEY.steps.map((step, i) => {
          const Icon = FAMILY_ICONS[i]
          const isLit = i < lit
          const isFocus = focus === i
          return (
            <li key={step.title}>
              <button
                type="button"
                onMouseEnter={() => setFocus(i)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus((f) => (f === i ? null : i))}
                aria-expanded={isFocus}
                className="group flex w-full cursor-pointer items-start gap-5 rounded-[24px] text-left outline-none sm:flex-col sm:items-center sm:gap-0 sm:text-center"
              >
                <motion.div
                  className="relative shrink-0"
                  animate={{ y: isFocus ? -6 : 0, scale: isFocus ? 1.04 : 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                  <span
                    className={clsx(
                      'flex h-24 w-24 items-center justify-center rounded-[28px] ring-[6px] ring-white transition-all duration-500',
                      isLit ? TILE_LIT[i % 2] : TILE_SOFT[i % 2],
                      isLit || isFocus
                        ? 'shadow-[0_20px_36px_-16px_rgba(42,31,24,0.55)]'
                        : 'shadow-[0_12px_26px_-18px_rgba(42,31,24,0.4)]',
                    )}
                  >
                    <motion.span
                      animate={isFocus ? { rotate: [0, -12, 10, -6, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex"
                    >
                      <Icon className="h-9 w-9" />
                    </motion.span>
                  </span>
                  <span
                    className={clsx(
                      'absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ring-4 ring-white transition-colors duration-500',
                      isLit ? 'bg-ink text-white' : 'bg-[#EFE8DD] text-ink/50',
                    )}
                  >
                    {isLit ? <FiCheck className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
                  </span>
                </motion.div>

                <div className="min-w-0 pt-2 sm:mt-6 sm:pt-0">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink/40">Step {i + 1}</p>
                  <h3
                    className={clsx(
                      'mt-1 text-[19px] font-bold leading-snug tracking-tight transition-colors duration-500',
                      isLit ? 'text-ink' : 'text-ink/55',
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={clsx(
                      'mx-auto mt-2 max-w-[260px] text-[15px] leading-[1.55] transition-colors duration-500 sm:max-w-[240px]',
                      isLit ? 'text-ink/70' : 'text-ink/45',
                    )}
                  >
                    {step.body}
                  </p>
                  <AnimatePresence initial={false}>
                    {isFocus ? (
                      <motion.span
                        key="chip"
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className={clsx('mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold', CHIP_TONE[i % 2])}>
                          <FiCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                          {step.chip}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* -------------------- Home cooks: steps + tracker -------------------- */
const TRACKER_LABELS = ['Eligibility & OTP', 'Kitchen details & visit', 'Hygiene audit & cook test', 'FSSAI, KYC & welcome'] as const

function KitchenJourney() {
  const [open, setOpen] = useState(0)
  const steps = KITCHEN_JOURNEY.steps
  const live = open === steps.length - 1

  return (
    <div className="relative mt-16 overflow-hidden rounded-[32px] bg-[#FBF3E8] ring-1 ring-[#EADFCF] lg:mt-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(42,31,24,0.08)_1px,transparent_1.2px)] [background-size:20px_20px] [mask-image:linear-gradient(to_left,black,transparent_65%)]"
      />
      <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-verified/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-customer/10 blur-3xl" />

      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-14">
        {/* Left — clickable steps */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-verified-text">For home cooks</p>
          <h3 className="mt-2 font-hand text-[36px] leading-tight text-ink sm:text-[42px]">Want to cook from home?</h3>
          <p className="mt-2 max-w-[440px] text-[15.5px] leading-[1.55] text-ink/65">
            Open your kitchen in your own name. Tap a step to see what happens.
          </p>

          <ol className="mt-7 space-y-2.5">
            {steps.map((s, i) => {
              const Icon = KITCHEN_ICONS[i]
              const isOpen = open === i
              const done = i < open
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className={clsx(
                      'w-full cursor-pointer rounded-[20px] px-4 py-3.5 text-left transition-all duration-300',
                      isOpen
                        ? 'bg-white shadow-[0_18px_36px_-22px_rgba(42,31,24,0.45)] ring-1 ring-ink/5'
                        : 'hover:bg-white/60',
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={clsx(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
                          isOpen
                            ? 'bg-gradient-to-br from-verified to-verified-dark text-white'
                            : done
                              ? 'bg-verified-pill text-verified-text'
                              : 'bg-white text-ink/45 ring-1 ring-ink/10',
                        )}
                      >
                        {done ? <FiCheck className="h-4.5 w-4.5" strokeWidth={3} /> : <Icon className="h-5 w-5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">Step {i + 1}</span>
                        <span className={clsx('block text-[16.5px] font-bold leading-snug', isOpen ? 'text-ink' : 'text-ink/70')}>
                          {s.title}
                        </span>
                      </span>
                      <FiChevronDown
                        aria-hidden
                        className={clsx('h-5 w-5 shrink-0 text-ink/35 transition-transform duration-300', isOpen && 'rotate-180')}
                      />
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pl-[54px] pt-2 text-[14.5px] leading-[1.55] text-ink/65">{s.body}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Right — journey tracker follows the selected step */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="rounded-[26px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(42,31,24,0.45)] ring-1 ring-ink/5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBF3E8] text-ink-soft">
                <LuChefHat className="h-5.5 w-5.5" aria-hidden />
              </span>
              <div>
                <p className="text-[16px] font-bold text-ink">Your kitchen journey</p>
                <p className="text-[12.5px] text-ink/50">
                  Step {open + 1} of {steps.length}
                </p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-verified to-verified-dark"
                initial={false}
                animate={{ width: `${((open + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>

            <ul className="mt-5 space-y-1">
              {TRACKER_LABELS.map((label, i) => {
                const done = i < open || (live && i === open)
                const current = i === open && !live
                return (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-[#FBF3E8]/70"
                    >
                      <span
                        className={clsx(
                          'relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                          done ? 'bg-verified text-white' : current ? 'bg-customer/10' : 'bg-ink/6',
                        )}
                      >
                        {done ? (
                          <FiCheck className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                        ) : current ? (
                          <>
                            <span className="absolute inset-0 animate-ping rounded-full bg-customer/25" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-customer" />
                          </>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-ink/20" />
                        )}
                      </span>
                      <span className={clsx('flex-1 text-[14.5px] font-semibold', done || current ? 'text-ink' : 'text-ink/40')}>
                        {label}
                      </span>
                      {current ? <span className="text-[11.5px] font-semibold text-customer">In progress</span> : null}
                    </button>
                  </li>
                )
              })}
            </ul>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={live ? 'live' : `next-${open}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={clsx(
                  'mt-5 flex items-center gap-3 rounded-2xl px-4 py-3.5',
                  live ? 'bg-gradient-to-r from-verified to-verified-dark text-white' : 'bg-[#FBF3E8] text-ink',
                )}
              >
                {live ? (
                  <>
                    <LuStore className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="text-[14px] font-bold">Verified · Live in your own name</span>
                  </>
                ) : (
                  <>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">Next</span>
                    <span className="text-[14px] font-semibold">{steps[open + 1].title}</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
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

      <p className="-mt-4 mb-12 text-center text-[15px] font-medium text-ink/55 lg:mb-14">
        Home food in four simple steps
      </p>

      <FamilySteps />

      <div className="mt-12 flex justify-center">
        <DownloadAppButton source="home-how-it-works" openLabel="Order now" variant="customer" size="md" className="px-8">
          Order now
        </DownloadAppButton>
      </div>

      <KitchenJourney />
    </Section>
  )
}
