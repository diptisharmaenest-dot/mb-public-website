'use client'

import Image from 'next/image'
import { Section, RADIUS_CARD, SectionHeader, compactAccentLine } from '@/components'
import { VERIFIED_TRUST_SECTION_PROPS } from '@/shared/data/verified-kitchen'
import { mLogo } from '@/assets/images'

const AUDIT_STATS = [
  {
    value: '63',
    label: 'checkpoints inspected — surfaces, storage, water, gas line',
  },
  {
    value: 'FSSAI',
    label: 'license verified + hygiene training completed',
  },
  {
    value: '64°C',
    label: 'temperature-sealed packing, held to your door',
  },
  {
    value: '1 IN 5',
    label: 'kitchens pass. Sunita passed on her first audit.',
  },
] as const

const KitchenAudit = () => {
  return (
    <Section
      id="kitchen-audit"
      aria-labelledby="kitchen-audit-heading"
      flushTop
      className="bg-mb-verified-section"
      innerClassName="py-14 sm:py-16 lg:py-[4.5rem]"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <SectionHeader
        eyebrow="How we verify · 1 hr 20 min inside every kitchen"
        lines={[
          compactAccentLine({
            text: "Sunita's kitchen passed",
            accent: 'the audit.',
          }),
        ]}
        id="kitchen-audit-heading"
        align="left"
        gradient="white"
        accent="text-partner"
        classNames={{
          eyebrow: '!text-white/90',
        }}
        marginBottom="mb-0"
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {AUDIT_STATS.map((stat) => (
          <article
            key={stat.value}
            className={`${RADIUS_CARD} flex min-h-[148px] flex-col items-center justify-center bg-[#FAF9F6] px-5 py-7 text-center sm:min-h-[160px] sm:px-6`}
          >
            <p className="font-jakarta text-[2.35rem] font-extrabold leading-none tracking-tight text-verified-dark sm:text-[2.6rem]">
              {stat.value}
            </p>
            <p className="mt-3 max-w-[18ch] font-jakarta text-[13px] font-medium leading-[1.4] sm:text-[14px]">
              {stat.label}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-12 justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full bg-verified"
            aria-hidden
          >
            <Image
              src={mLogo}
              alt=""
              width={15}
              height={15}
              className="object-contain"
            />
          </span>
          <span className="font-jakarta text-[10px] font-extrabold uppercase tracking-[0.16em] text-verified-text">
            Verified
          </span>
        </span>
        <p className="font-jakarta text-[13px] font-medium leading-snug text-white sm:text-sm">
          Earned once, here. This badge only appears where it matters.
        </p>
      </div>
    </Section>
  )
}

export default KitchenAudit
