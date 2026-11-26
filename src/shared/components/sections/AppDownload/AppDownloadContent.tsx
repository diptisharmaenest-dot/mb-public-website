'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import Button from '@/shared/components/ui/Button'
import { appQr, mLogo } from '@/assets/images'
import { submitAppWaitlist } from '@/features/appDownload'
import {
  isAppLive,
  isValidContact,
  storeUrlFor,
  type AppPlatform,
} from '@/shared/data/app-download'

const BENEFITS = [
  'Order from verified home cooks near you',
  'Track every meal from her kitchen to your door',
  'A real person to help if anything goes wrong',
] as const

type StoreKey = 'ios' | 'android'

const STORES: Record<StoreKey, { top: string; name: string; Icon: typeof FaApple }> = {
  ios: { top: 'Download on the', name: 'App Store', Icon: FaApple },
  android: { top: 'Get it on', name: 'Google Play', Icon: FaGooglePlay },
}

function StoreBadge({ store, compact }: { store: StoreKey; compact?: boolean }) {
  const { top, name, Icon } = STORES[store]
  const url = storeUrlFor(store)
  const inner = (
    <>
      <Icon className={clsx('shrink-0', compact ? 'h-5 w-5' : 'h-6 w-6')} aria-hidden />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium tracking-wide text-white/75">{url ? top : 'Coming soon on'}</span>
        <span className={clsx('mt-0.5 font-bold tracking-tight', compact ? 'text-[15px]' : 'text-[17px]')}>{name}</span>
      </span>
    </>
  )
  const base =
    'relative inline-flex min-h-[52px] flex-1 items-center gap-2.5 rounded-[12px] border border-white/10 bg-ink px-4 py-2.5 !text-white'
  if (!url) {
    return (
      <span className={clsx(base, 'cursor-default opacity-55')} aria-disabled>
        {inner}
      </span>
    )
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(base, 'shadow-[0_6px_16px_-6px_rgba(42,31,24,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110')}
    >
      {inner}
    </a>
  )
}

function NotifyForm({ platform, source }: { platform: AppPlatform; source: string }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidContact(value)) {
      setError('Please enter a 10-digit mobile number or a valid email.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      await submitAppWaitlist({
        contact: value.trim(),
        contactType: value.includes('@') ? 'email' : 'phone',
        platform,
        source,
      })
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again in a moment.')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex items-start gap-3 rounded-[16px] border border-verified-pill-border bg-verified-pill px-4 py-3.5" role="status">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verified text-white">
          <FiCheck className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-[15px] font-bold text-ink">You&apos;re on the list!</p>
          <p className="mt-0.5 text-[13.5px] leading-snug text-ink/65">We&apos;ll message you the day the app launches.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="app-notify-contact" className="text-[14px] font-bold text-ink">
        Get a message the day we launch
      </label>
      <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
        <input
          id="app-notify-contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder="Mobile number or email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'app-notify-error' : 'app-notify-hint'}
          className={clsx(
            'min-h-12 w-full flex-1 rounded-[12px] border bg-white px-4 text-[15px] text-ink placeholder:text-placeholder outline-none transition focus:border-customer focus:ring-2 focus:ring-customer/20',
            error ? 'border-partner' : 'border-border',
          )}
        />
        <Button type="submit" variant="customer" size="md" disabled={status === 'sending'} className="shrink-0 px-6">
          {status === 'sending' ? 'Saving…' : 'Notify me'}
        </Button>
      </div>
      {error ? (
        <p id="app-notify-error" className="mt-2 text-[13px] font-medium text-partner" role="alert">
          {error}
        </p>
      ) : (
        <p id="app-notify-hint" className="mt-2 text-[12.5px] text-ink/50">
          Only used to tell you when the app is live. No spam.
        </p>
      )}
    </form>
  )
}

function QrCard() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-[22px] border border-border-card bg-white p-4 shadow-[0_18px_40px_-18px_rgba(42,31,24,0.35)]">
        <Image src={appQr} alt="QR code to get the Mother Bhojan app" width={176} height={176} className="h-44 w-44" unoptimized />
        <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-white p-1.5 shadow-sm">
          <Image src={mLogo} alt="" width={36} height={36} className="h-9 w-9" />
        </span>
      </div>
      <p className="mt-4 text-center text-[14px] font-bold text-ink">Scan with your phone camera</p>
      <p className="mt-1 text-center text-[12.5px] leading-snug text-ink/55">
        {isAppLive() ? 'Opens the right store for your phone' : 'We’ll take you to the app as soon as it’s live'}
      </p>
    </div>
  )
}

type AppDownloadContentProps = {
  platform: AppPlatform
  source: string
  /** Show the QR column (desktop). */
  showQr: boolean
  headingId?: string
}

/** Shared body for the download popup, mobile sheet and the /app page. */
export default function AppDownloadContent({ platform, source, showQr, headingId }: AppDownloadContentProps) {
  const live = isAppLive()
  // Phones: their own store first. Desktop: both.
  const stores: StoreKey[] = platform === 'android' ? ['android', 'ios'] : ['ios', 'android']

  return (
    <div className={clsx('grid gap-8', showQr && 'md:grid-cols-[1fr_auto] md:items-center md:gap-10')}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-verified-text">Mother Bhojan app</span>
          {!live ? (
            <span className="rounded-full bg-yellow/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
              Coming soon
            </span>
          ) : null}
        </div>

        <h2 id={headingId} className="mt-3 text-[28px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[32px] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[24px]">
          Home food, <span className="text-partner">one tap away.</span>
        </h2>
        <p className="mt-2 font-hand text-[19px] text-customer">माँ के हाथ का खाना — now on your phone</p>

        <ul className="mt-5 space-y-2.5 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:space-y-1.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink/80">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verified-pill text-verified-text">
                <FiCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 [@media(max-height:700px)]:mt-4">
          {stores.map((s) => (
            <StoreBadge key={s} store={s} compact={!showQr} />
          ))}
        </div>

        {!live ? (
          <div className="mt-6 border-t border-border-subtle pt-5 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:pt-4">
            <NotifyForm platform={platform} source={source} />
          </div>
        ) : null}
      </div>

      {showQr ? (
        <div className="hidden md:block">
          <QrCard />
        </div>
      ) : null}
    </div>
  )
}
