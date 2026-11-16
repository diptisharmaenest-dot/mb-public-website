'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { LuArrowLeft, LuBell, LuCalendarDays, LuChefHat, LuMapPin, LuPlay, LuShare2, LuStar, LuTruck, LuUtensils } from 'react-icons/lu'
import { mLogo } from '@/assets'
import DownloadAppButton from '@/shared/components/ui/DownloadAppButton'
import { ROUTES } from '@/shared/seo'
import type { StoreFrontCategory } from './StoreFront'
import { CartPill, QtyControl, useStoreCart } from './cart'
import { ScheduleModal, type WeeklySchedule } from './schedule'

/**
 * Kitchen page for the main Home ("first version") — Cookin-style layout:
 * narrow store profile on the left, wide grid of dish cards on the right.
 * Mother Bhojan branding; real back-end data only; delivery only.
 */

type Img = string | StaticImageData

export type StoreClassicPageProps = {
  name: string
  byLine: string
  description?: string | null
  avatar?: Img | null
  cover?: Img | null
  rating?: { value: number; count: number } | null
  city: string
  categories: StoreFrontCategory[]
  backHref?: string
  /** Example store (Ananya's Kitchen) — shows the welcome banner. */
  isDemo?: boolean
  schedule?: WeeklySchedule
  cookName?: string
}

const ROUND_BTN =
  'flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgba(42,31,24,0.35)] transition hover:-translate-y-0.5'
const CARD = 'rounded-[14px] bg-white ring-1 ring-ink/8 shadow-[0_10px_26px_-22px_rgba(42,31,24,0.45)]'

