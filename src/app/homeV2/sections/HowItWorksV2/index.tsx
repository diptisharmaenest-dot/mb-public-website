'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { EASE } from '@/shared/lib/motion'
// Illustrations cropped from the approved v2 mockups — swap for originals for full sharpness.
import family1 from '@/assets/images/home-v2/family-1.png'
import family2 from '@/assets/images/home-v2/family-2.png'
import family3 from '@/assets/images/home-v2/family-3.png'
import family4 from '@/assets/images/home-v2/family-4.png'
import kitchen1 from '@/assets/images/home-v2/kitchen-1.png'
import kitchen2 from '@/assets/images/home-v2/kitchen-2.png'
import kitchen3 from '@/assets/images/home-v2/kitchen-3.png'
import kitchen4 from '@/assets/images/home-v2/kitchen-4.png'

type Step = { title: string; body: string; img: StaticImageData; alt: string }
type Journey = {
  id: 'family' | 'kitchen'
  tab: string
  heading: string
  steps: Step[]
}

const JOURNEYS: Journey[] = [
  {
    id: 'family',
    tab: 'Order Home Food',
    heading: 'A Simple Journey on',
    steps: [
      { title: 'Find a Home Kitchen', body: 'Discover verified home kitchens near you.', img: family1, alt: 'Map with a location pin' },
      { title: 'Choose Your Meal', body: 'Explore homemade menus and pick what you love.', img: family2, alt: 'A bowl of home-style curry' },
      { title: 'Pay Securely', body: 'Quick and secure checkout.', img: family3, alt: 'A wallet with a green check' },
      { title: 'Get It Delivered', body: 'Receive fresh, home-style food at your doorstep.', img: family4, alt: 'A Mother Bhojan paper bag' },
    ],
  },
  {
    id: 'kitchen',
    tab: 'Open Your Kitchen',
    heading: 'Start Your Home Kitchen on',
    steps: [
      { title: 'Download the App', body: 'Get the Mother Bhojan Kitchen Owner app on your phone.', img: kitchen1, alt: 'Phone showing the Mother Bhojan app' },
      { title: 'Verify Your Number', body: 'Confirm your mobile number with a quick OTP.', img: kitchen2, alt: 'Phone showing an OTP with a green check' },
      { title: 'Set Up Your Kitchen', body: 'Add your kitchen details, upload documents and list your dishes.', img: kitchen3, alt: 'A cooking pot with fresh vegetables' },
      { title: 'Get Verified', body: 'Our team reviews your application and guides you through the next steps.', img: kitchen4, alt: 'A checklist with a verified badge' },
    ],
  },
]

const TONE = {
  family: { pill: 'bg-gradient-to-b from-customer to-partner', num: 'bg-[#FDE3DF] text-partner', dash: '#E1574C' },
  kitchen: { pill: 'bg-gradient-to-b from-verified to-verified-dark', num: 'bg-[#E7EED6] text-verified-dark', dash: '#8DA552' },
} as const

/** Small dashed arc between cards (desktop). */
function Connector({ color }: { color: string }) {
  return (
    <svg className="absolute -right-[30px] top-1/2 z-10 hidden h-6 w-9 -translate-y-1/2 lg:block" viewBox="0 0 36 24" aria-hidden>
      <path d="M2 18 C 10 2, 26 2, 34 14" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
    </svg>
  )
}

/** Home v2 "How it works" — one journey at a time via the switch, four illustrated cards. */
export default function HowItWorksV2() {
  const [active, setActive] = useState<Journey['id']>('family')
  const journey = JOURNEYS.find((j) => j.id === active)!
  const tone = TONE[active]

  return (
    <section id="how-it-works" aria-labelledby="hiw-v2-heading" className="relative overflow-hidden bg-[#FFF6EF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <p className="flex items-center justify-center gap-4 text-[13px] font-semibold uppercase tracking-[0.28em] text-ink">
          <span className="h-[2px] w-12 rounded bg-gradient-to-r from-transparent to-partner sm:w-20" aria-hidden />
          How it works
          <span className="h-[2px] w-12 rounded bg-gradient-to-l from-transparent to-partner sm:w-20" aria-hidden />
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.h2
            key={active}
            id="hiw-v2-heading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-4 text-center text-[1.9rem] font-bold leading-tight tracking-[-0.5px] text-ink sm:text-[2.4rem] lg:text-[44px]"
          >
            {journey.heading} <span className="italic text-partner">Mother Bhojan</span>
          </motion.h2>
        </AnimatePresence>

        {/* Switch */}
        <div role="tablist" aria-label="Choose a journey" className="mx-auto mt-8 flex w-full max-w-[600px] rounded-full bg-white p-1.5 shadow-[0_12px_30px_-18px_rgba(42,31,24,0.45)] ring-1 ring-ink/5">
          {JOURNEYS.map((j) => {
            const selected = j.id === active
            const Icon = j.id === 'family' ? LuUtensilsCrossed : LuChefHat
            return (
              <button
                key={j.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(j.id)}
                className={clsx(
                  'relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-3 text-[15px] font-semibold transition-colors sm:text-[17px]',
                  selected ? 'text-white' : 'text-ink hover:text-ink/70',
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="hiw-v2-pill"
                    className={clsx('absolute inset-0 rounded-full shadow-[0_10px_20px_-10px_rgba(42,31,24,0.55)]', TONE[j.id].pill)}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <Icon className={clsx('relative h-5 w-5', !selected && (j.id === 'family' ? 'text-partner' : 'text-verified-dark'))} aria-hidden />
                <span className="relative">{j.tab}</span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <ol key={active} className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {journey.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className={clsx(
                  'absolute -top-5 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-[18px] font-bold ring-4 ring-[#FFF6EF]',
                  tone.num,
                )}
              >
                {i + 1}
              </span>
              <div className="group h-full rounded-[28px] bg-[#FEF9F5] px-5 pb-7 pt-9 text-center shadow-[0_18px_40px_-26px_rgba(42,31,24,0.4)] ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative mx-auto h-[120px] w-[172px]">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="172px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-ink">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-[15px] leading-[1.5] text-ink/65">{s.body}</p>
              </div>
              {i < journey.steps.length - 1 ? <Connector color={tone.dash} /> : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
