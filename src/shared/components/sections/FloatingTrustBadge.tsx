'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function FloatingTrustBadge() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Track scroll position to show/hide the side tab
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleExploreClick = () => {
    setIsOpen(false)
    const kitchensSection = document.getElementById('featured-kitchens')
    if (kitchensSection) {
      kitchensSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback scroll or navigation if needed
      window.scrollTo({ top: 950, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* 1. Scroll-Activated Side Tab */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed right-0 top-1/2 -translate-y-1/2 z-40",
          "flex items-center gap-2 py-4 px-2.5 rounded-l-2xl shadow-xl",
          "bg-olive text-paper hover:opacity-95",
          "transition-all duration-500 ease-in-out transform border-l border-y border-border/20",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
        style={{ cursor: 'pointer' }}
        aria-label="Open Trust Promise details"
      >
        <div className="flex flex-col items-center gap-1.5 font-jakarta">
          {/* Chevron Left SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 animate-pulse text-customer"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span
            className="text-[11px] font-black tracking-[0.2em] uppercase select-none font-jakarta"
            style={{ writingMode: 'vertical-rl' }}
          >
            OUR PROMISE
          </span>
        </div>
      </button>

      {/* 2. Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={clsx(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* 3. Slide-out Drawer */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-screen w-full max-w-[420px] bg-paper shadow-2xl z-50 border-l border-border",
          "flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pt-7 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-customer text-lg">✦</span>
            <h2 className="font-jakarta text-[19px] font-black text-olive tracking-tight">
              Mother Bhojan Promise
            </h2>
          </div>
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-border/40 text-text-500 hover:text-olive transition-colors"
            aria-label="Close details"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <p className="font-jakarta text-[13.5px] leading-relaxed text-text-700">
            We work hard to bring you honest, home-cooked meals from kitchens we have checked ourselves. Here is how we keep our promise:
          </p>

          {/* Pillar 1: Verified Kitchens */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-border/50 hover:shadow-sm hover:border-border transition-all group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-olive/10 text-olive group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-jakarta text-[15px] font-bold text-ink mb-1">
                Verified kitchens
              </h3>
              <p className="font-jakarta text-[12.5px] leading-relaxed text-text-500">
                We conduct an intensive 80-point in-person audit of every kitchen. Only about 1 in 20 applicants pass our checks for hygiene, space, and food preparation standards.
              </p>
            </div>
          </div>

          {/* Pillar 2: FSSAI-compliant */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-border/50 hover:shadow-sm hover:border-border transition-all group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-olive/10 text-olive group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-jakarta text-[15px] font-bold text-ink mb-1">
                FSSAI-compliant
              </h3>
              <p className="font-jakarta text-[12.5px] leading-relaxed text-text-500">
                Every mother&apos;s kitchen is registered and certified under strict Schedule-4 hygiene standards, ensuring your meals are prepared safely under guidelines.
              </p>
            </div>
          </div>

          {/* Pillar 3: Daughter's Promise */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-border/50 hover:shadow-sm hover:border-border transition-all group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-customer/10 text-customer group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.2l-1.7-1.6a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z" />
              </svg>
            </div>
            <div>
              <h3 className="font-jakarta text-[15px] font-bold text-ink mb-1">
                Daughter&apos;s Promise
              </h3>
              <p className="font-jakarta text-[12.5px] leading-relaxed text-text-500">
                Clean kitchens and careful cooking, like cooking for our own family. If anything is wrong with your meal, just tell us — we will make it right.
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-6 border-t border-border/60 bg-surface/50">
          <button
            onClick={handleExploreClick}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-olive text-white font-jakarta text-[14px] font-bold hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Explore Kitchens</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
