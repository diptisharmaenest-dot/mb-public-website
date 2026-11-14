'use client'

import Image from 'next/image'
import heroBg from '@/assets/videos/hero_bg.mp4'
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

const Hero = () => {
  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      flushTop
      flushBottom
      className="relative min-h-svh overflow-hidden bg-text-900"
      innerClassName="relative z-10 flex min-h-svh items-center py-24 md:py-28"
      decorations={
        <>
          <video
            key={heroBg}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source src={heroBg} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40" aria-hidden />
        </>
      }
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <div className="w-full" id="hero-heading">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="flex w-full max-w-[542px] flex-col items-start text-left lg:col-span-7">
            <div className="mb-4 inline-flex flex-wrap items-center gap-2.5 text-white sm:mb-5">
              <span className="text-base font-normal leading-[30px]">
                माँ के हाथ का खाना
              </span>
              <span
                className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-verified shadow-[0_2px_6px_rgba(111,138,62,0.35)]"
                aria-hidden
              >
                <Image
                  src={mLogo}
                  alt=""
                  width={12}
                  height={12}
                  className="object-contain"
                />
              </span>
              <span className="text-[12px] font-semibold uppercase leading-none tracking-[1px] text-white/90">
                Verified Home Food
              </span>
            </div>

            <h1 className="text-[2.25rem] font-semibold leading-[1.2] tracking-[-1px] text-white sm:text-[2.75rem] lg:text-[58px]">
              The Way She Cooks
              <br />
              For Her Family
            </h1>

            <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5 text-[1.25rem] font-semibold leading-none tracking-normal text-white sm:mt-4 sm:text-[1.5rem] lg:text-[28px]">
              <span>Is How She Cooks</span>
              <span className="relative inline-block -rotate-[4deg] px-1">
                <ForYoursBrush />
                <span className="relative z-10 inline-block font-hand text-[1.45em] font-extrabold leading-none text-partner">
                  For Yours.
                </span>
              </span>
            </p>

            <p className="mt-5 max-w-[542px] text-base font-normal leading-[1.4] tracking-normal text-white/90 sm:mt-6 sm:text-[18px]">
              Every meal on Mother Bhojan comes from a named, verified home cook
              near you. Real kitchens, real women, checked one by one.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
              <DownloadAppButton source="home-hero" openLabel="Order now" variant="customer" size="lg" className="px-7 sm:px-8">
                Order now
              </DownloadAppButton>
              {/* Hidden for now — #mothers anchor has no target on the page.
              <Button href="#mothers" variant="partnerSoft" size="lg" className="px-7 sm:px-8">
                Meet our cooks
                <span className="text-[1.1em] leading-none" aria-hidden>
                  ↓
                </span>
              </Button>
              */}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Hero
