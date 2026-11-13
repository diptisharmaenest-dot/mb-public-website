'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import clsx from 'clsx'
import { compactAccentLine, Section, SectionHeader } from '@/components'
import { EASE } from '@/shared/lib/motion'
import { ROUTES } from '@/shared/seo'
import { VERIFIED_TRUST_SECTION_PROPS } from '@/shared/data/verified-kitchen'
import {
  DEFAULT_MOTHER_INDEX,
  MEET_OUR_MOTHERS,
  type MotherProfile,
} from '../../data/meet-our-mothers'
import './meet-our-mothers.css'

const GLOBE_VIEWPORT_SCALE = 1.14
const SWIPE_THRESHOLD_PX = 45
const MOTHER_COUNT = MEET_OUR_MOTHERS.length

function getWrappedOffset(cardIndex: number, activeIndex: number): number {
  let offset = cardIndex - activeIndex
  if (offset > MOTHER_COUNT / 2) offset -= MOTHER_COUNT
  if (offset < -MOTHER_COUNT / 2) offset += MOTHER_COUNT
  return offset
}

// ==========================================
// Autoplay Hook
// ==========================================

const CENTER_FOCUS_MS = 7000
const MANUAL_PAUSE_MS = 10000

type UseMothersCarouselAutoplayOptions = {
  isInView: boolean
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  prefersReducedMotion: boolean | null
}

function useMothersCarouselAutoplay({
  isInView,
  activeIndex,
  setActiveIndex,
  prefersReducedMotion,
}: UseMothersCarouselAutoplayOptions) {
  const autoPausedRef = useRef(false)
  const hoverHeldRef = useRef(false)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoTimer = useCallback(() => {
    if (autoTimeoutRef.current !== null) {
      clearTimeout(autoTimeoutRef.current)
      autoTimeoutRef.current = null
    }
  }, [])

  const scheduleNext = useCallback(() => {
    clearAutoTimer()
    if (
      !isInView ||
      autoPausedRef.current ||
      hoverHeldRef.current ||
      prefersReducedMotion
    ) {
      return
    }

    autoTimeoutRef.current = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % MOTHER_COUNT)
    }, CENTER_FOCUS_MS)
  }, [clearAutoTimer, isInView, prefersReducedMotion, setActiveIndex])

  const pauseAutoplay = useCallback(() => {
    autoPausedRef.current = true
    clearAutoTimer()

    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current)
    }

    pauseTimeoutRef.current = setTimeout(() => {
      autoPausedRef.current = false
      scheduleNext()
    }, MANUAL_PAUSE_MS)
  }, [clearAutoTimer, scheduleNext])

  const holdAutoplayForHover = useCallback(() => {
    hoverHeldRef.current = true
    clearAutoTimer()
  }, [clearAutoTimer])

  const releaseAutoplayFromHover = useCallback(() => {
    hoverHeldRef.current = false
    scheduleNext()
  }, [scheduleNext])

  useEffect(() => {
    scheduleNext()
    return clearAutoTimer
  }, [activeIndex, isInView, scheduleNext, clearAutoTimer])

  useEffect(
    () => () => {
      clearAutoTimer()
      if (pauseTimeoutRef.current !== null) {
        clearTimeout(pauseTimeoutRef.current)
      }
    },
    [clearAutoTimer],
  )

  return { pauseAutoplay, holdAutoplayForHover, releaseAutoplayFromHover }
}

// ==========================================
// Cover Flow Helpers
// ==========================================

const ANGLE_STEP_DEG = 30
const MOTHERS_MORPH_EASE = [0.22, 0.61, 0.36, 1] as const
const MOTHERS_MORPH_DURATION_S = 0.9

const PORTRAIT_MORPH_TRANSITION: Transition = {
  duration: MOTHERS_MORPH_DURATION_S,
  ease: MOTHERS_MORPH_EASE,
}

const GLOBE_FORWARD_Z = 120

type GlobeLayout = {
  angleDeg: number
  x: number
  y: number
  z: number
  rotateY: number
  scale: number
  opacity: number
  blur: number
  zIndex: number
}

