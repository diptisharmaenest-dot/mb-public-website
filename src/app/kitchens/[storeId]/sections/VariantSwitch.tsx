'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

/**
 * Review-only pill to flip between store layouts:
 * Home = classic card (main Home), New·1 = new design with logo on top,
 * New·2 = new design with "Powered by" logo at the bottom (Home v2).
 * Hidden on the real motherbhojan.com domain.
 */
export default function VariantSwitch({ design, variant }: { design: 'classic' | 'v2'; variant: 1 | 2 }) {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!/(^|\.)motherbhojan\.com$/i.test(window.location.hostname))
  }, [])
  if (!show) return null

  const options = [
    { key: 'classic', label: 'Home', href: pathname, on: design === 'classic' },
    { key: 'v2-1', label: 'v2 · logo top', href: `${pathname}?design=v2`, on: design === 'v2' && variant === 1 },
    { key: 'v2-2', label: 'v2 · logo bottom', href: `${pathname}?design=v2&v=2`, on: design === 'v2' && variant === 2 },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full bg-ink/90 p-1 pl-3 text-[12.5px] text-white shadow-lg backdrop-blur">
      <span className="mr-1 hidden text-white/70 sm:inline">Layout</span>
      {options.map((o) => (
        <Link
          key={o.key}
          href={o.href}
          scroll={false}
          className={clsx('whitespace-nowrap rounded-full px-3 py-1.5 font-semibold transition', o.on ? 'bg-white !text-ink' : '!text-white/80 hover:!text-white')}
        >
          {o.label}
        </Link>
      ))}
    </div>
  )
}
