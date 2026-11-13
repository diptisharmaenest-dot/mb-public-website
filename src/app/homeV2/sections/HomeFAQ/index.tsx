'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import clsx from 'clsx'
import {
  ACCORDION_ANSWER_PADDING,
  ACCORDION_QUESTION_OPEN_PB,
  Button,
  compactAccentLine,
  HEADER_TO_BODY_GAP,
  RADIUS_CARD,
  Section,
  SectionHeader,
} from '@/components'
import { ROUTES } from '@/shared/seo'
import { homeFaqGroups } from '../../data/home-faqs'
import { EASE } from '@/shared/lib/motion'

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={clsx(
        `group overflow-hidden ${RADIUS_CARD} border transition-all duration-300`,
        isOpen
          ? 'border-verified/35 bg-verified shadow-surface-md'
          : 'border-ink/[0.08] bg-[#FFFBF2] shadow-[0_4px_18px_rgba(42,31,24,0.05)] hover:-translate-y-0.5 hover:border-verified/25 hover:shadow-[0_12px_32px_rgba(42,31,24,0.10)]',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={clsx(
          'flex w-full cursor-pointer items-start gap-4 px-5 text-left sm:px-6',
          isOpen ? `pt-5 sm:pt-[22px] ${ACCORDION_QUESTION_OPEN_PB}` : 'py-5 sm:py-[22px]',
        )}
      >
        <span
          className={clsx(
            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-jakarta text-xs font-bold tabular-nums transition-colors duration-300 sm:mt-0',
            isOpen
              ? 'bg-white/20 text-white'
              : 'bg-verified-pill text-verified-text group-hover:bg-verified/15',
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={clsx(
            'min-w-0 flex-1 font-jakarta text-lg font-bold leading-snug md:text-[22px]',
            isOpen ? 'text-white' : 'text-ink',
          )}
        >
          {question}
        </span>

        <span
          className={clsx(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
            isOpen
              ? 'bg-white/18 text-white'
              : 'bg-customer/10 text-customer group-hover:bg-customer/15',
          )}
          aria-hidden
        >
          <FiChevronDown
            className={clsx(
              'h-[18px] w-[18px] transition-transform duration-300',
              isOpen ? 'rotate-180' : '',
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className={`border-t border-white/15 px-5 sm:px-6 ${ACCORDION_ANSWER_PADDING}`}>
              <p className="body-copy-on-dark max-w-[680px] pl-12">{answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

const HomeFAQ = () => {
  const [openKey, setOpenKey] = useState(`${homeFaqGroups[0].id}-0`)

  return (
    <Section
      id="faq"
      className="relative overflow-hidden "
      aria-labelledby="home-faq-heading"
    >
      <SectionHeader
        eyebrow="Good to know"
        lines={[compactAccentLine({ text: 'FREQUENTLY ASKED', accent: 'questions' })]}
        id="home-faq-heading"
        align="center"
        gradient="olive"
        accent="text-partner"
        marginBottom={HEADER_TO_BODY_GAP}
      />

      <div className="flex flex-col gap-8 sm:gap-10">
        {homeFaqGroups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-3 font-jakarta text-[13px] font-bold uppercase tracking-[0.14em] text-text-700 sm:mb-4">
              {group.label}
            </h3>
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {group.items.map((faq, index) => {
                const itemKey = `${group.id}-${index}`

                return (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                    isOpen={openKey === itemKey}
                    onToggle={() =>
                      setOpenKey((prev) => (prev === itemKey ? '' : itemKey))
                    }
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        className="mt-10 text-center sm:mt-12"
      >
        <Button href={ROUTES.faq} variant="customerOutline">
          View all questions
        </Button>
      </motion.div>
    </Section>
  )
}

export default HomeFAQ
