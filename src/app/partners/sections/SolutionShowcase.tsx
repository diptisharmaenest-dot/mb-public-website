'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { Button, DISPLAY_HEADER_CLASS_SOLUTION_SHOWCASE, RADIUS_BTN, RADIUS_CARD, RADIUS_DEFAULT, RADIUS_SECTION, SectionContainer, SectionHeader } from '@/components'
import { RiDoubleQuotesL } from 'react-icons/ri'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

type MiniCard = {
  title: string
  description: string
  icon: IconType
}

type SolutionShowcaseProps = {
  id: string
  bannerImage: string | StaticImageData
  bannerAlt: string
  heading: string
  scriptText: string
  eyebrow?: string
  subText?: string
  cards: MiniCard[]
  highlightText: string
  highlightTone: 'primary' | 'secondary' | 'yellow'
  testimonialAuthor?: string
  testimonialRole?: string
  testimonials?: Array<{
    text: string
    author: string
    role?: string
  }>
  classNames?: {
    section?: string
    container?: string
    cardsGrid?: string
    card?: string
    secondCardOffset?: string
    testimonial?: string
  }
}

const toneStyles: Record<SolutionShowcaseProps['highlightTone'], string> = {
  primary: 'bg-mb-partner-panel text-white',
  secondary: 'bg-mb-verified-panel text-white',
  yellow: 'bg-mb-yellow-panel text-white',
}

const bannerTintStyles: Record<SolutionShowcaseProps['highlightTone'], string> = {
  primary: 'bg-gradient-to-t from-partner/45 via-partner/10 to-transparent',
  secondary: 'bg-gradient-to-t from-verified/45 via-verified/10 to-transparent',
  yellow: 'bg-gradient-to-t from-yellow/55 via-yellow/15 to-transparent',
}

const iconToneStyles: Record<SolutionShowcaseProps['highlightTone'], string> = {
  primary: 'bg-partner/10 text-partner',
  secondary: 'bg-verified/15 text-verified-text',
  yellow: 'bg-yellow/20 text-[#8a6a10]',
}

