'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import {
  CARD_GRID_GAP,
  compactAccentLine,
  FEATURE_CARD,
  HEADER_TO_SUBROW_GAP,
  RADIUS_BTN,
  RADIUS_DEFAULT,
  Section,
  SectionHeader,
} from '@/components'
import { ROUTES } from '@/shared/seo'
import { EASE } from '@/shared/lib/motion'

import ImageCompareSlider from '@/shared/components/ui/ImageCompareSlider'
import { AI_PHOTO_COMPARE } from '../../data/ai-photo-compare'
import humanSupportFrame from '@/assets/images/human-support-frame.png'

const FEATURES = [
  {
    id: 'payments',
    titleLine1: 'Guaranteed',
    titleLine2: 'payments',
    description:
      'Earnings deposited straight to her bank — UPI, cards, net banking.',
  },
  {
    id: 'ai-photo',
    titleLine1: 'AI Photo',
    titleLine2: 'enhancer',
    description: 'Studio-look dish photos from a phone camera snap.',
  },
  {
    id: 'reviews',
    titleLine1: 'Customer',
    titleLine2: 'review',
    description: 'Good reviews bring more orders and build her reputation.',
  },
  {
    id: 'support',
    titleLine1: 'Real human',
    titleLine2: 'support',
    description: 'From first call to hundredth order — our team is beside her.',
  },
] as const

const FOOTER_LINKS = [
  { label: 'FSSAI compliance', href: ROUTES.faq },
  { label: 'Delivery areas', href: ROUTES.kitchens },
  { label: 'Refunds', href: ROUTES.refunds },
] as const

const RATING_BARS = [
  { stars: 5, width: '92%' },
  { stars: 4, width: '55%' },
  { stars: 3, width: '22%' },
  { stars: 2, width: '11%' },
  { stars: 1, width: '5%' },
] as const

const VISUAL_BG = {
  payments: 'bg-[#8DA552]/5 border border-[#8DA552]/10',
  'ai-photo': 'bg-[#8DA552]/5 border border-[#8DA552]/10',
  reviews: 'bg-[#8DA552]/5 border border-[#8DA552]/10',
  support: 'bg-[#8DA552]/5 border border-[#8DA552]/10',
} as const

function VisualStage({
  tone,
  children,
}: {
  tone: keyof typeof VISUAL_BG
  children: ReactNode
}) {
  return (
    <div
      className={clsx(
        'relative mx-auto mt-6 min-h-[274px] w-full overflow-hidden rounded-[17px] p-3 flex items-center justify-center',
        VISUAL_BG[tone],
      )}
    >
      <div className="relative h-[248px] w-full overflow-hidden rounded-[14px]">
        {children}
      </div>
    </div>
  )
}

function MastercardIcon() {
  return (
    <span className="relative inline-flex h-4 w-7 shrink-0" aria-hidden>
      <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-partner" />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-yellow opacity-85" />
    </span>
  )
}

function PaymentsCardVisual() {
  return (
    <VisualStage tone="payments">
      <div className="absolute inset-x-1 top-2">
        <div className={`${FEATURE_CARD} p-3.5`}>
          <p className="m-0 mb-2.5 text-[13px] font-bold text-ink">
            Payment Methods
          </p>
          <div className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between border border-border px-2.5 py-2 ${RADIUS_DEFAULT}`}
            >
              <span className="flex items-center gap-2">
                <MastercardIcon />
                <span className="text-[12px] font-semibold text-ink">
                  •••• 3876
                </span>
              </span>
              <span className="text-[10px] font-bold text-verified">Default</span>
            </div>
            <div
              className={`flex items-center gap-2 border border-border px-2.5 py-2 ${RADIUS_DEFAULT}`}
            >
              <span className="w-7 text-[11px] font-extrabold italic text-annotation">
                VISA
              </span>
              <span className="text-[12px] font-semibold text-ink">•••• 1404</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${FEATURE_CARD} absolute bottom-1.5 right-1.5 w-[78%] p-3 shadow-surface-lg`}
      >
        <p className="m-0 mb-2 text-[11px] font-bold text-ink">
          Add New Credit Card
        </p>
        <div className="flex flex-col gap-1.5">
          {['Card number', 'Name on card'].map((placeholder) => (
            <div
              key={placeholder}
              className={`flex h-6.5 items-center border border-border px-2 ${RADIUS_DEFAULT}`}
            >
              <span className="text-[9.5px] text-muted">{placeholder}</span>
            </div>
          ))}
          <div className="flex gap-1.5">
            {['MM/YY', 'CVV'].map((placeholder) => (
              <div
                key={placeholder}
                className={`flex h-6.5 flex-1 items-center border border-border px-2 ${RADIUS_DEFAULT}`}
              >
                <span className="text-[9.5px] text-muted">{placeholder}</span>
              </div>
            ))}
          </div>
          <div
            className={`mt-1 flex h-7.5 items-center justify-center ${RADIUS_BTN} bg-[#D9534F] text-[11.5px] font-bold text-white shadow-sm`}
          >
            Add Card
          </div>
        </div>
      </div>
    </VisualStage>
  )
}

