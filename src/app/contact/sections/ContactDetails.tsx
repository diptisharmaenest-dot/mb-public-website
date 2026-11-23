'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FiArrowRight, FiCheck, FiClock, FiCopy, FiHelpCircle, FiMail, FiMapPin, FiNavigation } from 'react-icons/fi'
import { CONTACT_EMAIL, OFFICE, SUPPORT_HOURS } from '@/shared/data/contact'
import { EASE } from '@/shared/lib/motion'
import { ROUTES } from '@/shared/seo'
import { useSupportOpen } from './useSupportOpen'

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE.mapQuery)}&z=15&output=embed`
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE.mapQuery)}`

const TONES = {
  customer: { tile: 'bg-customer-muted border-customer-muted-border', icon: 'bg-customer text-white', eyebrow: 'text-customer' },
  yellow: { tile: 'bg-[#FFF4D6] border-[#F6E3A8]', icon: 'bg-yellow text-ink', eyebrow: 'text-[#9A7410]' },
  verified: { tile: 'bg-verified-pill border-verified-pill-border', icon: 'bg-verified text-white', eyebrow: 'text-verified-text' },
} as const

function Tile({
  icon,
  tone,
  eyebrow,
  delay,
  children,
  className,
}: {
  icon: ReactNode
  tone: keyof typeof TONES
  eyebrow: string
  delay: number
  children: ReactNode
  className?: string
}) {
  const t = TONES[tone]
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={clsx(
        'group relative flex flex-col rounded-[22px] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(42,31,24,0.35)]',
        t.tile,
        className,
      )}
    >
      <span
        className={clsx(
          'flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110',
          t.icon,
        )}
        aria-hidden
      >
        {icon}
      </span>
      <h3 className={clsx('mt-5 text-[12px] font-bold uppercase tracking-[0.14em]', t.eyebrow)}>{eyebrow}</h3>
      {children}
    </motion.article>
  )
}

function EmailTile() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
    } catch {
      const el = document.createElement('textarea')
      el.value = CONTACT_EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      el.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tile icon={<FiMail className="h-[22px] w-[22px]" />} tone="customer" eyebrow="Email us" delay={0}>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-1.5 break-all font-jakarta text-[19px] font-bold tracking-tight text-ink underline-offset-4 hover:text-customer hover:underline"
      >
        {CONTACT_EMAIL}
      </a>
      <p className="mt-1.5 text-[13.5px] text-ink/60">For orders, kitchens, press or anything else.</p>
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={copy}
          className={clsx(
            'inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border px-4 text-[13px] font-bold transition-colors',
            copied
              ? 'border-verified bg-verified text-white'
              : 'border-customer/30 bg-white text-customer hover:border-customer',
          )}
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
        >
          {copied ? <FiCheck className="h-4 w-4" aria-hidden /> : <FiCopy className="h-4 w-4" aria-hidden />}
          {copied ? 'Copied!' : 'Copy address'}
        </button>
      </div>
    </Tile>
  )
}

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

function HoursTile() {
  const open = useSupportOpen()

  return (
    <Tile icon={<FiClock className="h-[22px] w-[22px]" />} tone="yellow" eyebrow="Support hours" delay={0.1}>
      <p className="mt-1.5 font-jakarta text-[19px] font-bold tracking-tight text-ink">{SUPPORT_HOURS.time}</p>
      <p className="text-[14px] font-medium text-ink/70">{SUPPORT_HOURS.label}</p>

      {/* week strip: Mon..Sun, Sunday closed */}
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {WEEK.map((d, i) => {
          const on = (SUPPORT_HOURS.days as readonly number[]).includes((i + 1) % 7)
          return (
            <span
              key={i}
              className={clsx(
                'flex h-8 flex-1 items-center justify-center rounded-lg text-[12px] font-bold',
                on ? 'bg-yellow text-ink' : 'bg-white/70 text-ink/30 line-through',
              )}
            >
              {d}
            </span>
          )
        })}
      </div>

      <div className="mt-auto pt-5">
        <span
          className={clsx(
            'inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-[12.5px] font-bold transition-opacity duration-500',
            open === null && 'opacity-0',
            open ? 'bg-verified text-white' : 'bg-ink/[0.07] text-ink/60',
          )}
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            {open ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" /> : null}
            <span className={clsx('relative inline-flex h-2 w-2 rounded-full', open ? 'bg-white' : 'bg-ink/30')} />
          </span>
          {open ? 'Open now' : 'Closed now · we’ll reply next working day'}
        </span>
      </div>
    </Tile>
  )
}

function OfficeTile() {
  return (
    <Tile
      icon={<FiMapPin className="h-[22px] w-[22px]" />}
      tone="verified"
      eyebrow="Visit our office"
      delay={0.2}
      className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
    >
      <address className="mt-1.5 text-[15.5px] font-semibold not-italic leading-snug text-ink">
        {OFFICE.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <div className="mt-4 min-h-[220px] flex-1 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
        <iframe
          title="Map showing the Mother Bhojan office in Mohali"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full min-h-[220px] w-full border-0"
        />
      </div>
      <a
        href={DIRECTIONS}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-b from-verified to-verified-dark px-5 text-[14px] font-bold text-white shadow-[0_6px_16px_-4px_rgba(111,138,62,0.45)] transition hover:-translate-y-0.5 hover:brightness-105"
      >
        <FiNavigation className="h-4 w-4" aria-hidden />
        Get directions
      </a>
    </Tile>
  )
}

function FaqTile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
      className="text-white sm:col-span-2"
    >
      <Link
        href={ROUTES.faq}
        className="group flex h-full items-center gap-4 rounded-[22px] bg-ink px-6 py-5 text-white transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(42,31,24,0.6)]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-yellow" aria-hidden>
          <FiHelpCircle className="h-[22px] w-[22px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-jakarta text-[17px] font-bold">Looking for a quick answer?</span>
          <span className="block text-[13.5px] text-white/65">Ordering, delivery and kitchens: it may already be in our FAQ.</span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-customer transition-transform duration-300 group-hover:translate-x-1">
          <FiArrowRight className="h-5 w-5" aria-hidden />
        </span>
      </Link>
    </motion.div>
  )
}

const ContactDetails = () => {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-verified-text">Other ways to reach us</p>
        <p className="mt-1 font-hand text-[26px] text-customer">pick whatever is easiest for you</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <EmailTile />
        <HoursTile />
        <OfficeTile />
        <FaqTile />
      </div>
    </div>
  )
}

export default ContactDetails