const SolutionShowcase = ({
  id,
  bannerImage,
  bannerAlt,
  heading,
  cards,
  subText = 'Manage all your orders, customers, deliveries and more with one easy-to-use tool.',
  highlightText,
  highlightTone,
  testimonialAuthor = 'Kitchen Partner',
  testimonialRole = 'Mother Bhojan',
  testimonials,
  scriptText = '',
  eyebrow,
  classNames,
}: SolutionShowcaseProps) => {
  const normalizedTestimonials = useMemo(() => {
    if (testimonials?.length) return testimonials
    return [
      {
        text: highlightText,
        author: testimonialAuthor,
        role: testimonialRole,
      },
    ]
  }, [highlightText, testimonialAuthor, testimonialRole, testimonials])
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const activeTestimonial = normalizedTestimonials[activeTestimonialIndex]
  const hasMultipleTestimonials = normalizedTestimonials.length > 1

  const goToPreviousTestimonial = () => {
    setActiveTestimonialIndex((previousIndex) =>
      previousIndex === 0 ? normalizedTestimonials.length - 1 : previousIndex - 1
    )
  }

  const goToNextTestimonial = () => {
    setActiveTestimonialIndex((previousIndex) =>
      previousIndex === normalizedTestimonials.length - 1 ? 0 : previousIndex + 1
    )
  }

  const headingLines = heading.split('. ').map((line, index) => ({
    text: line.trim(),
    ...(index === 0 && scriptText ? { accent: scriptText } : {}),
  }))

  return (
    <section
      id={id}
      className={clsx('scroll-mt-24 pb-section-generous md:scroll-mt-28', classNames?.section)}
    >
      <SectionContainer flushTop className={classNames?.container}>
        {/* TOP BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`relative overflow-hidden ${RADIUS_CARD}`}>
            <Image
              src={bannerImage}
              alt={bannerAlt}
              width={1600}
              height={520}
              className="h-[10rem] w-full object-cover sm:h-[12rem] md:h-[15rem] lg:h-[17rem]"
            />
            <div className={clsx('pointer-events-none absolute inset-0', bannerTintStyles[highlightTone])} aria-hidden />
          </div>
        </motion.div>

        {/* HEADING */}
        <SectionHeader
          eyebrow={eyebrow ?? scriptText}
          align="center"
          animated={false}
          marginBottom="mb-0"
          gradient="olive"
          accent="text-partner"
          lines={headingLines}
          className="mt-8 sm:mt-12 md:mt-16"
          classNames={{ header: DISPLAY_HEADER_CLASS_SOLUTION_SHOWCASE }}
        />

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="body-copy-muted mx-auto mt-3 max-w-[92%] px-1 text-center md:max-w-[90%]"
        >
          {subText}
        </motion.p>

        {/* TWO FEATURE CARDS */}
        <div className={clsx('mt-10 grid gap-6 sm:mt-14 sm:gap-8 md:grid-cols-2 lg:mt-18 lg:gap-10', classNames?.cardsGrid)}>
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 24,
                  x: index === 0 ? -28 : 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className={clsx(
                  `flex h-full flex-col overflow-hidden ${RADIUS_CARD} bg-phoneFrameGlassInnerBorder p-3 shadow-solution-card sm:p-4`,
                  classNames?.card,
                  index === 1 && (classNames?.secondCardOffset ?? 'md:translate-y-10 lg:translate-y-20')
                )}
              >
                <div className={`${RADIUS_DEFAULT} bg-surface p-5 sm:min-h-44 sm:p-8`}>
                  <h3 className="mb-2 font-jakarta text-[22px] font-extrabold tracking-[-0.4px] text-ink sm:mb-3">
                    {card.title}
                  </h3>
                  <p className="body-copy">
                    {card.description}
                  </p>
                </div>

                <div className={`mt-4 flex flex-1 items-center justify-center ${RADIUS_DEFAULT} bg-bgLight/60 p-8 backdrop-blur-3xl sm:mt-5 sm:p-10`}>
                  <div className={clsx('flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20', iconToneStyles[highlightTone])}>
                    <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.8} aria-hidden />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* TESTIMONIAL BAR */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={clsx(
            `mt-12 min-h-0 ${RADIUS_SECTION} p-6 pb-4 sm:mt-16 sm:p-10 md:mt-28 md:min-h-72 md:p-16 md:pb-6 lg:mt-32`,
            toneStyles[highlightTone],
            classNames?.testimonial
          )}
        >
          <div className="flex flex-col gap-6 sm:gap-10 md:gap-12">
            <div className="flex items-start gap-2 sm:gap-3">
              <RiDoubleQuotesL className="mt-0.5 shrink-0 text-xl sm:mt-[2px] sm:text-2xl" />

              <p className="body-copy-on-dark max-w-[980px]">
                {activeTestimonial.text}
              </p>
            </div>

            <div className="h-px w-full bg-white/20" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-base font-medium sm:text-[1.1rem]">
                  <span className="h-px w-7 shrink-0 bg-white/90" />
                  {activeTestimonial.author}
                </p>
                {activeTestimonial.role ? (
                  <p className="mt-1 pl-9 text-xs text-white/80 sm:text-sm">{activeTestimonial.role}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-4">
                <div className="flex items-center gap-1 text-base font-medium sm:text-[1.1rem]">
                  <span>★</span>
                  <span>4.9</span>
                </div>

                {hasMultipleTestimonials ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={goToPreviousTestimonial}
                      aria-label="Show previous testimonial"
                      variant="none"
                      size="sm"
                      className={`h-11 w-11 ${RADIUS_BTN} border border-white/40 p-0 text-xl text-white hover:bg-white/10 sm:text-2xl`}
                    >
                      ‹
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTestimonial}
                      aria-label="Show next testimonial"
                      variant="none"
                      size="sm"
                      className={`h-11 w-11 ${RADIUS_BTN} border border-white/40 p-0 text-xl text-white hover:bg-white/10 sm:text-2xl`}
                    >
                      ›
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  )
}

export default SolutionShowcase