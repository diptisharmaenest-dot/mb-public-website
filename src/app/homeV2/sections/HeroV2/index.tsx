'use client'

import { motion } from 'framer-motion'
import { LuArrowRight, LuChefHat, LuCircleCheck, LuShoppingBasket } from 'react-icons/lu'
import { DownloadAppButton } from '@/components'
import { EASE } from '@/shared/lib/motion'

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: 0.08 + i * 0.09 },
})

/** Home v2 hero — centred copy on a soft cream background (no photo, no feature strip). */
export default function HeroV2() {
  return (
    <section id="hero" aria-labelledby="hero-v2-heading" className="relative overflow-hidden bg-[#FFF8F1]">
      {/* Soft brand glows + faint dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(42,31,24,0.08)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div aria-hidden className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-customer/12 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-verified/18 blur-3xl" />
      <div aria-hidden className="absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-yellow/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[86svh] w-full max-w-[880px] flex-col items-center justify-center px-4 pb-20 pt-32 text-center sm:px-6 md:pt-36">
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
          className="mt-6 text-[2.5rem] font-bold leading-[1.08] tracking-[-1.5px] text-ink sm:text-[3.25rem] lg:text-[64px]"
        >
          The Way She Cooks
          <br />
          For Her Family.
          <span className="relative mx-auto mt-1 block w-fit font-hand text-[1.1em] font-normal leading-[1.25] tracking-normal text-partner">
            Now for Yours.
            <svg className="absolute -bottom-1 left-1/2 h-3 w-[70%] -translate-x-1/2" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
              <path d="M2 8 C 50 2, 120 2, 198 6" stroke="#F6C238" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p {...rise(2)} className="mt-6 max-w-[540px] text-[17px] leading-[1.55] text-ink/70 sm:text-[18px]">
          Home-style meals from real home kitchens, cooked with care, verified for quality, and delivered fresh.
        </motion.p>

        <motion.div {...rise(3)} className="mt-8 flex w-full max-w-[340px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <DownloadAppButton
            source="homev2-hero-order"
            openLabel="Order Home Food"
            variant="customer"
            size="lg"
            className="justify-center gap-2 !rounded-full !px-7"
          >
            <LuShoppingBasket className="h-5 w-5" aria-hidden />
            Order Home Food
            <LuArrowRight className="h-4.5 w-4.5" aria-hidden />
          </DownloadAppButton>
          <DownloadAppButton
            source="homev2-hero-kitchen"
            openLabel="Open Your Kitchen"
            variant="none"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-verified bg-white/70 px-7 py-3 text-[16px] font-semibold text-ink transition hover:bg-verified-pill"
          >
            <LuChefHat className="h-5 w-5 text-verified-dark" aria-hidden />
            Open Your Kitchen
            <LuArrowRight className="h-4.5 w-4.5" aria-hidden />
          </DownloadAppButton>
        </motion.div>
      </div>
    </section>
  )
}
