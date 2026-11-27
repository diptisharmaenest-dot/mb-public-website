'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button, DownloadAppButton, Section } from '@/components'
import { family, mother } from '@/assets/images'
import { ROUTES } from '@/shared/seo'
import { EASE } from '@/shared/lib/motion'

export type PortalCtaItem = {
  id?: string
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  href: string
  variant?: 'customer' | 'partner'
  /** Open the customer-app download popup instead of navigating to `href`. */
  appDownload?: boolean
}

type DualPortalCtaProps = {
  id?: string
  ariaLabel?: string
  items: [PortalCtaItem, PortalCtaItem]
  flushTop?: boolean
  className?: string
}

const DualPortalCta = ({
  id = 'dual-portal-cta',
  ariaLabel = 'Get started',
  items,
  flushTop,
  className,
}: DualPortalCtaProps) => {
  return (
    <Section
      id={id}
      aria-label={ariaLabel}
      flushTop={flushTop}
      className={['relative overflow-hidden bg-yellow/15', className]
        .filter(Boolean)
        .join(' ')}
      decorations={
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%] max-w-[400px]"
          >
            <Image
              src={family}
              alt=""
              fill
              sizes="40vw"
              className="object-cover object-top opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FBF6EA]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FBF6EA]/90 via-transparent to-[#FBF6EA]/90" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[40%] max-w-[400px]"
          >
            <Image
              src={mother}
              alt=""
              fill
              sizes="40vw"
              className="object-cover object-top opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FBF6EA]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FBF6EA]/90 via-transparent to-[#FBF6EA]/90" />
          </div>
        </>
      }
    >
      <div className="relative grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
        {items.map((item, i) => {
          const isCustomer =
            (item.variant ?? (i === 0 ? 'customer' : 'partner')) === 'customer'
          const indexLabel = String(i + 1).padStart(2, '0')

          return (
            <motion.article
              key={item.title}
              id={item.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-[2px] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-6 shadow-[0_10px_32px_rgba(42,31,24,0.06)] ring-1 ring-ink/[0.05]"
            >
              <div className="relative flex items-start justify-between gap-3">
                <p
                  className={`font-jakarta text-[11px] font-extrabold uppercase tracking-[0.22em] ${
                    isCustomer ? 'text-customer' : 'text-partner'
                  }`}
                >
                  {item.eyebrow}
                </p>
                <span
                  aria-hidden
                  className={`font-jakarta text-[28px] sm:text-[32px] font-extrabold leading-none tracking-tight ${
                    isCustomer ? 'text-customer/15' : 'text-partner/15'
                  }`}
                >
                  {indexLabel}
                </span>
              </div>

              <div className="relative mt-3 sm:mt-3.5">
                <h3 className="font-jakarta text-[22px] sm:text-[24px] font-extrabold tracking-tight text-ink leading-[1.15]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] sm:text-[15px] leading-relaxed text-ink/55 max-w-[280px]">
                  {item.body}
                </p>
              </div>

              <div className="relative mt-4 sm:mt-5">
                {item.appDownload ? (
                  <DownloadAppButton
                    source={`${id}-${item.id ?? i}`}
                    openLabel={item.ctaLabel}
                    variant={item.variant ?? (i === 0 ? 'customer' : 'partner')}
                    size="sm"
                  >
                    {item.ctaLabel}
                  </DownloadAppButton>
                ) : (
                  <Button
                    href={item.href}
                    variant={item.variant ?? (i === 0 ? 'customer' : 'partner')}
                    size="sm"
                  >
                    {item.ctaLabel}
                  </Button>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}

export const ABOUT_PORTAL_CTAS: [PortalCtaItem, PortalCtaItem] = [
  {
    id: 'order',
    eyebrow: 'For families',
    title: 'Hungry now?',
    body: 'Browse verified kitchens and order in minutes.',
    ctaLabel: 'Order now',
    href: ROUTES.kitchens,
    variant: 'customer',
    appDownload: true,
  },
  {
    eyebrow: 'For cooks',
    title: 'Cook from home?',
    body: 'Earn with dignity. Take the quiz, book an interview.',
    ctaLabel: 'Open a Kitchen',
    href: ROUTES.partners,
    variant: 'partner',
  },
]

export const FAQ_PORTAL_CTAS: [PortalCtaItem, PortalCtaItem] = [
  {
    eyebrow: 'For families',
    title: 'Ready to order?',
    body: 'Browse verified kitchens near you and order in minutes.',
    ctaLabel: 'Order now',
    href: ROUTES.kitchens,
    variant: 'customer',
    appDownload: true,
  },
  {
    eyebrow: 'For cooks',
    title: 'Cook from home?',
    body: 'Become a Kitchen Partner and earn with dignity.',
    ctaLabel: 'Open a Kitchen',
    href: ROUTES.partners,
    variant: 'partner',
  },
]

export default DualPortalCta