function AiPhotoCardVisual() {
  return (
    <VisualStage tone="ai-photo">
      <div className="absolute inset-x-1 top-2 -bottom-12 flex flex-col overflow-hidden rounded-t-[26px] border-[5px] border-b-0 border-[#3B281C] bg-white shadow-device-frame">
        {/* Phone Notch */}
        <div className="mx-auto mt-1.5 h-3.5 w-14 shrink-0 rounded-full bg-[#3B281C]" />

        {/* Phone Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-3 py-1.5 text-[11px] font-bold text-ink">
          <span className="text-[12px] font-normal text-ink/70">‹</span>
          <span>Enhance Dish Image</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7B9945] text-[9px] font-extrabold text-white">
            M
          </span>
        </div>

        {/* Image Compare Slider */}
        <div className="p-1.5 flex-1 flex items-center justify-center">
          <ImageCompareSlider
            beforeSrc={AI_PHOTO_COMPARE.original}
            afterSrc={AI_PHOTO_COMPARE.enhanced}
            beforeAlt={AI_PHOTO_COMPARE.originalAlt}
            afterAlt={AI_PHOTO_COMPARE.enhancedAlt}
            beforeLabel="Original"
            afterLabel="Enhanced"
            heightClassName="h-[185px]"
            imageSizes="240px"
            imageClassName="object-cover object-center rounded-xl"
          />
        </div>
      </div>
    </VisualStage>
  )
}

function ReviewsCardVisual() {
  return (
    <VisualStage tone="reviews">
      <div className="absolute inset-1 flex flex-col justify-center gap-2">
        <div className={`${FEATURE_CARD} px-3 py-2.5`}>
          <p className="m-0 text-[10px] text-muted-light">Overall Rating</p>
          <div className="mt-1 flex items-start gap-2.5">
            <div className="shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-[26px] font-extrabold leading-none text-ink">
                  4.7
                </span>
                <span className="text-lg leading-none text-partner">★</span>
              </div>
              <p className="m-0 mt-1 text-[9.5px] text-muted-light">104 reviews</p>
            </div>
            <div className="flex flex-1 flex-col gap-1 pt-0.5">
              {RATING_BARS.map((row) => (
                <div key={row.stars} className="flex items-center gap-1.5">
                  <span className="w-2 text-[9px] text-muted-light">
                    {row.stars}
                  </span>
                  <span className="text-[8px] text-partner">★</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-partner"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#7B9945] px-3 py-2.5 text-white shadow-sm">
          <div className="mb-1 flex items-center justify-between text-[10.5px]">
            <b className="font-bold text-white">Manoj Kumar</b>
            <span className="text-[9px] text-white/90">★★★★★ · 1 day ago</span>
          </div>
          <p className="m-0 text-[10px] leading-[1.35] text-white/95">
            Just like maa ke haath ka khana! Warm, fresh and so delicious. Reminded me of home.
          </p>
        </div>
      </div>
    </VisualStage>
  )
}

function SupportCardVisual() {
  return (
    <VisualStage tone="support">
      <div className="relative h-full w-full overflow-hidden rounded-[14px]">
        <Image
          src={humanSupportFrame}
          alt="Real Human Support video call representative"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px"
          className="object-cover object-top"
        />
      </div>
    </VisualStage>
  )
}

function FeatureVisual({ id }: { id: (typeof FEATURES)[number]['id'] }) {
  switch (id) {
    case 'payments':
      return <PaymentsCardVisual />
    case 'ai-photo':
      return <AiPhotoCardVisual />
    case 'reviews':
      return <ReviewsCardVisual />
    case 'support':
      return <SupportCardVisual />
  }
}

const WeHandleEverythingElse = () => {
  return (
    <Section
      id="we-handle-everything"
      aria-labelledby="we-handle-everything-heading"
      flushTop
    >
      <SectionHeader
        id="we-handle-everything-heading"
        align="left"
        solid="ink"
        marginBottom={HEADER_TO_SUBROW_GAP}
        lines={[
          compactAccentLine({
            text: 'And We Handle',
            accent: 'everything else.',
          }),
        ]}
      />

      <div
        className={clsx(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          CARD_GRID_GAP,
        )}
      >
        {FEATURES.map((feature, index) => (
          <motion.article
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
            className={clsx(
              'flex h-full flex-col justify-between rounded-[24px] bg-white p-6 text-left shadow-[0_8px_28px_rgba(0,0,0,0.06)] border border-black/5 sm:p-7',
            )}
          >
            <div>
              <h3 className="m-0 text-[28px] font-semibold leading-[1.05] tracking-normal text-ink">
                {feature.titleLine1}
                <br />
                {feature.titleLine2}
              </h3>
              <p className="mt-2.5 m-0 min-h-[48px] text-[16px] font-normal leading-[1.5] tracking-[-0.44px] text-ink/75">
                {feature.description}
              </p>
            </div>

            <FeatureVisual id={feature.id} />
          </motion.article>
        ))}
      </div>

      <nav
        aria-label="Helpful links"
        className="mt-8 flex flex-wrap items-center justify-start gap-x-1.5 gap-y-1 text-left sm:mt-9"
      >
        <span className="text-[12px] text-ink/45">Questions?</span>
        {FOOTER_LINKS.map((link, index) => (
          <span key={link.href} className="inline-flex items-center gap-1.5">
            {index > 0 ? (
              <span className="text-ink/25" aria-hidden>
                ·
              </span>
            ) : null}
            <Link
              href={link.href}
              className="text-[12px] font-medium text-ink/50 no-underline transition-colors hover:text-customer"
            >
              {link.label}
              {index === FOOTER_LINKS.length - 1 ? ' →' : ''}
            </Link>
          </span>
        ))}
      </nav>
    </Section>
  )
}

export default WeHandleEverythingElse
