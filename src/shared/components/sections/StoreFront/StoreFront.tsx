'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {
  LuArrowLeft,
  LuCalendarDays,
  LuChefHat,
  LuChevronRight,
  LuClock,
  LuCookingPot,
  LuDownload,
  LuLeaf,
  LuMapPin,
  LuPlus,
  LuShare2,
  LuShieldCheck,
  LuStar,
  LuUtensils,
} from 'react-icons/lu'
import { MdDeliveryDining, MdVerified } from 'react-icons/md'
import DownloadAppButton from '@/shared/components/ui/DownloadAppButton'
import { mbLogoRed, mLogo } from '@/assets'
import { CartPill, QtyControl, useStoreCart } from './cart'
import { ScheduleModal, type WeeklySchedule } from './schedule'
import { StoreWelcome } from './welcome'

/**
 * Kitchen store front (v2 design) — used by real kitchen pages (/kitchens/…)
 * with live back-end data, and by the "Your name on the door" live preview
 * with sample data (`mode="preview"`: no popups/links, purely visual).
 */

type Img = string | StaticImageData

export type StoreFrontDish = {
  name: string
  description: string
  price: number
  image?: Img | null
  /** From the back-end's inventory flag (real kitchen pages only). */
  available?: boolean
}
export type StoreFrontCategory = { name: string; dishes: StoreFrontDish[] }

export type StoreFrontProps = {
  mode: 'page' | 'preview'
  name: string
  /** e.g. "Homemade Chinese • North Indian" — omitted when unknown. */
  cuisine?: string
  avatar?: Img | null
  cover?: Img | null
  /** Shown only for kitchens with real reviews; otherwise "New on Mother Bhojan". */
  rating?: { value: number; count: number } | null
  city: string
  deliveryLabel: string
  preorderLabel: string
  categories: StoreFrontCategory[]
  /** Blinking caret after the name (live preview typing). */
  nameCaret?: boolean
  backHref?: string
  /** Where the page is shared from (page mode). */
  shareUrl?: string
  /**
   * Page layout variation: 1 = Mother Bhojan logo in the top bar;
   * 2 = cook's brand first, "Powered by Mother Bhojan" logo at the bottom (Cookin-style).
   */
  variant?: 1 | 2
  /** Example store (Ananya's Kitchen) — shows the welcome banner. */
  isDemo?: boolean
  /** Cook's first name, for the example store's welcome banner. */
  ownerName?: string
  schedule?: WeeklySchedule
  cookName?: string
}

const ROUND_BTN =
  'flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgba(42,31,24,0.35)] transition hover:-translate-y-0.5 sm:h-12 sm:w-12'

