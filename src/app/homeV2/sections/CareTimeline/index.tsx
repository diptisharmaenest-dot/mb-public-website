'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { mLogo } from '@/assets'
import {
  compactAccentLine,
  RADIUS_CARD,
  Section,
  SectionHeader,
  VerifiedKitchenBadge,
  VerifiedSeal,
} from '@/components'
import {
  careTimelineHeader,
  careTimelineMetrics,
  careTimelineSteps,
  type CareTimelineIcon,
  type CareTimelineMedia,
  type CareTimelineStatusKind,
  type CareTimelineStep,
} from '../../data/care-timeline'
import { VERIFIED_TRUST_SECTION_PROPS } from '@/shared/data/verified-kitchen'

const STEP_ICONS: Record<CareTimelineIcon, React.ReactNode> = {
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  basket: (
    <>
      <path d="M3 9h18l-1.5 11.5A2 2 0 0 1 17.5 22h-11A2 2 0 0 1 4.5 20.5z" />
      <path d="M8 9l4-6 4 6" />
      <path d="M9 13v4M15 13v4" />
    </>
  ),
  pot: (
    <>
      <path d="M4 11h16v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M3 11h18" />
      <path d="M9 7c0-1 .8-1.5.8-2.5M14.2 7c0-1 .8-1.5.8-2.5" />
      <path d="M2 14h2M20 14h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  box: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  scooter: (
    <>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.4 18h7.2M15.6 18l2.4-9h2.5M5 9h6l2 5" />
    </>
  ),
}

const TIMELINE_COL_CLASS = 'min-w-[220px] shrink-0 sm:min-w-[240px] lg:min-w-0'
const TIMELINE_TRACK_CLASS =
  'flex w-full gap-4 lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-6'

function StepIcon({ icon, className }: { icon: CareTimelineIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {STEP_ICONS[icon]}
    </svg>
  )
}

function StatusChip({
  label,
  kind,
}: {
  label: string
  kind: CareTimelineStatusKind
}) {
  if (kind === 'solid') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-verified-dark bg-verified-dark px-3.5 py-1.5 font-jakarta text-xs font-extrabold tracking-wide text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        {label}
      </span>
    )
  }

  if (kind === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-yellow bg-white px-3.5 py-1.5 font-jakarta text-xs font-extrabold tracking-wide text-yellow">
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-yellow" aria-hidden />
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-verified-pill-border bg-verified-pill px-3.5 py-1.5 font-jakarta text-xs font-extrabold tracking-wide text-verified-text">
      <span className="h-[7px] w-[7px] rounded-full bg-verified" aria-hidden />
      {label}
    </span>
  )
}

