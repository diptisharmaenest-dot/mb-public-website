'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { FiArrowDown, FiMail } from 'react-icons/fi'
// General kitchen scene, no people (contact page should not show a person).
import kitchenCounter from '@/assets/images/hero-light-kitchen-poster.jpg'
import { Button, DISPLAY_HEADER_CLASS_ABOUT_HERO, Section, SectionHeader, compactAccentLine } from '@/components'
import { CONTACT_EMAIL, SUPPORT_HOURS } from '@/shared/data/contact'
import { EASE } from '@/shared/lib/motion'
import { useSupportOpen } from './useSupportOpen'

function StatusPill() {
  const open = useSupportOpen()
  return (
    <span
      className={clsx(
        'inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-[12.5px] font-bold transition-opacity duration-500',
        open === null && 'opacity-0',
        open ? 'border-verified-pill-border bg-verified-pill text-verified-dark' : 'border-ink/10 bg-white/70 text-ink/65',
      )}
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        {open ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-60" /> : null}
        <span className={clsx('relative inline-flex h-2 w-2 rounded-full', open ? 'bg-verified' : 'bg-ink/30')} />
      </span>
      {open ? 'We’re online now' : 'We’re offline now'}
      <span className="font-medium opacity-70">
        · {SUPPORT_HOURS.label.replace('Monday', 'Mon').replace('Saturday', 'Sat')}, {SUPPORT_HOURS.time}
      </span>
    </span>
  )
}

const ContactHero = () => {
  const reduce = useReducedMotion()

  return (
    <Section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      flushTop
      className="overflow-hidden bg-paper"
      innerClassName="pt-24 md:pt-28 pb-14 md:pb-20"
    >
      {/* soft warm glows */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-[320px] w-[320px] rounded-full bg-yellow/20 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 h-[360px] w-[360px] rounded-full bg-customer/10 blur-[100px]" />

      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        {/* Copy */}
        <div className="max-w-xl">
          <SectionHeader
            id="contact-hero-heading"
            as="h1"
            align="left"
            eyebrow="Contact us"
            gradient="ink"
            animated={false}
            marginBottom="mb-0"
            className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
            classNames={{ eyebrow: 'text-verified' }}
            lines={[{ text: 'Talk to a' }, compactAccentLine({ text: '', accent: 'real person.' })]}
          />

          <motion.p
            initial={{ opacity: 0, rotate: -3, y: 8 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-3 font-hand text-[24px] leading-snug text-customer sm:text-[28px]"
          >
            every message is read by our team
          </motion.p>

          <p className="body-copy mt-5 max-w-lg !text-ink/75">
            A question about an order, or thinking of opening your kitchen? Write to us and
            we&apos;ll get back to you, usually within one working day.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="#contact-form" variant="customer" size="md" className="px-6">
              Write to us
              <FiArrowDown className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="customerSoft" size="md" className="px-5">
              <FiMail className="h-4 w-4" aria-hidden />
              Email us
            </Button>
          </div>

          <div className="mt-5">
            <StatusPill />
          </div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-customer/15" aria-hidden />
          <div className="relative overflow-hidden rounded-[28px] border-4 border-white shadow-surface-lg">
            <Image
              src={kitchenCounter}
              alt="A warm home kitchen counter with fresh vegetables, a spice box and dal on the stove"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="aspect-[5/4] h-auto w-full object-cover object-[50%_100%]"
              priority
            />
          </div>

          {/* floating chat bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={
              reduce
                ? { duration: 0.5, delay: 0.5 }
                : { opacity: { duration: 0.5, delay: 0.5 }, scale: { duration: 0.5, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 } }
            }
            className="absolute -left-3 top-6 max-w-[230px] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-surface-lg sm:-left-8"
          >
            <p className="text-[12px] font-bold uppercase tracking-wider text-verified-text">Mother Bhojan team</p>
            <p className="mt-0.5 text-[14.5px] font-semibold leading-snug text-ink">Namaste! How can we help you today?</p>
          </motion.div>

          {/* floating location chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="absolute -bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12.5px] font-bold text-white shadow-surface-lg sm:right-8"
          >
            <span className="h-2 w-2 rounded-full bg-yellow" aria-hidden />
            A small team in Mohali, Punjab
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

export default ContactHero
