'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LuArrowRight, LuChefHat, LuCircleCheck, LuHeart, LuHouse, LuLeaf, LuShieldCheck, LuShoppingBasket } from 'react-icons/lu'
import { DownloadAppButton } from '@/components'
import { EASE } from '@/shared/lib/motion'
// Cropped from the approved v2 mockup for now — swap for the original file for full sharpness.
import heroThali from '@/assets/images/home-v2/hero-thali.jpg'

const FEATURES = [
  { Icon: LuHouse, title: 'Real Home Kitchens', text: 'Food made in home kitchens', tone: 'text-partner' },
  { Icon: LuShieldCheck, title: 'Verified Kitchens', text: 'Kitchens and hygiene checked', tone: 'text-verified-dark' },
  { Icon: LuLeaf, title: 'Freshly Prepared', text: 'Everyday, home-style meals', tone: 'text-verified-dark' },
  { Icon: LuHeart, title: 'Her Kitchen, Her Name', text: 'Every order supports a home cook near you', tone: 'text-[#E8862A]' },
] as const

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: 0.08 + i * 0.09 },
})

/** Home v2 hero — copy left, thali photo right, feature strip below. */
export default function HeroV2() {
  return (
    <section id="hero" aria-labelledby="hero-v2-heading" className="relative overflow-hidden bg-[#FFF8F1]">
      {/* Photo — right half on desktop, fading into the cream background */}
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block" aria-hidden>
        <Image
          src={heroThali}
          alt=""
          fill
          priority
          sizes="56vw"
          className="object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_28%)]"
        />
      </div>
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-customer/10 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-10 pt-28 sm:px-6 md:pt-32 lg:px-10 lg:pb-12">
        <div className="max-w-[560px]">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-verified/25 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
          >
            <span className="text-[15px] text-ink-soft">माँ के हाथ का खाना</span>
            <LuCircleCheck className="h-5 w-5 text-verified" aria-hidden />
            <span className="text-[14px] font-semibold text-verified-text">Verified Home Food</span>
          </motion.p>

          <motion.h1
            {...rise(1)}
            id="hero-v2-heading"
            className="mt-6 text-[2.5rem] font-bold leading-[1.08] tracking-[-1.5px] text-ink sm:text-[3.25rem] lg:text-[60px]"
          >
            The Way She Cooks
            <br />
            For Her Family.
            <span className="relative mt-1 block w-fit font-hand text-[1.1em] font-normal leading-[1.15] tracking-normal text-partner">
              Now for Yours.
              <svg
                className="absolute -bottom-2 left-1 h-3 w-[58%]"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 8 C 50 2, 120 2, 198 6" stroke="#F6C238" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-[480px] text-[17px] leading-[1.55] text-ink/70 sm:text-[18px]">
            Home-style meals from real home kitchens, cooked with care, verified for quality, and delivered fresh.
          </motion.p>

          <motion.div {...rise(3)} className="mt-8 flex flex-wrap items-center gap-3">
            <DownloadAppButton
              source="homev2-hero-order"
              openLabel="Order Home Food"
              variant="customer"
              size="lg"
              className="gap-2 !rounded-full !px-6"
            >
              <LuShoppingBasket className="h-5 w-5" aria-hidden />
              Order Home Food
              <LuArrowRight className="h-4.5 w-4.5" aria-hidden />
            </DownloadAppButton>
            <DownloadAppButton
              source="homev2-hero-kitchen"
              openLabel="Open Your Kitchen"
              variant="none"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-verified bg-white/70 px-6 py-3 text-[16px] font-semibold text-ink transition hover:bg-verified-pill"
            >
              <LuChefHat className="h-5 w-5 text-verified-dark" aria-hidden />
              Open Your Kitchen
              <LuArrowRight className="h-4.5 w-4.5" aria-hidden />
            </DownloadAppButton>
          </motion.div>
        </div>

        {/* Photo — phones/tablets */}
        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] lg:hidden">
          <Image src={heroThali} alt="A brass thali with dal, sabzi, rotis and salad" fill sizes="100vw" className="object-cover" />
        </div>

        {/* Feature strip */}
        <motion.ul
          {...rise(4)}
          className="relative mt-10 grid grid-cols-1 gap-y-5 rounded-[24px] bg-white/90 p-6 shadow-[0_20px_50px_-30px_rgba(42,31,24,0.45)] ring-1 ring-ink/5 backdrop-blur sm:grid-cols-2 sm:gap-x-6 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink/10 lg:px-4"
        >
          {FEATURES.map(({ Icon, title, text, tone }) => (
            <li key={title} className="flex items-start gap-3.5 lg:px-6">
              <Icon className={`mt-0.5 h-9 w-9 shrink-0 ${tone}`} strokeWidth={1.6} aria-hidden />
              <div>
                <p className="text-[16.5px] font-bold leading-snug text-ink">{title}</p>
                <p className="mt-0.5 text-[14px] leading-snug text-ink/65">{text}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