function TimelineSpine({
  steps,
  maxRevealedIndex,
}: {
  steps: CareTimelineStep[]
  maxRevealedIndex: number
}) {
  return (
    <div className="mb-7 sm:mb-8">
      <div className={`relative ${TIMELINE_TRACK_CLASS}`}>
        {/* Background (inactive/unlit) dotted line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 z-0 h-0.5 bg-[repeating-linear-gradient(90deg,color-mix(in_srgb,var(--color-verified)_15%,transparent)_0_10px,transparent_10px_20px)]"
          aria-hidden
        />
        {/* Active (lit) solid line */}
        {maxRevealedIndex >= 1 && (
          <div
            className="pointer-events-none absolute top-6 z-0 h-0.5 bg-verified"
            style={{
              left: `${(0.5 / steps.length) * 100}%`,
              width: `${((Math.min(steps.length, maxRevealedIndex + 1) - 1) / steps.length) * 100}%`,
              transition: 'width 2000ms linear',
            }}
            aria-hidden
          />
        )}
        {steps.map((step, idx) => {
          const isLit = idx < maxRevealedIndex
          return (
            <div key={`${step.n}-node`} className={`${TIMELINE_COL_CLASS} relative z-10 flex flex-col items-center`}>
              <div
                className={clsx(
                  'flex h-12 w-12 items-center justify-center rounded-full font-jakarta text-base font-extrabold transition-all duration-500 ease-out',
                  isLit
                    ? step.qc
                      ? 'bg-verified-text text-white shadow-[0_0_0_6px_var(--color-paper),0_0_0_9px_color-mix(in_srgb,var(--color-yellow)_16%,transparent),0_8px_18px_color-mix(in_srgb,var(--color-verified-dark)_34%,transparent)]'
                      : 'bg-verified-dark text-white shadow-[0_0_0_6px_var(--color-paper),0_8px_18px_color-mix(in_srgb,var(--color-verified-dark)_32%,transparent)]'
                    : 'bg-canvas text-muted-light border border-border-subtle shadow-none',
                )}
              >
                {step.n}
              </div>
              <time
                dateTime={step.time}
                className={clsx(
                  'mt-3 font-jakarta text-xs font-extrabold tabular-nums transition-colors duration-500 ease-out',
                  isLit ? 'text-body' : 'text-muted-light',
                )}
              >
                {step.time}
              </time>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OrderCardMedia() {
  const infoPills = ['Sector 70', '₹540', '2.4 km'] as const
  const orderItems = [
    { name: 'Dal Makhani', qty: 1 },
    { name: 'Stuffed Paratha', qty: 2 },
  ] as const

  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-br from-ink to-ink/90 p-[18px]">
      <div className="rounded-[13px] bg-white p-3.5 shadow-surface-lg">
        <div className="mb-2.5 flex items-center gap-2">
          <VerifiedSeal />
          <b className="min-w-0 flex-1 font-jakarta text-[12.5px] font-extrabold leading-tight text-ink">
            New verified order
          </b>
          <span className="shrink-0 rounded-full bg-verified-dark px-2 py-0.5 font-jakarta text-[9.5px] font-extrabold tracking-[0.1em] text-white">
            NEW
          </span>
        </div>

        {orderItems.map((item, index) => (
          <div
            key={item.name}
            className={clsx(
              'flex items-center justify-between py-1.5 font-jakarta text-[13px]',
              index < orderItems.length - 1 && 'border-b border-dashed border-border-subtle',
            )}
          >
            <b className="font-bold text-ink">{item.name}</b>
            <span className="font-bold tabular-nums text-muted">× {item.qty}</span>
          </div>
        ))}

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {infoPills.map((item) => (
            <span
              key={item}
              className="rounded-md bg-surface px-2 py-1 font-jakarta text-[10.5px] font-bold text-body"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 font-jakarta text-[11px] font-extrabold text-verified-text">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          Deliver by 11:55 · arriving warm
        </div>
      </div>
    </div>
  )
}

function QCPanelMedia({ src, alt }: { src: string; alt: string }) {
  const qcItems = [
    { label: 'Portion & weight', value: '420 g' },
    { label: 'Core temperature', value: '64°C' },
    { label: 'Hygiene & gloves', value: 'OK' },
    { label: 'Seal & label', value: 'OK' },
  ] as const

  return (
    <div className="absolute inset-0">
      <Image src={src} alt={alt} fill sizes="(max-width:768px) 210px, 16vw" className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-ink/65" aria-hidden />
      <div className="absolute inset-3.5 flex flex-col rounded-xl bg-white/[0.97] p-3.5 shadow-surface-lg">
        <div className="mb-2 flex items-center gap-1.5 border-b border-border-subtle pb-2">
          <Image src={mLogo} alt="" width={16} height={16} className="h-4.5 w-4.5 object-contain" />
          <b className="font-jakarta text-[11.5px] font-extrabold tracking-[0.04em] text-ink">
            QUALITY & HYGIENE
          </b>
          <span className="ml-auto font-jakarta text-[9px] font-bold tabular-nums text-muted-light">
            QC-00194
          </span>
        </div>

        {qcItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 py-1 font-jakarta text-[11.5px] font-bold text-body"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-2.5 w-2.5 text-olive"
                aria-hidden
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            {item.label}
            <span className="ml-auto font-extrabold tabular-nums text-verified-text">{item.value}</span>
          </div>
        ))}

        <div className="mt-auto rounded-lg border-[1.5px] border-verified-pill-border bg-verified-pill px-1.5 py-1.5 text-center font-jakarta text-[11px] font-extrabold tracking-[0.16em] text-verified-text">
          ✓ PASSED · READY TO PACK
        </div>
      </div>
    </div>
  )
}

function StepMedia({ media }: { media: CareTimelineMedia }) {
  if (media.type === 'order') return <OrderCardMedia />
  if (media.type === 'qc') return <QCPanelMedia src={media.src} alt={media.alt} />
  if (media.type === 'img') {
    return (
      <>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(max-width:768px) 210px, 16vw"
          className="object-cover"
          unoptimized
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/10"
          aria-hidden
        />
      </>
    )
  }
  return null
}

/* Overhauled 3D flip card component matching homeV2 animation effect */
function TimelineStepCard({
  step,
  isRevealed,
  prefersReducedMotion,
}: {
  step: CareTimelineStep
  isRevealed: boolean
  prefersReducedMotion: boolean
}) {
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (isRevealed && !prefersReducedMotion) {
      setIsFlipping(true)
      const timer = setTimeout(() => setIsFlipping(false), 700)
      return () => clearTimeout(timer)
    }
  }, [isRevealed, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <article
        className={clsx(
          `group relative flex ${TIMELINE_COL_CLASS} snap-start flex-col overflow-hidden ${RADIUS_CARD} border bg-white shadow-surface-md transition-opacity duration-700 ease-out`,
          step.qc
            ? 'border-verified-pill-border shadow-surface-lg'
            : step.isCustomer
              ? 'border-customer border-2'
              : 'border-border-subtle',
          isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="relative aspect-[4/3.4] overflow-hidden bg-canvas">
          <StepMedia media={step.media} />
        </div>

        <div className="flex flex-1 flex-col px-[22px] pb-[22px] pt-8 text-center relative">
          <span
            className={clsx(
              'absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-surface-md',
              step.isCustomer ? 'border-customer' : 'border-olive',
            )}
          >
            <StepIcon
              icon={step.icon}
              className={clsx('h-6 w-6', step.isCustomer ? 'text-customer' : 'text-olive')}
            />
          </span>
          {step.isCustomer ? (
            <p className="body-copy-label mb-1.5 font-jakarta text-xs font-extrabold uppercase tracking-wide text-customer">
              YOUR ACTION
            </p>
          ) : (
            <p className="body-copy-label mb-1.5 font-jakarta text-xs uppercase tracking-wide text-muted-light">
              STEP {step.n}
            </p>
          )}
          <h3 className="card-title font-jakarta text-[17px] font-bold text-ink">{step.title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink/75">{step.desc}</p>
          <div className="mt-auto flex justify-center pt-[18px]">
            <StatusChip label={step.status.label} kind={step.status.kind} />
          </div>
        </div>
      </article>
    )
  }

  return (
    <div
      className={clsx(TIMELINE_COL_CLASS, 'relative')}
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full relative transition-transform duration-600 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: isFlipping ? 'transform' : 'auto',
        }}
      >
        {/* FRONT FACE (Full card content) */}
        <article
          className={clsx(
            `group relative flex w-full h-full flex-col overflow-hidden ${RADIUS_CARD} border bg-white shadow-surface-md`,
            step.qc
              ? 'border-verified-pill-border shadow-surface-lg'
              : step.isCustomer
                ? 'border-customer border-2'
                : 'border-border-subtle',
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative aspect-[4/3.4] overflow-hidden bg-canvas">
            <StepMedia media={step.media} />
          </div>

          <div className="flex flex-1 flex-col px-[22px] pb-[22px] pt-8 text-center relative">
            <span
              className={clsx(
                'absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-surface-md',
                step.isCustomer ? 'border-customer' : 'border-olive',
              )}
            >
              <StepIcon
                icon={step.icon}
                className={clsx('h-6 w-6', step.isCustomer ? 'text-customer' : 'text-olive')}
              />
            </span>
            {step.isCustomer ? (
              <p className="body-copy-label mb-1.5 font-jakarta text-xs font-extrabold uppercase tracking-wide text-customer">
                YOUR ACTION
              </p>
            ) : (
              <p className="body-copy-label mb-1.5 font-jakarta text-xs uppercase tracking-wide text-muted-light">
                STEP {step.n}
              </p>
            )}
            <h3 className="card-title font-jakarta text-[17px] font-bold text-ink">{step.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink/75">{step.desc}</p>
            <div className="mt-auto flex justify-center pt-[18px]">
              <StatusChip label={step.status.label} kind={step.status.kind} />
            </div>
          </div>
        </article>

        {/* BACK FACE (Large centered step number) */}
        <div
          className={clsx(
            `absolute inset-0 flex flex-col items-center justify-center ${RADIUS_CARD} border bg-white shadow-surface-md`,
            step.qc
              ? 'border-verified-pill-border shadow-surface-lg'
              : step.isCustomer
                ? 'border-customer border-2'
                : 'border-border-subtle',
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="font-jakarta text-6xl sm:text-7xl font-extrabold text-verified-text">
            {step.n}
          </span>
        </div>
      </div>
    </div>
  )
}

function MetricStrip() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-verified-dark sm:mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {careTimelineMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={clsx(
              'px-6 py-5 text-white sm:px-[26px] sm:py-[22px]',
              index > 0 && 'border-t border-white/14 sm:border-t-0',
              index % 2 === 1 && 'sm:border-l sm:border-white/14',
              index >= 2 && 'sm:border-t lg:border-t-0 sm:border-white/14',
              index > 0 && 'lg:border-l lg:border-t-0 lg:border-white/14',
            )}
          >
            <p className="font-jakarta text-[34px] font-extrabold leading-none tracking-[-0.03em]">
              {metric.value}
              {'mid' in metric && metric.mid ? (
                <span className="text-[0.8em] font-bold text-yellow">
                  {metric.mid}
                </span>
              ) : null}
              {'suffix' in metric && metric.suffix ? (
                <span className="text-base font-bold text-verified-pill">{metric.suffix}</span>
              ) : null}
            </p>
            <p className="mt-2 font-jakarta text-[12.5px] font-semibold leading-snug text-white/75">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const CareTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [maxRevealedIndex, setMaxRevealedIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detect prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // Timer-Based Sequential Reveal Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (interval) return

          setMaxRevealedIndex((prev) => Math.max(prev, 1))

          let current = 1
          interval = setInterval(() => {
            current++
            setMaxRevealedIndex((prev) => Math.max(prev, current))
            if (current >= careTimelineSteps.length) {
              if (interval) clearInterval(interval)
            }
          }, 2000)

          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (interval) clearInterval(interval)
    }
  }, [])

  // Center the active/revealed card horizontally in the mobile horizontal scroll container
  useEffect(() => {
    if (maxRevealedIndex > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const track = container.firstElementChild?.children[1] as HTMLElement
      if (track) {
        const activeCard = track.children[maxRevealedIndex - 1] as HTMLElement
        if (activeCard) {
          const containerWidth = container.clientWidth
          const cardWidth = activeCard.clientWidth
          const cardLeft = activeCard.offsetLeft
          const targetScroll = cardLeft - containerWidth / 2 + cardWidth / 2

          container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth',
          })
        }
      }
    }
  }, [maxRevealedIndex])

  return (
    <div ref={containerRef}>
      <Section
        id="care"
        fullWidth
        className="bg-paper"
        aria-labelledby="care-timeline-heading"
        {...VERIFIED_TRUST_SECTION_PROPS}
      >
        <div className="flex flex-col">
          <SectionHeader
            eyebrow={careTimelineHeader.eyebrow}
            id="care-timeline-heading"
            align="left"
            gradient="olive"
            accent="text-partner"
            // marginBottom={HEADER_TO_BODY_GAP}
            className="min-w-0"
            lines={[
              compactAccentLine({
                text: `${careTimelineHeader.title.toUpperCase()} `,
                accent: careTimelineHeader.titleAccent,
              }),
            ]}
            action={<VerifiedKitchenBadge variant="full" className="shrink-0" />}
          />

          {/* Caption — doubles as how-it-works per wireframe ① */}
          <p className="mb-8 font-jakarta text-[14px] text-muted">
            This is how every order travels — from your tap to your table.
          </p>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-0"
          >
            <div className="w-max lg:w-full">
              <TimelineSpine steps={careTimelineSteps} maxRevealedIndex={maxRevealedIndex} />
              <div className={`${TIMELINE_TRACK_CLASS}`}>
                {careTimelineSteps.map((step, index) => (
                  <TimelineStepCard
                    key={step.n}
                    step={step}
                    isRevealed={index < maxRevealedIndex}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </div>
          </div>

          <MetricStrip />
        </div>
      </Section>
    </div>
  )
}

export default CareTimeline

