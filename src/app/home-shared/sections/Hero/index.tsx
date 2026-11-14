'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
// Light, people-free kitchen loop (compressed from homeV3.mp4). Previous: hero_kitchen_loop.mp4 / hero_bg.mp4.
import heroVideo from '@/assets/videos/hero_light_kitchen.mp4'
import heroPoster from '@/assets/images/hero-light-kitchen-poster.jpg'
import { EASE } from '@/shared/lib/motion'
import { DownloadAppButton, Section } from '@/components'
import { VERIFIED_TRUST_SECTION_PROPS } from '@/shared/data/verified-kitchen'
import { mLogo } from '@/assets/images'

/** Taupe dry-brush highlight behind “For Yours.” — Figma brush stroke */
function ForYoursBrush() {
  return (
    <svg
      className="pointer-events-none absolute left-[-8%] top-[14%] z-0 h-[74%] w-[124%]"
      viewBox="0 0 320 56"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter
          id="for-yours-dry-brush"
          x="-10%"
          y="-60%"
          width="120%"
          height="220%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.85"
            numOctaves="4"
            seed="12"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter="url(#for-yours-dry-brush)" opacity="0.85">
        <path
          fill="#948572"
          d="M10 28c14-9 38-14 72-15 40-1 86 2 132 6 38 3 72 7 92 11 6 1 10 3 8 5-4 4-22 7-52 9-48 3-112 2-172-2C52 40 22 36 12 33c-4-1-5-3-2-5z"
        />
        <path
          fill="#B5A592"
          fillOpacity="0.9"
          d="M18 25c18-5 48-8 86-7 44 1 92 5 134 9 28 3 50 6 62 8 3 1 4 2 2 3-6 3-28 5-58 5-48 1-110-3-162-8-22-2-42-5-54-7-4-1-4-2-2-3z"
        />
        <path
          fill="#7D6F5E"
          fillOpacity="0.75"
          d="M14 31c22-2 58-3 98-2 48 1 100 4 142 7 26 2 46 4 56 6 2 1 2 2-1 2-12 2-40 2-76 0-52-2-112-6-158-10-18-2-36-4-48-5-3 0-4-1-1-2z"
        />
      </g>
    </svg>
  )
}

const TRUST_CHIPS = ['80-point hygiene audit', 'Cooked fresh at home', 'Delivered warm'] as const

/** Staggered fade-up for hero content. */
const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 },
})

/** Light, centred hero (Cookin-inspired): copy sits on the bright wall, food along the bottom. */
const Hero = () => {
  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      flushTop
      flushBottom
      className="relative min-h-svh overflow-hidden bg-[#F4EEE6]"
      innerClassName="relative z-10 flex min-h-svh flex-col items-center pb-48 pt-28 sm:pb-56 md:pt-32 lg:pb-44"
      decorations={
        <>
          <video
            key={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster.src}
            className="absolute inset-0 h-full w-full object-cover object-bottom"
            aria-hidden
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Soft cream wash so dark text reads on the wall; fades out over the food. */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#FBF7F1]/90 via-[#FBF7F1]/60 to-transparent sm:via-[#FBF7F1]/45"
            aria-hidden
          />
        </>
      }
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <div className="flex w-full max-w-[860px] flex-col items-center text-center">
        <motion.div {...rise(0)} className="mb-5 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full bg-white/70 px-4 py-1.5 ring-1 ring-ink/5 backdrop-blur-sm">
          <span className="text-[15px] font-normal leading-none text-ink-soft">माँ के हाथ का खाना</span>
          <span
            className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-verified shadow-[0_2px_6px_rgba(111,138,62,0.35)]"
            aria-hidden
          >
            <Image src={mLogo} alt="" width={12} height={12} className="object-contain" />
          </span>
          <span className="text-[11.5px] font-semibold uppercase leading-none tracking-[1px] text-verified-text">
            Verified Home Food
          </span>
        </motion.div>

        <motion.h1
          {...rise(1)}
          id="hero-heading"
          className="text-[2.35rem] font-semibold leading-[1.08] tracking-[-1.5px] text-ink sm:text-[3.25rem] lg:text-[68px]"
        >
          The Way She Cooks
          <br />
          For Her Family
        </motion.h1>

        <motion.p
          {...rise(2)}
          className="mt-3 flex flex-wrap items-baseline justify-center gap-x-2.5 text-[1.35rem] font-semibold leading-none text-ink sm:mt-4 sm:text-[1.7rem] lg:text-[32px]"
        >
          <span>Is How She Cooks</span>
          <span className="relative inline-block -rotate-[4deg] px-1">
            <ForYoursBrush />
            <span className="relative z-10 inline-block font-hand text-[1.45em] font-extrabold leading-none text-partner">
              For Yours.
            </span>
          </span>
        </motion.p>

        <motion.p
          {...rise(3)}
          className="mt-6 max-w-[560px] text-[16px] leading-[1.5] text-ink/75 sm:text-[18px]"
        >
          Every meal on Mother Bhojan comes from a named, verified home cook near you. Real kitchens, real
          women, checked one by one.
        </motion.p>

        <motion.div {...rise(4)} className="mt-8 flex w-full flex-col items-center">
          <DownloadAppButton
            source="home-hero"
            openLabel="Order now"
            variant="customer"
            size="lg"
            className="w-full max-w-[340px] justify-center !rounded-full py-4 text-[18px] shadow-[0_18px_36px_-14px_rgba(219,26,26,0.6)]"
          >
            Order now
          </DownloadAppButton>
          {/* "Meet our cooks" hidden — #mothers anchor has no target on the page. */}
          <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-ink/70">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-verified/70" />
              <span className="relative h-2 w-2 rounded-full bg-verified" />
            </span>
            Now serving Mohali
            <span className="text-ink/30" aria-hidden>·</span>
            <span className="text-ink/55">Tricity next</span>
          </p>
        </motion.div>

        <motion.ul {...rise(5)} className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {TRUST_CHIPS.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-2 text-[13px] font-semibold text-ink shadow-[0_6px_18px_-10px_rgba(42,31,24,0.35)] ring-1 ring-ink/5 backdrop-blur-sm"
            >
              <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-verified text-white">
                <FiCheck className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              {chip}
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}

export default Hero
