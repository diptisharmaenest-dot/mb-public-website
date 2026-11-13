'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { compactAccentLine, Section, SectionHeader } from '@/components'
import { EASE } from '@/shared/lib/motion'
import { WHY_STORY_CHAPTERS } from '../../data/why-story'

/* Helper function to split headlines and inject brand script highlights for key words */
function renderHeadline(headline: string, isLight: boolean = false) {
  if (headline.includes('anonymous')) {
    const parts = headline.split('anonymous')
    return (
      <>
        {parts[0]}
        <span className={clsx(isLight ? "text-white/60" : "text-ink/50")}>
          anonymous
        </span>
        {parts[1]}
      </>
    )
  }
  if (headline.includes('mother')) {
    const parts = headline.split('mother')
    return (
      <>
        {parts[0]}
        <span className="text-olive">
          mother
        </span>
        {parts[1]}
      </>
    )
  }
  if (headline.includes('who cooked')) {
    const parts = headline.split('who cooked')
    return (
      <>
        {parts[0]}
        <span className="text-partner">
          who cooked
        </span>
        {parts[1]}
      </>
    )
  }
  return headline
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
}

const cardVariants = (yOffset: number, prefersReducedMotion: boolean | null) => ({
  hidden: {
    opacity: 0,
    y: yOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.35 : 0.85,
      ease: EASE,
    },
  },
})

const WhyMotherBhojanExists = () => {
  const beforeChapter = WHY_STORY_CHAPTERS.find((c) => c.id === 'before')!
  const todayChapter = WHY_STORY_CHAPTERS.find((c) => c.id === 'today')!
  const tomorrowChapter = WHY_STORY_CHAPTERS.find((c) => c.id === 'tomorrow')!

  const prefersReducedMotion = useReducedMotion()
  const yOffset = prefersReducedMotion ? 0 : 35
  const activeCardVariants = cardVariants(yOffset, prefersReducedMotion)

  return (
    <Section
      id="why-mother-bhojan-exists"
      aria-labelledby="why-mother-bhojan-heading"
      className="bg-surface"
      innerClassName="max-w-[1240px] py-16 md:py-24"
    >
      <SectionHeader
        eyebrow="Why Mother Bhojan exists"
        id="why-mother-bhojan-heading"
        align="center"
        marginBottom="mb-12 md:mb-16"
        lines={[
          compactAccentLine({
            text: 'Trust Made ',
            accent: 'personal',
          }),
        ]}
      />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left Column: Card 1 (Before) */}
        <motion.div className="lg:col-span-5 h-full" variants={activeCardVariants}>
          <article className="relative overflow-hidden bg-ink border border-border/10 bg-opacity-10 p-8 rounded-[28px] shadow-surface-sm group transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[480px] lg:min-h-full h-full">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={beforeChapter.image}
                alt={beforeChapter.headline}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale"
                style={{ objectPosition: '78% 95%' }}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              {/* Dark overlay behind text at bottom only */}
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none" />
            </div>

            {/* Content Top */}
            <div className="relative z-10 flex flex-col text-left">
              <span className="font-antonio text-[54px] font-extrabold leading-none text-white/90">01</span>
              <span className="text-[10px] font-extrabold tracking-[2px] text-white/50 uppercase mt-4">BEFORE</span>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 flex flex-col text-left mt-auto">
              <h3 className="font-jakarta text-[22px] sm:text-[24px] font-bold leading-snug tracking-tight text-white mt-0">
                {renderHeadline(beforeChapter.headline, true)}
              </h3>
              
              <p className="mt-3 text-[14px] leading-relaxed text-white/70 text-pretty">
                {beforeChapter.body}
              </p>
            </div>
          </article>
        </motion.div>

        {/* Right Column: Card 2 (Today) & Card 3 (Tomorrow) */}
        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 justify-between">
          {/* Card 2: Today */}
          <motion.div className="flex-1 flex" variants={activeCardVariants}>
            <article className="flex flex-col sm:flex-row relative overflow-hidden bg-white border border-border/40 rounded-[28px] shadow-surface-sm group transition-transform duration-300 hover:-translate-y-1 flex-1">
              {/* Content Area */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-antonio text-[28px] font-extrabold leading-none text-partner">02</span>
                  <span className="text-[10px] font-extrabold tracking-[2px] text-partner/70 uppercase">TODAY</span>
                </div>

                <h3 className="font-jakarta text-[20px] font-bold leading-snug text-ink tracking-tight mb-2.5">
                  {renderHeadline(todayChapter.headline)}
                </h3>

                <p className="m-0 text-pretty font-jakarta text-[14px] leading-relaxed text-text-500">
                  {todayChapter.body}
                </p>
              </div>

              {/* Image Area */}
              <div className="w-full sm:w-[42%] relative min-h-[200px] sm:min-h-0 overflow-hidden">
                <Image
                  src={todayChapter.image}
                  alt={todayChapter.headline}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Soft gradient edge to blend with content background */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 hidden sm:block pointer-events-none" />
              </div>
            </article>
          </motion.div>

          {/* Card 3: Tomorrow */}
          <motion.div className="flex-1 flex" variants={activeCardVariants}>
            <article className="flex flex-col sm:flex-row relative overflow-hidden bg-white border border-border/40 rounded-[28px] shadow-surface-sm group transition-transform duration-300 hover:-translate-y-1 flex-1">
              {/* Content Area */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-antonio text-[28px] font-extrabold leading-none text-olive">03</span>
                  <span className="text-[10px] font-extrabold tracking-[2px] text-olive/70 uppercase">TOMORROW</span>
                </div>

                <h3 className="font-jakarta text-[20px] font-bold leading-snug text-ink tracking-tight mb-2.5">
                  {renderHeadline(tomorrowChapter.headline)}
                </h3>

                <p className="m-0 text-pretty font-jakarta text-[14px] leading-relaxed text-text-500">
                  {tomorrowChapter.body}
                </p>
              </div>

              {/* Image Area */}
              <div className="w-full sm:w-[42%] relative min-h-[200px] sm:min-h-0 overflow-hidden">
                <Image
                  src={tomorrowChapter.image}
                  alt={tomorrowChapter.headline}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Soft gradient edge to blend with content background */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 hidden sm:block pointer-events-none" />
              </div>
            </article>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}

export default WhyMotherBhojanExists