function getGlobeLayout(offset: number, radius: number): GlobeLayout {
  const abs = Math.abs(offset)
  const NEIGHBOR_ANGLE_DEG = ANGLE_STEP_DEG * 0.93
  const angleDeg =
    abs === 0 ? 0 : abs === 1 ? Math.sign(offset) * NEIGHBOR_ANGLE_DEG : offset * ANGLE_STEP_DEG

  const angleRad = (angleDeg * Math.PI) / 180

  const x = Math.round(radius * Math.sin(angleRad))
  let z = Math.round(radius * (Math.cos(angleRad) - 1) + GLOBE_FORWARD_Z)

  if (abs === 2) {
    const neighborAngleRad = (NEIGHBOR_ANGLE_DEG * Math.PI) / 180
    const neighborZ = radius * (Math.cos(neighborAngleRad) - 1) + GLOBE_FORWARD_Z
    z = Math.round(z + (neighborZ - z) * 0.33)
  }

  const y = Math.round(Math.sin(Math.abs(angleRad)) * 18) * (offset === 0 ? -1 : 1)

  const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.86
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.32
  const blur = abs <= 1 ? 0 : 1
  const zIndex = abs === 0 ? 50 : abs === 1 ? 30 : 10

  const side = offset < 0 ? -1 : offset > 0 ? 1 : 0
  const rotateY =
    abs === 0 ? 0 : abs === 1 ? side * 22 : side * 30

  return {
    angleDeg,
    x,
    y,
    z,
    rotateY,
    scale,
    opacity,
    blur,
    zIndex,
  }
}

function globeMotion(offset: number, radius: number): TargetAndTransition {
  const layout = getGlobeLayout(offset, radius)

  return {
    x: `calc(-50% + ${layout.x}px)`,
    y: `calc(-50% + ${layout.y}px)`,
    z: layout.z,
    rotateY: layout.rotateY,
    scale: layout.scale,
    opacity: layout.opacity,
    filter: layout.blur > 0 ? `blur(${layout.blur}px)` : 'blur(0px)',
    zIndex: layout.zIndex,
  }
}

function getStageRadius(
  viewportWidth: number,
  cardWidth: number,
  isMobile: boolean,
) {
  if (isMobile) {
    return Math.round(cardWidth * 1.15)
  }

  const outerScale = 0.83
  const outerHalf = (cardWidth * outerScale) / 2
  const edgePad = Math.max(40, Math.round(viewportWidth * 0.03))
  const maxOuterCenterX = viewportWidth / 2 - edgePad - outerHalf
  const outerAngleRad = ((ANGLE_STEP_DEG * 2) * Math.PI) / 180
  const fitted = maxOuterCenterX / Math.sin(outerAngleRad)

  return Math.round(Math.min(1100, Math.max(560, fitted)))
}

function getStagePerspective(_radius: number, isMobile: boolean) {
  if (isMobile) return 0
  return 1400
}

function isFocusedOffset(offset: number) {
  return offset === 0
}

function portraitShadow(offset: number) {
  const abs = Math.abs(offset)
  if (abs === 1) {
    return '0 16px 34px -18px rgba(43,40,34,0.26)'
  }
  return '0 6px 14px -12px rgba(43,40,34,0.08)'
}

// ==========================================
// Inner MotherPortrait Component
// ==========================================

type MotherPortraitProps = {
  mother: MotherProfile
  displayOffset: number
  cardWidth: number
  cardHeight: number
  radius: number
  prefersReducedMotion: boolean | null
  snap?: boolean
  onSelect: () => void
  onCenterHoverChange?: (hovered: boolean) => void
}