/** Page mode → opens the app popup; preview mode → plain element. */
function AppAction({
  mode,
  source,
  className,
  children,
  label,
}: {
  mode: StoreFrontProps['mode']
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

function Avatar({ src, mode }: { src?: Img | null; mode: StoreFrontProps['mode'] }) {
  return (
    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FBF3E8] ring-4 ring-white sm:h-[150px] sm:w-[150px]">
      {src ? (
        <Image src={src} alt="" fill sizes="150px" className="object-cover" unoptimized={mode === 'page' && typeof src === 'string'} />
      ) : (
        <LuChefHat className="h-1/2 w-1/2 text-ink-soft" aria-hidden />
      )}
    </span>
  )
}

export default function StoreFront(props: StoreFrontProps) {
  const {
    mode, name, cuisine, avatar, cover, rating, city, deliveryLabel, preorderLabel, categories, nameCaret, backHref, shareUrl,
    ownerName,
    schedule,
    cookName,
  } = props
  const cats = useMemo(() => categories.filter((c) => c.dishes.length > 0), [categories])
  const [active, setActive] = useState(0)
  const current = cats[Math.min(active, Math.max(cats.length - 1, 0))]
  const [copied, setCopied] = useState(false)
  const cart = useStoreCart()
  const [scheduleOpen, setScheduleOpen] = useState(false)

  const share = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '')
    try {
      if (navigator.share) await navigator.share({ title: name, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="font-jakarta text-ink">
      {/* Top bar — back · cart · share (no Mother Bhojan logo: the cook's store comes first) */}
      {mode === 'page' ? (
        <div className="sticky top-3 z-30 mb-5 flex items-center justify-between gap-3">
          <Link
            href={backHref || '/'}
            aria-label="Back to Mother Bhojan home"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-white pl-3 pr-4 shadow-[0_6px_18px_-8px_rgba(42,31,24,0.35)] transition hover:-translate-y-0.5 sm:h-12"
          >
            <LuArrowLeft className="h-5 w-5 transition group-hover:-translate-x-0.5" />
            <Image src={mbLogoRed} alt="Mother Bhojan" className="h-6 w-auto sm:h-7" />
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
      ) : null}

      {mode === 'page' ? <StoreWelcome cookName={cookName || ownerName || name} storeName={name} avatar={avatar} city={city} /> : null}

      {/* Banner */}
      <div className="relative overflow-hidden rounded-[22px] bg-[#1d1611] sm:rounded-[26px]">
        {cover ? (
          <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]">
            <Image src={cover} alt="" fill sizes="(max-width: 640px) 100vw, 62vw" className="object-cover" unoptimized={typeof cover === 'string'} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1d1611] via-[#1d1611]/60 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(225,87,76,0.35),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(141,165,82,0.3),transparent_50%)]" />
        )}
        <div className="relative flex items-center gap-4 px-5 pb-14 pt-6 sm:gap-7 sm:px-8 sm:pb-20 sm:pt-7">
          <Avatar src={avatar} mode={mode} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="max-w-full break-words text-[24px] font-bold leading-tight text-white sm:truncate sm:text-[40px]">
                {name}
                {nameCaret ? <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse bg-white align-middle" /> : null}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-verified-pill px-3 py-1 text-[13px] font-semibold text-verified-text">
                <MdVerified className="h-4 w-4 text-verified" aria-hidden /> Verified Kitchen
              </span>
            </div>
            {cuisine ? <p className="mt-1.5 text-[15px] text-white/85 sm:text-[19px]">{cuisine}</p> : null}
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[14px] text-white sm:text-[16px]">
              <LuStar className="h-4.5 w-4.5 fill-yellow text-yellow" aria-hidden />
              {rating && rating.count > 0 ? (
                <>
                  <b className="text-[17px] sm:text-[20px]">{rating.value.toFixed(1)}</b>
                  <span className="text-white/80">({rating.count} reviews)</span>
                </>
              ) : (
                <span>New on Mother Bhojan</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="relative z-10 mx-2 -mt-9 flex flex-col gap-3 rounded-[18px] bg-white px-5 py-4 shadow-[0_18px_40px_-26px_rgba(42,31,24,0.5)] ring-1 ring-ink/5 sm:mx-4 sm:-mt-12 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-ink/10 lg:py-3.5">
        <p className="flex items-center gap-2.5 text-[15px] font-medium lg:pr-8">
          <LuMapPin className="h-5 w-5 shrink-0 text-ink/70" aria-hidden /> {city}
        </p>
        <p className="flex items-center gap-2.5 text-[15px] font-medium lg:px-8">
          <MdDeliveryDining className="h-6 w-6 shrink-0 text-verified" aria-hidden /> {deliveryLabel}
        </p>
        <p className="flex items-center gap-2.5 text-[15px] font-medium lg:flex-1 lg:px-8">
          <LuClock className="h-5 w-5 shrink-0 text-ink/70" aria-hidden /> {preorderLabel}
        </p>
        {mode === 'page' ? (
          <button type="button" onClick={() => setScheduleOpen(true)} className={clsx('cursor-pointer', 'inline-flex items-center justify-center gap-2 rounded-full bg-partner-tag px-5 py-2.5 text-[15px] font-semibold text-partner transition hover:bg-partner-muted lg:ml-6 lg:border-0')}>
          <LuCalendarDays className="h-5 w-5" aria-hidden /> View delivery slots <LuChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 rounded-full bg-partner-tag px-5 py-2.5 text-[15px] font-semibold text-partner transition hover:bg-partner-muted lg:ml-6 lg:border-0">
          <LuCalendarDays className="h-5 w-5" aria-hidden /> View delivery slots <LuChevronRight className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>

      {/* Menu */}
      <div className={clsx('mt-8 flex flex-col gap-4 sm:mt-10 lg:flex-row lg:items-center lg:gap-10', mode === 'page' && 'sticky top-16 z-20 -mx-2 bg-[#FBF6F0]/95 px-2 py-2 backdrop-blur')}>
        <h2 className="relative w-fit pb-3 text-[28px] font-bold sm:text-[34px]">
          Our Menu
          <span className="absolute bottom-0 left-0 h-1 w-16 rounded-full bg-partner" aria-hidden />
        </h2>
        {cats.length > 0 ? (
          <div role="tablist" aria-label="Menu categories" className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {cats.map((c, i) => {
              const selected = c === current
              const cls = clsx(
                'shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-medium transition',
                selected ? 'bg-gradient-to-b from-customer to-partner text-white shadow-md' : 'bg-[#F1EAE1] text-ink hover:bg-[#EADFD2]',
              )
              return mode === 'preview' ? (
                <span key={c.name} className={cls}>
                  {c.name} ({c.dishes.length})
                </span>
              ) : (
                <button key={c.name} type="button" role="tab" aria-selected={selected} onClick={() => {
                    setActive(i)
                    document.getElementById(`v2-cat-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }} className={clsx(cls, 'cursor-pointer')}>
                  {c.name} ({c.dishes.length})
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      {cats.length > 0 ? (
        cats.map((c, ci) => (
          <section key={c.name} id={mode === 'page' ? `v2-cat-${ci}` : undefined} className="scroll-mt-40">
            <h3 className="mb-3 mt-7 text-[21px] font-bold sm:text-[24px]">{c.name}</h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {c.dishes.map((d) => (
                <li key={d.name} className="flex gap-4 rounded-[18px] bg-white p-3.5 shadow-[0_12px_30px_-24px_rgba(42,31,24,0.5)] ring-1 ring-ink/5">
                  <span className="relative h-[110px] w-[130px] shrink-0 overflow-hidden rounded-[12px] bg-[#F4EDE4] sm:h-[150px] sm:w-[220px]">
                    {d.image ? (
                      <Image src={d.image} alt={d.name} fill sizes="220px" className="object-cover" unoptimized={typeof d.image === 'string'} />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center">
                        <LuUtensils className="h-8 w-8 text-ink/25" aria-hidden />
                      </span>
                    )}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col py-1">
                    <p className="text-[16px] font-bold leading-snug sm:text-[19px]">{d.name}</p>
                    {d.description ? (
                      <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-[1.5] text-ink/60 sm:text-[15px]">{d.description}</p>
                    ) : null}
                    <div className="mt-auto flex items-end justify-between pt-2">
                      <p className="text-[19px] font-bold text-partner sm:text-[22px]">₹{d.price}</p>
                      {mode === 'page' ? (
                        <QtyControl cart={cart} name={d.name} price={d.price} disabled={d.available === false} />
                      ) : (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verified-pill text-verified-dark">
                          <LuPlus className="h-6 w-6" strokeWidth={2.5} aria-hidden />
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="mt-6 rounded-[18px] bg-white p-6 text-[15px] text-ink/60 ring-1 ring-ink/5">The menu is being prepared — check back soon.</p>
      )}

      {/* App strip — who to order from · why · how */}
      <div className="mt-8 grid grid-cols-1 items-center gap-6 rounded-[22px] bg-[#EEF2E3] p-5 ring-1 ring-verified/15 sm:p-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] xl:gap-0 xl:divide-x xl:divide-verified/25 xl:px-7 xl:py-6">
        <div className="flex items-center gap-4 sm:justify-center xl:justify-start xl:pr-8">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-verified shadow-[0_10px_20px_-12px_rgba(111,138,62,0.9)]">
            <Image src={mLogo} alt="" width={30} height={30} />
          </span>
          <p className="min-w-0 text-[16px] font-semibold leading-snug sm:text-[18px]">
            Order from <span className="text-ink">{name}</span>
            <span className="block text-[14.5px] font-medium text-ink/65 sm:text-[15.5px]">
              on the <span className="font-hand text-[22px] font-normal leading-none text-partner sm:text-[24px]">Mother Bhojan app</span>
            </span>
          </p>
        </div>
        <ul className="mx-auto grid w-full max-w-[520px] grid-cols-3 gap-2 xl:px-6">
          {[
            { Icon: LuShieldCheck, label: 'Verified kitchens' },
            { Icon: LuCookingPot, label: 'Freshly prepared' },
            { Icon: LuLeaf, label: 'Home-style meals' },
          ].map(({ Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-verified-dark shadow-sm ring-1 ring-verified/15">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="text-[12.5px] font-medium leading-tight text-ink/75 sm:text-[13px]">{label}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-1.5 xl:pl-8">
          <AppAction
            mode={mode}
            source="store-download-app"
            className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-b from-customer to-partner px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(219,26,26,0.7)] transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[260px] xl:min-w-0"
          >
            <LuDownload className="h-5 w-5" aria-hidden /> Download App
          </AppAction>
          <span className="text-[11.5px] text-ink/55">Coming soon on Android &amp; iPhone</span>
        </div>
      </div>

      {/* Bottom — "Powered by Mother Bhojan" (Cookin-style); no logo on top */}
      {mode === 'page' ? (
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-ink/10 pt-7 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/45">Powered by</span>
          <Link href="/" aria-label="Mother Bhojan home" className="transition hover:opacity-85">
            <Image src={mbLogoRed} alt="Mother Bhojan" className="h-10 w-auto sm:h-11" />
          </Link>
          <p className="mt-1 text-[12.5px] text-ink/50">
            Verified home kitchens ·{' '}
            <Link href="/terms" className="hover:text-ink">Terms</Link> ·{' '}
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          </p>
        </div>
      ) : null}
      {mode === 'page' ? (
        <ScheduleModal open={scheduleOpen} onClose={() => setScheduleOpen(false)} cookName={cookName || ownerName || name} schedule={schedule} />
      ) : null}
    </div>
  )
}
