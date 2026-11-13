'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { Button, DISPLAY_HEADER_CLASS_PARTNERS_HERO, Section, SectionContainer, SectionHeader } from '@/components'
import { differenceLeftPlant } from '@/assets'
import { ROUTES } from '@/shared/seo'

const heroNavItems = [
  { label: 'Independent chefs', href: '#independent-chefs' },
  { label: 'Small business owners', href: '#small-business-owners' },
  { label: 'Occasional food seller', href: '#occasional-food-seller' },
]

const SolutionsHero = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelect = (index: number, href: string) => {
    setActiveIndex(index)

    window.setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 220)
  }

  return (
    <Section
      flushTop
      className="relative overflow-hidden bg-paper"
      innerClassName="pt-24 md:pt-28"
    >
      {/* LEFT PLANT */}
      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -left-8 bottom-[4rem] z-0 sm:left-[-2.5rem] sm:bottom-[5.5rem]"
      >
        <Image
          src={differenceLeftPlant}
          alt=""
          width={300}
          height={300}
          className="h-auto w-[7rem] opacity-80 sm:w-[11rem] sm:opacity-100 md:w-[15rem] lg:w-[18rem]"
        />
      </motion.div>

      {/* RIGHT PLANT */}
      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, 8, 0],
          rotate: [0, -2, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -right-8 bottom-[4rem] z-0 sm:right-[-2.5rem] sm:bottom-[5.5rem]"
      >
        <Image
          src={differenceLeftPlant}
          alt=""
          width={300}
          height={300}
          className="h-auto w-[7rem] -scale-x-100 opacity-80 sm:w-[11rem] sm:opacity-100 md:w-[15rem] lg:w-[18rem]"
        />
      </motion.div>

      <SectionContainer className="relative z-10">
        {/* HEADING */}
        <SectionHeader
          eyebrow="For Kitchen Partners"
          as="h1"
          align="center"
          marginBottom="mb-0"
          gradient="olive"
          accent="text-partner"
          className="mx-auto max-w-[1600px] px-2"
          classNames={{ header: DISPLAY_HEADER_CLASS_PARTNERS_HERO }}
          lines={[{ text: 'SMALL TEAM,', accent: 'big impact.' }]}
        />

        {/* PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex w-full justify-center px-2 md:mt-10"
        >
          {/* Mobile: stacked buttons */}
          <div className="flex w-full max-w-md flex-col gap-2 sm:hidden">
            {heroNavItems.map((item, index) => (
              <Button
                key={item.href}
                type="button"
                onClick={() => handleSelect(index, item.href)}
                variant="none"
                size="sm"
                fullWidth
                className={`px-4 py-3 text-sm font-medium ${
                  activeIndex === index
                    ? 'bg-white text-ink shadow-[0_4px_10px_rgba(0,0,0,0.08)]'
                    : 'bg-canvas text-body'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Tablet+: pill slider */}
          <div className="relative hidden w-full max-w-[880px] items-center rounded-full bg-canvas p-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:inline-flex">
            <motion.div
              className="absolute top-[5px] bottom-[5px] rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
              animate={{
                left: `calc(${activeIndex * 33.333}% + 5px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 28,
              }}
              style={{
                width: 'calc(33.333% - 6.5px)',
              }}
            />

            {heroNavItems.map((item, index) => (
              <Button
                key={item.href}
                type="button"
                onClick={() => handleSelect(index, item.href)}
                variant="none"
                size="sm"
                className={`relative z-10 h-11 flex-1 rounded-full px-2 text-center text-xs font-medium md:h-[3.125rem] md:px-6 md:text-[1.05rem] lg:text-[1.1rem] ${
                  activeIndex === index
                    ? 'text-ink'
                    : 'text-body hover:text-ink'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex flex-col items-center gap-3 px-2 md:mt-10"
        >
          <Button href={ROUTES.join} variant="partner" size="md" className="inline-flex items-center gap-2">
            Apply now
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <p className="text-center text-[13px] font-semibold text-muted">
            Typical partners earn around ₹30,000 a month — earnings vary.
          </p>
        </motion.div>
      </SectionContainer>
    </Section>
  )
}

export default SolutionsHero