function MotherPortrait({
  mother,
  displayOffset,
  cardWidth,
  cardHeight,
  radius,
  prefersReducedMotion,
  snap = false,
  onSelect,
  onCenterHoverChange,
}: MotherPortraitProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const href = `${ROUTES.kitchens}/${encodeURIComponent(mother.storeId)}`
  const isActive = isFocusedOffset(displayOffset)
  const absOffset = Math.abs(displayOffset)
  const isMobile = cardWidth < 280
  const layout = getGlobeLayout(displayOffset, radius)
  const pad = isMobile ? 16 : 22
  const showArrow = absOffset <= 1

  const hoverChangeRef = useRef(onCenterHoverChange)
  useEffect(() => {
    hoverChangeRef.current = onCenterHoverChange
  }, [onCenterHoverChange])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive && !prefersReducedMotion) {
      const playPromise = video.play()
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
    } else {
      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
    }
  }, [isActive, prefersReducedMotion, mother.id])

  useEffect(() => {
    if (!isActive) hoverChangeRef.current?.(false)
  }, [isActive])

  const handleSelect = () => {
    if (!isActive) onSelect()
  }

  return (
    <motion.article
      initial={false}
      animate={globeMotion(displayOffset, radius)}
      transition={
        snap
          ? { duration: 0 }
          : prefersReducedMotion
            ? { duration: 0.22 }
            : PORTRAIT_MORPH_TRANSITION
      }
      className={clsx(
        'mothers-portrait-shell',
        isActive ? 'cursor-default' : 'cursor-pointer',
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex: layout.zIndex,
        pointerEvents: absOffset > 1 ? 'none' : 'auto',
      }}
      onPointerEnter={() => {
        if (isActive) onCenterHoverChange?.(true)
      }}
      onPointerLeave={() => {
        if (isActive) onCenterHoverChange?.(false)
      }}
      onClick={handleSelect}
      aria-current={isActive ? 'true' : undefined}
      aria-label={`${mother.name}, ${mother.kitchen}`}
    >
      <div
        className={clsx(
          'h-full w-full',
          isActive && !prefersReducedMotion && 'mothers-portrait-float',
        )}
      >
        <div
          tabIndex={0}
          className={clsx(
            'mothers-portrait-card relative h-full w-full overflow-hidden bg-[#DDD6C7] outline-none',
            isMobile ? 'rounded-[18px]' : 'rounded-[22px]',
          )}
          style={{ boxShadow: portraitShadow(displayOffset) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mother.posterSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />

          {isActive && !prefersReducedMotion ? (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              aria-hidden
            >
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                poster={mother.posterSrc}
                className="h-full w-full object-cover"
              >
                <source src={mother.videoSrc} type="video/mp4" />
              </video>
            </motion.div>
          ) : null}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-partner/90 via-black/55 to-transparent transition-[height] duration-[450ms]"
            style={{
              height: isActive ? '50%' : '0',
            }}
            aria-hidden
          />

          <p
            className={clsx(
              'pointer-events-none absolute inset-x-0 z-[3] font-hand italic leading-[1.36] tracking-[0.2px] text-[#FBF7EF] transition-all duration-[420ms]',
              isMobile ? 'text-[18px]' : 'text-[20px]',
            )}
            style={{
              left: pad,
              right: pad,
              bottom: isActive ? (isMobile ? 66 : 84) : 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            &ldquo;{mother.quote}&rdquo;
          </p>

          <div
            className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between gap-3"
            style={{ left: pad, right: pad, bottom: pad }}
          >
            <div className="min-w-0 text-left">
              <p
                className={clsx(
                  'm-0 font-jakarta font-bold leading-[1.15] tracking-[0.2px] text-[#FDFBF6] ',
                  isActive
                    ? isMobile
                      ? 'text-[20px]'
                      : 'text-[20px]'
                    : isMobile
                      ? 'text-[15px]'
                      : 'text-[17px]',
                )}
              >
                {mother.name}
              </p>
              <p
                className={clsx(
                  'm-0 mt-[3px] font-jakarta font-normal tracking-[0.2px] text-[rgba(253,251,246,0.82)]',
                  isActive
                    ? isMobile
                      ? 'text-[13px]'
                      : 'text-[14px]'
                    : isMobile
                      ? 'text-[12px]'
                      : 'text-[13px]',
                )}
              >
                {mother.kitchen}
              </p>
            </div>

            {showArrow ? (
              isActive ? (
                <Link
                  href={href}
                  onClick={(event) => event.stopPropagation()}
                  className={clsx(
                    'group flex shrink-0 items-center justify-center rounded-full bg-[#FBF7EF] text-[#2E3D2E] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive',
                    isMobile ? 'h-11 w-11' : 'h-[50px] w-[50px]',
                  )}
                  aria-label={`Visit ${mother.name}'s kitchen`}
                >
                  <FiArrowRight className="h-[17px] w-[17px]" strokeWidth={1.8} aria-hidden />
                </Link>
              ) : (
                <span
                  className={clsx(
                    'flex shrink-0 items-center justify-center rounded-full border border-[rgba(251,247,239,0.55)] bg-transparent text-[#FBF7EF]',
                    isMobile ? 'h-9 w-9' : 'h-10 w-10',
                  )}
                  aria-hidden
                >
                  <FiArrowRight className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ==========================================
// Layout Hook
// ==========================================

function useCarouselLayout() {
  const [layout, setLayout] = useState(() => {
    const cardWidth = 336
    const cardHeight = 516
    const radius = getStageRadius(1280, cardWidth, false)

    return {
      isMobile: false,
      cardWidth,
      cardHeight,
      radius,
      perspective: getStagePerspective(radius, false),
      stageHeight: Math.round((cardHeight + 110) * GLOBE_VIEWPORT_SCALE),
    }
  })

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      const isMobile = width < 720
      const cardWidth = isMobile ? 232 : width < 1100 ? 300 : 336
      const cardHeight = isMobile ? 372 : width < 1100 ? 460 : 516
      const radius = getStageRadius(width, cardWidth, isMobile)
      const perspective = getStagePerspective(radius, isMobile)
      const baseHeight = cardHeight + (isMobile ? 64 : 110)
      const stageHeight = Math.round(
        baseHeight * (isMobile ? 1 : GLOBE_VIEWPORT_SCALE),
      )

      setLayout({
        isMobile,
        cardWidth,
        cardHeight,
        radius,
        perspective,
        stageHeight,
      })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return layout
}

// ==========================================
// Carousel Navigation Arrow Component
// ==========================================

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  label: string
}) {
  const Icon = direction === 'left' ? FiChevronLeft : FiChevronRight

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={clsx(
        'flex h-[52px] w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(46,45,40,0.22)] bg-transparent text-ink transition-all duration-200',
        'hover:-translate-y-0.5 hover:bg-[rgba(46,45,40,0.06)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive',
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
    </button>
  )
}

// ==========================================
// Main MeetOurMothers Component
// ==========================================

const MeetOurMothers = () => {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_MOTHER_INDEX)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(carouselRef, { amount: 0.35 })
  const prefersReducedMotion = useReducedMotion()
  const { cardWidth, cardHeight, radius, perspective, stageHeight, isMobile } =
    useCarouselLayout()

  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex)
  useEffect(() => {
    setPrevActiveIndex(activeIndex)
  }, [activeIndex])

  const { pauseAutoplay, holdAutoplayForHover, releaseAutoplayFromHover } =
    useMothersCarouselAutoplay({
      isInView,
      activeIndex,
      setActiveIndex,
      prefersReducedMotion,
    })

  const handleCenterHoverChange = useCallback(
    (hovered: boolean) => {
      if (hovered) holdAutoplayForHover()
      else releaseAutoplayFromHover()
    },
    [holdAutoplayForHover, releaseAutoplayFromHover],
  )

  const goToMother = useCallback(
    (motherIndex: number) => {
      pauseAutoplay()
      setActiveIndex(motherIndex)
    },
    [pauseAutoplay],
  )

  const goPrev = useCallback(() => {
    pauseAutoplay()
    setActiveIndex((current) => (current - 1 + MOTHER_COUNT) % MOTHER_COUNT)
  }, [pauseAutoplay])

  const goNext = useCallback(() => {
    pauseAutoplay()
    setActiveIndex((current) => (current + 1) % MOTHER_COUNT)
  }, [pauseAutoplay])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  const dragStart = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current
    dragStart.current = null
    if (!start) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) return

    if (dx < 0) goNext()
    else goPrev()
  }

  return (
    <Section
      id="meet-our-mothers"
      aria-labelledby="meet-our-mothers-heading"
      className="bg-paper"
      {...VERIFIED_TRUST_SECTION_PROPS}
      fullWidth
      noPaddingX
    >
      <motion.header
        className="gutter-x mb-2 w-full text-center md:mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div className="mx-auto w-full max-w-wide">
          <SectionHeader
            eyebrow="The women behind your meal"
            lines={[
              compactAccentLine({
                text: 'Meet Our',
                accent: 'home chefs',
              }),
            ]}
            id="meet-our-mothers-heading"
            classNames={{ description: '!text-ink', header: '!mb-1.5' }}
            marginBottom="mb-0"
          />
        </div>
      </motion.header>

      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Meet our mothers — portrait ${activeIndex + 1} of ${MOTHER_COUNT}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className="mothers-carousel-bleed cursor-grab outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-olive/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <div
          className="mothers-carousel-stage"
          style={{
            height: stageHeight,
            paddingInline: isMobile ? 12 : 0,
            perspective: isMobile ? undefined : `${perspective}px`,
          }}
        >
          <div className="mothers-globe">
            {MEET_OUR_MOTHERS.map((mother, index) => {
              const displayOffset = getWrappedOffset(index, activeIndex)
              if (Math.abs(displayOffset) > 2) return null

              const prevOffset = getWrappedOffset(index, prevActiveIndex)
              const snap = Math.abs(displayOffset - prevOffset) > 2

              return (
                <MotherPortrait
                  key={mother.id}
                  mother={mother}
                  displayOffset={displayOffset}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  radius={radius}
                  prefersReducedMotion={prefersReducedMotion}
                  snap={snap}
                  onSelect={() => goToMother(index)}
                  onCenterHoverChange={handleCenterHoverChange}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="gutter-x mt-10 w-full">
        <div className="mx-auto flex max-w-wide items-center justify-center gap-[22px]">
          <CarouselArrow
            direction="left"
            onClick={goPrev}
            label="Previous mother portrait"
          />

          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Mother portrait navigation"
          >
            {MEET_OUR_MOTHERS.map((mother, index) => (
              <button
                key={mother.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show portrait of ${mother.name}`}
                onClick={() => goToMother(index)}
                className={clsx(
                  'h-2 rounded-full border-none p-0 transition-all duration-300',
                  index === activeIndex
                    ? 'w-[26px] bg-ink'
                    : 'w-2 bg-[#CBC3B4]',
                )}
              />
            ))}
          </div>

          <CarouselArrow
            direction="right"
            onClick={goNext}
            label="Next mother portrait"
          />
        </div>
      </div>
    </Section>
  )
}

export default MeetOurMothers
