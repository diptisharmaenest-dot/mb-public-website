'use client'

import {
  Button,
  Section,
  SectionHeader,
} from '@/components'
import { HERO_HEADING_CLASSNAMES } from '@/shared/data/hero-heading'
import { ROUTES } from '@/shared/seo'
import { homeV3 } from '@/assets'

const Hero = () => {
  return (
    <Section
      id="hero"
      fullWidth
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden"
      innerClassName="relative z-10 flex min-h-screen items-center"
      decorations={
        <>
          <div
            className="absolute inset-0 bg-paper bg-gradient-to-br from-customer/8 via-yellow/12 to-olive/8"
            aria-hidden
          />
          <video
            key={homeV3}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source src={homeV3} type="video/mp4" />
          </video>
        </>
      }
    >
      <div className="w-full" id="hero-heading">
        <div className="mx-auto flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 text-[18px] font-extrabold tracking-widest text-yellow drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] font-sans">
            माँ के हाथ का खाना
          </span>

          <SectionHeader
            animated={false}
            classNames={HERO_HEADING_CLASSNAMES}
            as="h1"
            align="center"
            className="mt-1"
            gradient="customer"
            solid
            accent='text-olive'
            lines={[
              { text: 'Verified home food' },
              {
                text: '',
                accent: 'cooked with love',
                rotateAccent: true,
              },
            ]}
          />

          <p className="font-medium text-ink w-full max-w-[580px] mx-auto text-center">
            Order verified, home-cooked meals prepared by verified home cooks in local kitchens, delivered warm to your doorstep.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 sm:mt-8 lg:mt-10">
            <Button href={ROUTES.kitchens} variant="customer" className="sm:min-w-[200px]">
              Order now
            </Button>
            <Button href={ROUTES.join} variant="partnerOutline">
              Become a Partner
            </Button>
          </div>

          <div className="mt-8 lg:mt-12 inline-flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 px-5 py-3 rounded-full bg-paper/75 backdrop-blur-md border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-olive">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span className="font-jakarta text-[13px] font-bold text-olive tracking-tight">Verified kitchens</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60" />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-olive">
                  <rect x="4" y="3" width="16" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span className="font-jakarta text-[13px] font-bold text-olive tracking-tight">FSSAI-compliant</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60" />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-customer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.2l-1.7-1.6a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z" />
                </svg>
              </span>
              <span className="font-jakarta text-[13px] font-bold text-olive tracking-tight">Daughter&apos;s Promise</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Hero
