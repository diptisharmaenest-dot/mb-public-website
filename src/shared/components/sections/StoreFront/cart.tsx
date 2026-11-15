'use client'

import { useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { LuMinus, LuPlus, LuShoppingBag } from 'react-icons/lu'
import DownloadAppButton from '@/shared/components/ui/DownloadAppButton'

/**
 * Store-page cart: dishes are added on the website, but ordering happens in
 * the app — tapping the cart opens the download-app popup. Nothing is sent
 * anywhere; the cart lives only in this page.
 */
export type CartLine = { name: string; price: number; qty: number }

export function useStoreCart() {
  const [lines, setLines] = useState<Record<string, CartLine>>({})

  const qty = useCallback((name: string) => lines[name]?.qty ?? 0, [lines])
  const add = useCallback((name: string, price: number) => {
    setLines((l) => ({ ...l, [name]: { name, price, qty: (l[name]?.qty ?? 0) + 1 } }))
  }, [])
  const remove = useCallback((name: string) => {
    setLines((l) => {
      const cur = l[name]
      if (!cur) return l
      const next = { ...l }
      if (cur.qty <= 1) delete next[name]
      else next[name] = { ...cur, qty: cur.qty - 1 }
      return next
    })
  }, [])

  const { count, total } = useMemo(() => {
    let c = 0
    let t = 0
    for (const line of Object.values(lines)) {
      c += line.qty
      t += line.qty * line.price
    }
    return { count: c, total: t }
  }, [lines])

  return { qty, add, remove, count, total }
}

export type StoreCart = ReturnType<typeof useStoreCart>

/** Top-right cart — appears once something is added; opens the app popup. */
export function CartPill({ cart, className }: { cart: StoreCart; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      {cart.count > 0 ? (
        <motion.div
          key="cart"
          initial={{ opacity: 0, scale: 0.8, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className={className}
        >
          <DownloadAppButton
            source="store-cart"
            openLabel="Open the app"
            variant="none"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-b from-customer to-partner px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(219,26,26,0.8)] transition hover:-translate-y-0.5 sm:px-5 sm:text-[15px]"
          >
            <span className="relative">
              <LuShoppingBag className="h-5 w-5" aria-hidden />
              <motion.span
                key={cart.count}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-partner"
              >
                {cart.count}
              </motion.span>
            </span>
            <span>
              {cart.count} {cart.count === 1 ? 'item' : 'items'} · ₹{cart.total}
            </span>
          </DownloadAppButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/** "+" → becomes "− n +" once added. */
export function QtyControl({
  cart,
  name,
  price,
  disabled,
  size = 'md',
  tone = 'green',
}: {
  cart: StoreCart
  name: string
  price: number
  disabled?: boolean
  size?: 'sm' | 'md'
  tone?: 'green' | 'white'
}) {
  const q = cart.qty(name)
  const dim = size === 'sm' ? 'h-8' : 'h-11'
  const base = tone === 'white' ? 'bg-white text-ink shadow' : 'bg-verified-pill text-verified-dark'
  if (disabled) {
    return <span className="rounded-full bg-[#F1ECE4] px-2.5 py-1 text-[11px] font-medium text-ink/50">Not available</span>
  }
  if (q === 0) {
    return (
      <button
        type="button"
        onClick={() => cart.add(name, price)}
        aria-label={`Add ${name} to cart`}
        className={clsx(dim, size === 'sm' ? 'w-8' : 'w-11', base, 'flex cursor-pointer items-center justify-center rounded-full transition hover:scale-105')}
      >
        <LuPlus className={size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} strokeWidth={2.5} aria-hidden />
      </button>
    )
  }
  return (
    <span className={clsx(dim, 'inline-flex items-center gap-1 rounded-full bg-verified px-1 text-white shadow-sm')}>
      <button
        type="button"
        onClick={() => cart.remove(name)}
        aria-label={`Remove one ${name}`}
        className={clsx(size === 'sm' ? 'h-6 w-6' : 'h-9 w-9', 'flex cursor-pointer items-center justify-center rounded-full hover:bg-white/20')}
      >
        <LuMinus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </button>
      <span className={clsx('min-w-4 text-center font-bold', size === 'sm' ? 'text-[12px]' : 'text-[15px]')} aria-live="polite">
        {q}
      </span>
      <button
        type="button"
        onClick={() => cart.add(name, price)}
        aria-label={`Add one more ${name}`}
        className={clsx(size === 'sm' ? 'h-6 w-6' : 'h-9 w-9', 'flex cursor-pointer items-center justify-center rounded-full hover:bg-white/20')}
      >
        <LuPlus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </button>
    </span>
  )
}