export default function StoreClassicPage({ name, byLine, description, avatar, cover, rating, city, categories, backHref, isDemo, schedule, cookName }: StoreClassicPageProps) {
  const cart = useStoreCart()
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const welcome = `${byLine.replace(/^By\s+/, '') || name}'s store welcomes you`
  const cats = categories.filter((c) => c.dishes.length > 0)
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

  return (
    <div className="font-jakarta text-ink">
      {/* Top bar — back · (cart appears once a dish is added) · share. No Mother Bhojan logo in version 1. */}
      <div className="sticky top-3 z-30 mb-5 flex items-center justify-between gap-3">
        <Link href={backHref || '/'} aria-label="Back" className={ROUND_BTN}>
          <LuArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2.5">
          <CartPill cart={cart} />
          <button type="button" onClick={share} aria-label="Share this kitchen" className={clsx(ROUND_BTN, 'relative')}>
            <LuShare2 className="h-5 w-5" />
            {copied ? (
              <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] text-white">Link copied</span>
            ) : null}
          </button>
        </div>
      </div>

      {isDemo ? (
        <p className="mb-5 rounded-[12px] bg-[#FFF1D6] px-4 py-2.5 text-center text-[15px] font-semibold text-ink/80 ring-1 ring-yellow/40">
          {welcome}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-7">
        {/* ------------------------- Store profile ------------------------- */}
        <aside className="space-y-4 lg:sticky lg:top-5">
          <div>
            <div className="relative h-[120px] overflow-hidden rounded-[12px] bg-[#2a1f18]">
              {cover ? <Image src={cover} alt="" fill sizes="280px" className="object-cover" unoptimized={typeof cover === 'string'} /> : null}
            </div>
            <span className="relative -mt-9 ml-3 flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-[#FBF3E8] ring-[3px] ring-white">
              {avatar ? (
                <Image src={avatar} alt="" fill sizes="72px" className="object-cover" unoptimized={typeof avatar === 'string'} />
              ) : (
                <LuChefHat className="h-8 w-8 text-ink-soft" aria-hidden />
              )}
            </span>
            <div className="mt-2.5 flex items-center gap-2">
              <h1 className="min-w-0 break-words text-[20px] font-semibold leading-tight">{name}</h1>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verified" title="Verified on Mother Bhojan">
                <Image src={mLogo} alt="Verified on Mother Bhojan" width={16} height={16} />
              </span>
            </div>
            {byLine ? <p className="mt-0.5 text-[13.5px] text-ink/55">{byLine}</p> : null}
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F1ECE4] px-2.5 py-1 text-[12.5px] text-ink/70">
              <LuStar className="h-3.5 w-3.5 fill-yellow text-yellow" aria-hidden />
              {rating && rating.count > 0 ? (
                <>
                  <b className="text-ink">{rating.value.toFixed(1)}</b> · {rating.count} reviews
                </>
              ) : (
                'New on Mother Bhojan'
              )}
            </p>
            {description ? <p className="mt-3 text-[13px] leading-[1.6] text-ink/75">{description}</p> : null}
          </div>

          {/* How to order */}
          <Link href={ROUTES.faq} className={clsx(CARD, 'flex items-center justify-between gap-3 p-4 transition hover:-translate-y-0.5')}>
            <span>
              <span className="block text-[14px] font-semibold">How to order</span>
              <span className="block text-[12.5px] text-ink/55">All your questions answered!</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-customer to-partner text-white">
              <LuPlay className="ml-0.5 h-4 w-4 fill-white" aria-hidden />
            </span>
          </Link>

          {/* Location + schedule + notify */}
          <div className={clsx(CARD, 'space-y-3 p-4')}>
            <p className="flex items-center gap-2 text-[13px] text-ink/70">
              <LuMapPin className="h-4 w-4 text-customer" aria-hidden /> Home kitchen · {city}
            </p>
            <p className="flex items-center gap-2 text-[13px] font-semibold">
              <LuTruck className="h-4 w-4" aria-hidden /> Delivery
            </p>
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-ink py-2.5 text-[13px] font-semibold text-white transition hover:bg-ink/90"
            >
              <LuCalendarDays className="h-4 w-4" aria-hidden /> View Schedule
            </button>
            <div className="rounded-[10px] bg-[#F6F1EA] p-3">
              <p className="text-[12.5px] font-semibold">Get notified about new dishes</p>
              <DownloadAppButton
                source="store-cookin-notify"
                openLabel="Open the app"
                variant="none"
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-white py-2 text-[13px] font-semibold text-ink ring-1 ring-ink/10 transition hover:bg-[#FBF7F2]"
              >
                <LuBell className="h-4 w-4" aria-hidden /> Notify me
              </DownloadAppButton>
            </div>
          </div>

          {/* Start your own kitchen */}
          <div className="px-1 pt-1">
            <p className="text-[13px] leading-snug text-ink/55">
              Want to start your own
              <br />
              home kitchen?
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-b from-customer to-partner px-4 py-2.5 text-[13px] font-semibold !text-white shadow-[0_10px_20px_-10px_rgba(219,26,26,0.7)] transition hover:-translate-y-0.5"
            >
              Let&apos;s get <span className="font-hand text-[17px] font-normal leading-none">Mother Bhojan</span>
            </Link>
          </div>
        </aside>

        {/* ------------------------------ Menu ----------------------------- */}
        <div className="min-w-0">
          {cats.length === 0 ? (
            <p className={clsx(CARD, 'p-6 text-[15px] text-ink/60')}>The menu is being prepared — check back soon.</p>
          ) : null}
          {cats.map((c) => (
            <section key={c.name} className="mb-8">
              <h2 className="mb-3 text-[22px] font-semibold">{c.name}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {c.dishes.map((d) => (
                  <li key={d.name}>
                    <div className={clsx(CARD, 'flex h-full w-full gap-3 p-2.5 pl-3.5 text-left transition hover:-translate-y-0.5')}>
                      <span className="flex min-w-0 flex-1 flex-col py-1">
                        <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug">{d.name}</span>
                        <span className="mt-1 text-[13px] font-medium text-ink/80">₹{d.price}</span>
                        {d.description ? (
                          <span className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-ink/55">{d.description}</span>
                        ) : null}
                        <span className="mt-auto flex items-end justify-between gap-2 pt-2">
                          {typeof d.available === 'boolean' ? (
                            <span>
                              <span className="block text-[10.5px] text-ink/45">Availability</span>
                              <span
                                className={clsx(
                                  'mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10.5px] font-medium',
                                  d.available ? 'bg-verified-pill text-verified-text' : 'bg-[#F1ECE4] text-ink/55',
                                )}
                              >
                                {d.available ? 'Available' : 'Not available'}
                              </span>
                            </span>
                          ) : (
                            <span />
                          )}
                          {d.available === false ? null : <QtyControl cart={cart} name={d.name} price={d.price} size="sm" />}
                        </span>
                      </span>
                      <span className="relative h-[110px] w-[80px] shrink-0 overflow-hidden rounded-[10px] bg-[#F4EDE4]">
                        {d.image ? (
                          <Image src={d.image} alt={d.name} fill sizes="80px" className="object-cover" unoptimized={typeof d.image === 'string'} />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center">
                            <LuUtensils className="h-6 w-6 text-ink/25" aria-hidden />
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-8 border-t border-ink/10 pt-6 text-center text-[12.5px] text-ink/50">
        © {new Date().getFullYear()} Mother Bhojan ·{' '}
        <Link href={ROUTES.terms} className="hover:text-ink">
          Terms
        </Link>{' '}
        ·{' '}
        <Link href={ROUTES.privacy} className="hover:text-ink">
          Privacy
        </Link>
      </p>
      <ScheduleModal open={scheduleOpen} onClose={() => setScheduleOpen(false)} cookName={cookName || name} schedule={schedule} />
    </div>
  )
}
