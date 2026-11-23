'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FiArrowRight, FiCheck, FiClock, FiCopy, FiHelpCircle, FiMail, FiMapPin, FiNavigation } from 'react-icons/fi'
import { FEATURE_CARD } from '@/components'
import { CONTACT_EMAIL, OFFICE, SUPPORT_HOURS, isSupportOpen } from '@/shared/data/contact'
import { EASE } from '@/shared/lib/motion'
import { ROUTES } from '@/shared/seo'

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE.mapQuery)}&z=15&output=embed`
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE.mapQuery)}`

function Card({
  icon,
  tone,
  title,
  delay,
  children,
  className,
}: {
  icon: ReactNode
  tone: 'customer' | 'verified' | 'yellow'
  title: string
  delay: number
  children: ReactNode
  className?: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={clsx(
        FEATURE_CARD,
        'group border border-border-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-customer/30 hover:shadow-xl',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={clsx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110',
            tone === 'customer' && 'bg-customer/12 text-customer',
            tone === 'verified' && 'bg-verified/15 text-verified-text',
            tone === 'yellow' && 'bg-yellow/20 text-ink',
          )}
          aria-hidden
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-ink/50">{title}</h3>
          {children}
        </div>
      </div>
    </motion.article>
  )
}

function EmailCard() {
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
    <Card icon={<FiMail className="h-5 w-5" />} tone="customer" title="Email us" delay={0}>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="break-all text-[16px] font-semibold text-ink underline-offset-4 hover:text-customer hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <button
          type="button"
          onClick={copy}
          className={clsx(
            'inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-bold transition-colors',
            copied
              ? 'border-verified bg-verified-pill text-verified-dark'
              : 'border-ink/15 bg-white text-ink/70 hover:border-customer hover:text-customer',
          )}
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
        >
          {copied ? <FiCheck className="h-3.5 w-3.5" aria-hidden /> : <FiCopy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="mt-1.5 text-[13px] text-muted">For orders, kitchens, press or anything else.</p>
    </Card>
  )
}

function HoursCard() {
  // Rendered after mount so the server and browser agree (no hydration mismatch).
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const tick = () => setOpen(isSupportOpen())
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Card icon={<FiClock className="h-5 w-5" />} tone="yellow" title="Support hours" delay={0.1}>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="text-[16px] font-semibold text-ink">
          {SUPPORT_HOURS.label}, <span className="whitespace-nowrap">{SUPPORT_HOURS.time}</span>
        </p>
        {open !== null ? (
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-bold',
              open ? 'bg-verified-pill text-verified-dark' : 'bg-ink/5 text-ink/60',
            )}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              {open ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-60" />
              ) : null}
              <span className={clsx('relative inline-flex h-2 w-2 rounded-full', open ? 'bg-verified' : 'bg-ink/30')} />
            </span>
            {open ? 'Open now' : 'Closed now'}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-[13px] text-muted">
        India time. Messages sent after hours are answered the next working day.
      </p>
    </Card>
  )
}

function OfficeCard() {
  return (
    <Card icon={<FiMapPin className="h-5 w-5" />} tone="verified" title="Our office" delay={0.2}>
      <address className="mt-1 text-[15px] font-semibold not-italic leading-snug text-ink">
        {OFFICE.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <div className="mt-4 overflow-hidden rounded-xl border border-border-card bg-stone-100">
        <iframe
          title="Map showing the Mother Bhojan office in Mohali"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[200px] w-full border-0 grayscale-[30%] transition duration-500 group-hover:grayscale-0"
        />
      </div>
      <a
        href={DIRECTIONS}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl border-2 border-verified bg-white px-4 text-[13px] font-bold text-ink transition hover:bg-verified-pill"
      >
        <FiNavigation className="h-4 w-4 text-verified-dark" aria-hidden />
        Get directions
      </a>
    </Card>
  )
}

function FaqStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
    >
      <Link
        href={ROUTES.faq}
        className="group flex items-center gap-4 rounded-2xl border border-dashed border-customer/40 bg-customer-muted/60 px-5 py-4 transition hover:border-customer hover:bg-customer-muted"
      >
        <FiHelpCircle className="h-6 w-6 shrink-0 text-customer" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold text-ink">Looking for a quick answer?</span>
          <span className="block text-[13px] text-muted">Ordering, delivery and kitchens: see our FAQ.</span>
        </span>
        <FiArrowRight
          className="h-5 w-5 shrink-0 text-customer transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </motion.div>
  )
}

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <EmailCard />
      <HoursCard />
      <OfficeCard />
      <FaqStrip />
    </div>
  )
}

export default ContactDetails
