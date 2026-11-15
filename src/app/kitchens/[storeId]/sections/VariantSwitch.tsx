'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

/**
 * Review-only pill to flip between store layout variations (1 = logo on top,
 * 2 = "Powered by" logo at the bottom). Hidden on the real motherbhojan.com domain.
 */
export default function VariantSwitch({ variant }: { variant: 1 | 2 }) {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!/(^|\.)motherbhojan\.com$/i.test(window.location.hostname))
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full bg-ink/90 p-1 pl-3 text-[12.5px] text-white shadow-lg backdrop-blur">
      <span className="mr-1 hidden text-white/70 sm:inline">Layout</span>
      {([1, 2] as const).map((v) => (
        <Link
          key={v}
          href={v === 1 ? pathname : `${pathname}?v=2`}
          scroll={false}
          className={clsx('rounded-full px-3 py-1.5 font-semibold transition', v === variant ? 'bg-white !text-ink' : '!text-white/80 hover:!text-white')}
        >
          {v === 1 ? '1 · Logo top' : '2 · Logo bottom'}
        </Link>
      ))}
    </div>
  )
}
