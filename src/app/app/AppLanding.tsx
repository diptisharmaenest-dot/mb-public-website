'use client'

import { useEffect, useState } from 'react'
import { AppDownloadContent } from '@/components/sections/AppDownload'
import { detectPlatform, storeUrlFor, type AppPlatform } from '@/shared/data/app-download'

/** QR target: phones go straight to their store when live; otherwise the "coming soon" card. */
export default function AppLanding() {
  const [platform, setPlatform] = useState<AppPlatform | null>(null)

  useEffect(() => {
    const p = detectPlatform(navigator.userAgent)
    const url = storeUrlFor(p)
    if (url) {
      window.location.replace(url)
      return
    }
    setPlatform(p)
  }, [])

  return (
    <section className="bg-paper px-4 pb-16 pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-[780px] overflow-hidden rounded-[26px] border border-border-card bg-paper shadow-[0_30px_80px_-30px_rgba(42,31,24,0.35)]">
        <div aria-hidden className="h-1.5 w-full bg-gradient-to-r from-partner via-customer to-yellow" />
        <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
          {platform ? (
            <AppDownloadContent platform={platform} source="app-page" showQr={platform === 'desktop'} />
          ) : (
            <p className="py-16 text-center text-ink/60">Opening the app store…</p>
          )}
        </div>
      </div>
    </section>
  )
}
