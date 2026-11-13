'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiX, FiCheck, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from '@/components'
import type { StoreDish } from '@/features'
import { isRemoteImageUrl } from '@/shared/lib'

function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])
}

type AppDownloadModalProps = {
  isOpen: boolean
  onClose: () => void
  dish?: StoreDish | null
  kitchenName?: string
}

export function AppDownloadModal({
  isOpen,
  onClose,
  dish,
  kitchenName = "Chef Sunita's Kitchen",
}: AppDownloadModalProps) {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  useBodyScrollLock(isOpen)

  if (!isOpen) return null

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setWaitlistSubmitted(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-ink/10 bg-white p-6 shadow-2xl sm:p-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink/60 transition-colors hover:bg-border hover:text-ink cursor-pointer"
          aria-label="Close modal"
        >
          <FiX className="h-5 w-5" />
        </button>

        {dish && (
          <div className="mb-5 flex items-center gap-3.5 rounded-2xl border border-ink/8 bg-paper p-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone-100">
              <Image
                src={dish.dishImageUrl}
                alt={dish.dishName}
                fill
                className="object-cover"
                unoptimized={isRemoteImageUrl(dish.dishImageUrl)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-jakarta text-base font-bold text-ink truncate">
                {dish.dishName}
              </h4>
              <p className="text-xs font-semibold text-customer">
                ₹{dish.price} {dish.prepTime ? `· ${dish.prepTime}` : ''}
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-customer/10 text-customer">
            <FiDownload className="h-7 w-7" />
          </div>

          <h3 className="font-jakarta text-xl font-extrabold text-ink sm:text-2xl">
            Order on Mother Bhojan App
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-body">
            Ordering for <span className="font-bold text-ink">{kitchenName}</span> is currently available only through the Mother Bhojan mobile app.
          </p>

          <p className="mt-2 text-xs text-muted">
            Get live tracking, fresh home meal schedules, and direct chef communication on the app.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              href="https://motherbhojan.com/download"
              target="_blank"
              variant="customer"
              className="w-full justify-center py-3 text-sm font-bold cursor-pointer"
            >
              Download Mother Bhojan App
            </Button>

            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email for web ordering access..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-xs text-ink placeholder:text-muted focus:border-customer focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-ink-soft transition-colors cursor-pointer"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-verified-text">
                <FiCheck className="h-4 w-4" /> You are on the web ordering waitlist!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type HowToOrderModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function HowToOrderModal({ isOpen, onClose }: HowToOrderModalProps) {
  useBodyScrollLock(isOpen)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[24px] border border-ink/10 bg-white p-6 shadow-2xl sm:p-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink/60 transition-colors hover:bg-border hover:text-ink cursor-pointer"
          aria-label="Close modal"
        >
          <FiX className="h-5 w-5" />
        </button>

        <h3 className="font-jakarta text-xl font-extrabold text-ink sm:text-2xl">
          How to Order from Mother Bhojan
        </h3>
        <p className="mt-1 text-xs text-muted">
          Fresh, authentic home meals prepared by verified local mother chefs.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-paper p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-customer font-jakarta text-sm font-extrabold text-white">
              1
            </span>
            <div>
              <h4 className="font-jakarta text-sm font-bold text-ink">
                Download the Mother Bhojan App
              </h4>
              <p className="mt-0.5 text-xs text-body leading-relaxed">
                Available on iOS & Android. Browse verified home kitchens in your neighborhood.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-paper p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-customer font-jakarta text-sm font-extrabold text-white">
              2
            </span>
            <div>
              <h4 className="font-jakarta text-sm font-bold text-ink">
                Select Meal & Preparation Shift
              </h4>
              <p className="mt-0.5 text-xs text-body leading-relaxed">
                Order single meals or schedule daily lunch/dinner subscriptions prepared fresh just before delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-paper p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-customer font-jakarta text-sm font-extrabold text-white">
              3
            </span>
            <div>
              <h4 className="font-jakarta text-sm font-bold text-ink">
                Fresh Doorstep Delivery
              </h4>
              <p className="mt-0.5 text-xs text-body leading-relaxed">
                Enjoy hot, hygienic ghar ka khana packaged with care by certified chefs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            href="https://motherbhojan.com/download"
            target="_blank"
            variant="customer"
            className="w-full justify-center py-3 text-sm font-bold cursor-pointer"
          >
            Get Started on App
          </Button>
        </div>
      </div>
    </div>
  )
}

type GalleryModalProps = {
  isOpen: boolean
  onClose: () => void
  images: string[]
  initialIndex?: number
}

export function GalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  useBodyScrollLock(isOpen)

  if (!isOpen || !images.length) return null

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col items-center justify-between py-3 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex w-full items-center justify-between px-2">
          <div className="rounded-full bg-white/15 px-3.5 py-1 backdrop-blur-md">
            <span className="font-jakarta text-xs font-bold text-white">
              Photo {currentIndex + 1} of {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/35 cursor-pointer"
            aria-label="Close gallery"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Main Image Viewport with Floating Controls */}
        <div className="relative my-auto aspect-[16/10] sm:aspect-[4/3] w-full max-h-[65vh] sm:max-h-[70vh] overflow-hidden rounded-2xl bg-black shadow-2xl">
          <Image
            src={images[currentIndex]}
            alt={`Kitchen photo ${currentIndex + 1}`}
            fill
            className="object-contain transition-all duration-300"
            unoptimized={isRemoteImageUrl(images[currentIndex])}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-all hover:bg-white/45 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Previous photo"
              >
                <FiChevronLeft className="h-6 w-6 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-all hover:bg-white/45 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Next photo"
              >
                <FiChevronRight className="h-6 w-6 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto px-4 py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${idx === currentIndex
                ? 'border-customer scale-105 shadow-md opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              aria-label={`Go to photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                unoptimized={isRemoteImageUrl(img)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
