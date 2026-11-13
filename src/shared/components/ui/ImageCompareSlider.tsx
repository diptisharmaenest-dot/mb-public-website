'use client'

import type { StaticImageData } from 'next/image'
import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { isRemoteImageUrl } from '@/shared/lib'
import { RADIUS_CARD } from '@/components'
import { mLogo } from '@/assets'

const MIN = 5
const MAX = 95

type ImageSource = string | StaticImageData

function imageSrc(src: ImageSource): string {
  return typeof src === 'string' ? src : src.src
}

type ImageCompareSliderProps = {
  beforeSrc: ImageSource
  afterSrc: ImageSource
  beforeLabel?: string
  afterLabel?: string
  beforeAlt: string
  afterAlt: string
  className?: string
  heightClassName?: string
  imageSizes?: string
  imageClassName?: string
}

export default function ImageCompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Original',
  afterLabel = 'Enhanced',
  beforeAlt,
  afterAlt,
  className,
  heightClassName = 'h-[260px]',
  imageSizes = '252px',
  imageClassName = 'object-cover',
}: ImageCompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const draggingRef = useRef(false)

  // Divider at `position%` from the left — original fills that width, enhanced fills the rest.
  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return

    const { left, width } = el.getBoundingClientRect()
    const ratio = ((clientX - left) / width) * 100
    setPosition(Math.min(MAX, Math.max(MIN, ratio)))
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updatePosition(event.clientX)
  }

  const stopDragging = () => {
    draggingRef.current = false
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        `relative w-full cursor-ew-resize touch-none select-none overflow-hidden ${RADIUS_CARD}`,
        heightClassName,
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      role="slider"
      aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={Math.round(position)}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes={imageSizes}
        unoptimized={isRemoteImageUrl(imageSrc(afterSrc))}
        className={imageClassName}
        draggable={false}
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes={imageSizes}
          unoptimized={isRemoteImageUrl(imageSrc(beforeSrc))}
          className={imageClassName}
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-solution-card"
        style={{ left: `${position}%` }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute top-1/2 z-20 flex h-6.5 w-6.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#7B9945] border-2 border-white shadow-md"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <Image src={mLogo} alt="" width={16} height={16} className="w-4 h-4 object-contain brightness-0 invert" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-2.5 z-20 flex justify-between px-2.5">
        <span className="rounded-md bg-[#7B9945] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm flex items-center gap-1">
          ✓ {beforeLabel.replace(/^✓\s*/, '')}
        </span>
        <span className="rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm">
          {afterLabel.replace(/^✓\s*/, '')}
        </span>
      </div>
    </div>
  )
}
