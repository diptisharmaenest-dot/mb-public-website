'use client'

import { useEffect, useState } from 'react'
import { isSupportOpen } from '@/shared/data/contact'

/**
 * Live "open now" flag (India time), re-checked every minute.
 * `null` until mounted, so server and browser render the same HTML.
 */
export function useSupportOpen(): boolean | null {
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const tick = () => setOpen(isSupportOpen())
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return open
}
