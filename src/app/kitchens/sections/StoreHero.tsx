'use client'

import { FiHome, FiShield, FiUserCheck } from 'react-icons/fi'
import { DISPLAY_HEADER_CLASS_ABOUT_HERO, Section, SectionHeader, compactAccentLine } from '@/components'

const TRUST = [
  { icon: FiShield, label: 'Every kitchen visited in person' },
  { icon: FiUserCheck, label: 'A real cook behind every store' },
  { icon: FiHome, label: 'Cooked fresh in her own home' },
] as const

const StoreHeroSection = () => {
  return (
    <Section
      id="kitchens-hero"
      aria-labelledby="kitchens-hero-heading"
      flushTop
      className="relative overflow-hidden bg-paper"
      innerClassName="pt-24 md:pt-28 pb-10 md:pb-12"
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-[340px] w-[340px] rounded-full bg-customer/10 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-[260px] w-[260px] rounded-full bg-yellow/15 blur-[90px]" />

      <div className="relative max-w-3xl">
        <SectionHeader
          id="kitchens-hero-heading"
          as="h1"
          align="left"
          eyebrow="All kitchens"
          gradient="ink"
          animated={false}
          marginBottom="mb-0"
          className={DISPLAY_HEADER_CLASS_ABOUT_HERO}
          classNames={{ eyebrow: 'text-verified' }}
          lines={[{ text: 'Home kitchens' }, compactAccentLine({ text: 'cooking', accent: 'near you.' })]}
        />

        <p className="body-copy mt-5 max-w-2xl !text-ink/70">
          Each kitchen is a real cook&apos;s own store, with her name, her menu and her prices.
          Find one you like, see what she&apos;s cooking and order from her directly.
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-[13.5px] font-semibold text-ink/70">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified-pill text-verified-text" aria-hidden>
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default StoreHeroSection
