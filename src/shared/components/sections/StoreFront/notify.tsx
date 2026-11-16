'use client'

import { useId, useState, type FormEvent } from 'react'
import { LuBell, LuCheck } from 'react-icons/lu'
import { detectPlatform, isValidContact } from '@/shared/data/app-download'
import { submitAppWaitlist } from '@/features/appDownload/services/app-waitlist.api'

/**
 * "Get notified about new dishes" — asks for a mobile number or email.
 * Uses the same waitlist service as the app popup (saved once
 * NEXT_PUBLIC_APP_WAITLIST_ENDPOINT is configured).
 */
export function StoreNotifyForm({ cookName, source }: { cookName: string; source: string }) {
  const id = useId()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const v = value.trim()
    if (!isValidContact(v)) {
      setError('Enter a 10-digit mobile number or an email address.')
      return
    }
    setError('')
    setBusy(true)
    try {
      await submitAppWaitlist({
        contact: v,
        contactType: v.includes('@') ? 'email' : 'phone',
        platform: detectPlatform(navigator.userAgent),
        source,
      })
      setDone(true)
    } catch {
      setError('Something went wrong — please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <p className="mt-2 flex items-start gap-2 rounded-[8px] bg-verified-pill px-3 py-2.5 text-[12.5px] font-medium text-verified-text">
        <LuCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        Thanks! We&apos;ll let you know when {cookName} adds new dishes.
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="mt-2 space-y-2">
      <label htmlFor={id} className="sr-only">
        Mobile number or email
      </label>
      <input
        id={id}
        type="text"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (error) setError('')
        }}
        placeholder="Mobile number or email"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full rounded-[8px] border border-ink/12 bg-white px-3 py-2.5 text-[13px] text-ink outline-none transition placeholder:text-ink/40 focus:border-verified focus:ring-2 focus:ring-verified/20"
      />
      {error ? (
        <p id={`${id}-err`} className="text-[11.5px] text-partner">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-ink py-2.5 text-[13px] font-semibold text-white transition hover:bg-ink/90 disabled:opacity-60"
      >
        <LuBell className="h-4 w-4" aria-hidden /> {busy ? 'Saving…' : 'Notify me'}
      </button>
      <p className="text-[10.5px] leading-snug text-ink/45">Only used to tell you about new dishes. No spam.</p>
    </form>
  )
}
