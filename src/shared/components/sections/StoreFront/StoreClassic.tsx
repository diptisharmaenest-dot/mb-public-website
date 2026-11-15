'use client'

import { useState, type ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {
  LuArrowLeft,
  LuCalendarDays,
  LuChefHat,
  LuMapPin,
  LuPlus,
  LuShare2,
  LuShoppingBag,
  LuStar,
  LuTruck,
  LuUtensils,
} from 'react-icons/lu'
import { mbLogoRed, mLogo } from '@/assets'
import DownloadAppButton from '@/shared/components/ui/DownloadAppButton'
import type { StoreFrontCategory } from './StoreFront'

/**
 * Kitchen store — "classic" design (profile left, menu right), used by the
 * main Home page: its live preview (`mode="preview"`, sample data) and the
 * real kitchen page it opens (`mode="page"`, back-end data). Delivery only
 * (no Pickup). Home v2 uses the newer StoreFront design instead.
 */

type Img = string | StaticImageData

export type StoreClassicProps = {
  mode: 'page' | 'preview'
  name: string
  /** "By …" line under the name. */
  byLine: string
  description?: string | null
  avatar?: Img | null
  cover?: Img | null
  /** Shown only with real reviews; otherwise "New on Mother Bhojan". */
  rating?: { value: number; count: number } | null
  city: string
  categories: StoreFrontCategory[]
  nameCaret?: boolean
  backHref?: string
}

function AppAction({
  mode,
  source,
  className,
  children,
  label,
}: {
  mode: StoreClassicProps['mode']
  source: string
  className: string
  children: ReactNode
  label?: string
}) {
  if (mode === 'preview') return <span className={className}>{children}</span>
  return (
    <DownloadAppButton source={source} openLabel="Open the app" variant="none" className={clsx('cursor-pointer', className)}>
      {label ? <span className="sr-only">{label}</span> : null}
      {children}
    </DownloadAppButton>
  )
}

const ROUND_BTN =
  'flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgba(42,31,24,0.35)] transition hover:-translate-y-0.5'

export default function StoreClassic({
  mode,
  name,
  byLine,
  description,
  avatar,
  cover,
  rating,
  city,
  categories,
  nameCaret,
  backHref,
}: StoreClassicProps) {
  const page = mode === 'page'
  const cats = categories.filter((c) => c.dishes.length > 0)
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: name, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      /* cancelled */
    }
  }

  const jumpTo = (i: number) => {
    setActive(i)
    if (page) document.getElementById(`menu-cat-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* ------------------------------ Profile ----------------------------- */
  const profile = (
    <div className={clsx('relative bg-white', page ? 'rounded-[22px] p-4 shadow-[0_18px_40px_-30px_rgba(42,31,24,0.5)] ring-1 ring-ink/5 lg:sticky lg:top-6' : 'px-3 pt-4')}>
      <div className={clsx('relative overflow-hidden rounded-[14px] bg-[#2a1f18]', page ? 'h-[150px]' : 'h-[102px]')}>
        {cover ? <Image src={cover} alt="" fill sizes="400px" className="object-cover" unoptimized={typeof cover === 'string'} /> : null}
      </div>
      <span
        className={clsx(
          'absolute flex items-center justify-center overflow-hidden rounded-full bg-[#FBF3E8] ring-[3px] ring-white',
          page ? 'left-7 top-[118px] h-[72px] w-[72px]' : 'left-[18px] top-[76px] h-[58px] w-[58px]',
        )}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill sizes="72px" className="object-cover" unoptimized={typeof avatar === 'string'} />
        ) : (
          <LuChefHat className="h-1/2 w-1/2 text-ink-soft" aria-hidden />
        )}
      </span>

      <div className={clsx('flex items-center gap-3 pl-1', page ? 'mt-10' : 'mt-6')}>
        {page ? (
          <h1 className="min-w-0 break-words text-[24px] font-semibold leading-tight">{name}</h1>
        ) : (
          <p className="max-w-[230px] truncate text-[22px] font-medium">
            {name}
            {nameCaret ? <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-ink align-middle" style={{ height: 24 }} /> : null}
          </p>
        )}
        <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-verified" title="Verified on Mother Bhojan">
          <Image src={mLogo} alt="Verified on Mother Bhojan" width={26} height={26} />
        </span>
      </div>
      {byLine ? <p className="mt-1 pl-1 text-[15px] text-ink/55">{byLine}</p> : null}

      <p className="mt-2.5 ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#F1ECE4] px-3 py-1 text-[14px] text-ink/70">
        <LuStar className="h-3.5 w-3.5 fill-yellow text-yellow" aria-hidden />
        {rating && rating.count > 0 ? (
          <>
            <b className="text-ink">{rating.value.toFixed(1)}</b> · {rating.count} reviews
          </>
        ) : (
          'New on Mother Bhojan'
        )}
      </p>

      {description ? <p className="mt-3 pl-1 text-[15px] leading-[1.6] text-ink/85">{description}</p> : null}

      <p className="mt-4 flex items-center gap-1.5 pl-1 text-[15px] font-semibold">
        <LuMapPin className="h-4 w-4 text-customer" aria-hidden /> Home kitchen · {city}
      </p>
      <div className="mt-2.5 flex h-[76px] items-center justify-center rounded-[12px] bg-[#E9E3D9]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-customer ring-2 ring-white">
          <LuMapPin className="h-4 w-4 text-white" aria-hidden />
        </span>
      </div>
      {/* Delivery only — no Pickup */}
      <p className="mt-3 flex items-center gap-1.5 pl-1 text-[15px] font-semibold">
        <LuTruck className="h-4 w-4" aria-hidden /> Delivery
      </p>
      <AppAction
        mode={mode}
        source="store-classic-schedule"
        className="mt-3 flex h-[42px] w-full items-center justify-center gap-2 rounded-[10px] bg-ink text-[15px] font-medium text-white transition hover:bg-ink/90"
      >
        <LuCalendarDays className="h-4 w-4" aria-hidden /> View Schedule
      </AppAction>
      <p className="mt-3 pl-1 text-[15px] font-semibold">Pre-order Now</p>
      <p className={clsx('pl-1 text-[14px] text-ink/55', page && 'pb-1')}>Order ahead in the Mother Bhojan app.</p>
    </div>
  )

  /* -------------------------------- Menu ------------------------------ */
  const menu = (
    <div className={clsx(page ? 'min-w-0' : 'bg-[#FFF8F1] px-6 pt-5')}>
      <div className="flex items-center justify-between gap-3">
        <h2 className={clsx('font-medium', page ? 'text-[26px]' : 'text-[22px]')}>Menu</h2>
        <AppAction
          mode={mode}
          source="store-classic-cart"
          className="flex items-center gap-2 rounded-full bg-customer px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-customer-hover"
        >
          <LuShoppingBag className="h-4 w-4" aria-hidden /> {page ? 'Order in the app' : '2 Items  ₹400'}
        </AppAction>
      </div>
      {cats.length > 0 ? (
        <div className={clsx('mt-2 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]', page && 'sticky top-0 z-10 -mx-1 bg-[#FBF6F0] px-1 py-2')}>
          {cats.map((c, i) =>
            page ? (
              <button
                key={c.name}
                type="button"
                onClick={() => jumpTo(i)}
                className={clsx('shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition', i === active ? 'bg-ink text-white' : 'bg-[#E9E3D9] text-ink/60 hover:text-ink')}
              >
                {c.name}
              </button>
            ) : (
              <span key={c.name} className={clsx('rounded-full px-3.5 py-2 text-[15px]', i === 0 ? 'bg-ink text-white' : 'bg-[#E9E3D9] text-ink/55')}>
                {c.name}
              </span>
            ),
          )}
        </div>
      ) : (
        <p className="mt-4 rounded-[14px] bg-white p-5 text-[15px] text-ink/60 ring-1 ring-ink/8">The menu is being prepared — check back soon.</p>
      )}
      {cats.map((c, ci) => (
        <section key={c.name} id={page ? `menu-cat-${ci}` : undefined} className={page ? 'scroll-mt-16' : undefined}>
          <h3 className={clsx('mb-2.5 font-medium', page ? 'mt-6 text-[22px]' : 'mt-3.5 text-[20px]')}>{c.name}</h3>
          <ul className={clsx('grid gap-3', page ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2')}>
            {c.dishes.map((d) => (
              <li key={d.name} className={clsx('flex gap-3 rounded-[14px] bg-white p-4 ring-1 ring-ink/8', page ? 'min-h-[128px]' : 'h-[120px]')}>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium leading-snug">{d.name}</p>
                  <p className="mt-1 text-[15px] font-medium text-customer">₹{d.price}</p>
                  {d.description ? <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink/55">{d.description}</p> : null}
                </div>
                <div className={clsx('relative shrink-0 overflow-hidden rounded-[10px] bg-[#F4EDE4]', page ? 'h-[84px] w-[84px]' : 'h-[60px] w-[60px]')}>
                  {d.image ? (
                    <Image src={d.image} alt={page ? d.name : ''} fill sizes="84px" className="object-cover" unoptimized={typeof d.image === 'string'} />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center">
                      <LuUtensils className="h-6 w-6 text-ink/25" aria-hidden />
                    </span>
                  )}
                  {page ? (
                    <AppAction
                      mode={mode}
                      source="store-classic-add"
                      label={`Add ${d.name}`}
                      className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow"
                    >
                      <LuPlus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    </AppAction>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )

  if (!page) {
    return (
      <div className="grid h-[636px] grid-cols-[335px_1fr] font-jakarta text-ink">
        {profile}
        {menu}
      </div>
    )
  }

  return (
    <div className="font-jakarta text-ink">
      {/* Top bar — back · Mother Bhojan logo · share (site header is hidden on store pages) */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <Link href={backHref || '/'} aria-label="Back" className={ROUND_BTN}>
          <LuArrowLeft className="h-5 w-5" />
        </Link>
        <Link href="/" aria-label="Mother Bhojan home" className="transition hover:opacity-85">
          <Image src={mbLogoRed} alt="Mother Bhojan" priority className="h-10 w-auto sm:h-12" />
        </Link>
        <button type="button" onClick={share} aria-label="Share this kitchen" className={clsx(ROUND_BTN, 'relative')}>
          <LuShare2 className="h-5 w-5" />
          {copied ? (
            <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] text-white">Link copied</span>
          ) : null}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start lg:gap-8">
        {profile}
        {menu}
      </div>

      <p className="mt-10 border-t border-ink/10 pt-6 text-center text-[12.5px] text-ink/50">
        © {new Date().getFullYear()} Mother Bhojan ·{' '}
        <Link href="/terms" className="hover:text-ink">
          Terms
        </Link>{' '}
        ·{' '}
        <Link href="/privacy" className="hover:text-ink">
          Privacy
        </Link>
      </p>
    </div>
  )
}
