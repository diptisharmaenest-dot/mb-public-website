'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { EASE } from '@/shared/lib/motion'
import type { AppPlatform } from '@/shared/data/app-download'
import AppDownloadContent from './AppDownloadContent'

type AppDownloadModalProps = {
  open: boolean
  source: string
  platform: AppPlatform
  onClose: () => void
}

/** Desktop: centered card with QR. Phones: bottom sheet with store buttons (no QR). */
export default function AppDownloadModal({ open, source, platform, onClose }: AppDownloadModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const isPhone = platform !== 'desktop'

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="app-download"
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-download-title"
            className="relative max-h-[92dvh] w-full overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-[26px] bg-paper shadow-[0_30px_80px_-20px_rgba(42,31,24,0.55)] sm:max-w-[780px] sm:rounded-[26px]"
            initial={isPhone ? { y: '100%' } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={isPhone ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isPhone ? { y: '100%' } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* warm brand glow — clipped so it never makes the dialog scroll */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-customer/15 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-yellow/20 blur-3xl" />
            </div>
            <div aria-hidden className="h-1.5 w-full bg-gradient-to-r from-partner via-customer to-yellow" />

            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" aria-hidden />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-5 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-card bg-white/80 text-ink/70 transition hover:bg-white hover:text-ink"
            >
              <FiX className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-9 [@media(max-height:700px)]:pb-6 [@media(max-height:700px)]:pt-4">
              <AppDownloadContent
                platform={platform}
                source={source}
                showQr={!isPhone}
                headingId="app-download-title"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
