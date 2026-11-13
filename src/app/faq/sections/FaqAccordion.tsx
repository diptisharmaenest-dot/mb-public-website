'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import clsx from 'clsx'
import {
  ACCORDION_ANSWER_PADDING,
  ACCORDION_QUESTION_OPEN_PB,
  RADIUS_CARD,
  Section,
} from '@/components'
import type { FAQItem } from '@/shared/data/faqs'
import { EASE } from '@/shared/lib/motion'

type FaqAccordionProps = {
  faqs: FAQItem[]
  initialOpenIndex?: number
}

function FaqRow({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      className={clsx(
        `overflow-hidden ${RADIUS_CARD} border transition-all duration-300`,
        isOpen
          ? 'border-verified/35 bg-verified shadow-surface-md'
          : 'border-ink/[0.08] bg-paper shadow-[0_4px_18px_rgba(42,31,24,0.04)] hover:border-verified/20',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={clsx(
          'flex w-full cursor-pointer items-start gap-4 px-5 text-left sm:px-6',
          isOpen
            ? `pt-5 sm:pt-[22px] ${ACCORDION_QUESTION_OPEN_PB}`
            : 'py-5 sm:py-[22px]',
        )}
      >
        <span
          className={clsx(
            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-jakarta text-xs font-bold tabular-nums transition-colors duration-300 sm:mt-0',
            isOpen
              ? 'bg-white/20 text-white'
              : 'bg-verified-pill text-verified-text',
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={clsx(
            'min-w-0 flex-1 font-jakarta text-[17px] font-bold leading-snug sm:text-lg md:text-[20px]',
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
              : 'bg-customer/10 text-customer',
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
            <div
              className={`border-t border-white/15 px-5 sm:px-6 ${ACCORDION_ANSWER_PADDING}`}
            >
              <p className="body-copy-on-dark max-w-[680px] pl-12">{answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

const FaqAccordion = ({
  faqs,
  initialOpenIndex = 0,
}: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex)

  return (
    <Section
      id="faq-list"
      aria-label="Frequently asked questions"
    >
      <div className="flex w-full flex-col gap-3 sm:gap-3.5">
        {faqs.map((faq, index) => (
          <FaqRow
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            index={index}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((prev) => (prev === index ? -1 : index))
            }
          />
        ))}
      </div>
    </Section>
  )
}

export default FaqAccordion
