'use client'

import clsx from 'clsx'
import { FiCheck } from 'react-icons/fi'
import { Section } from '@/components'
import { JOIN_CONTENT_WIDTH } from './constants'

const STEPS = [
  { n: 1, label: 'Eligibility' },
  { n: 2, label: 'Application' },
  { n: 3, label: 'Uploads' },
  { n: 4, label: 'Book' },
] as const

type StepIndicatorProps = {
  activeStep: number
  onStepClick: (step: number) => void
}

const StepIndicator = ({ activeStep, onStepClick }: StepIndicatorProps) => {
  return (
    <Section flushTop flushBottom innerClassName="py-6 sm:py-7" className="border-b border-border-subtle bg-paper">
      <ol className={`mx-auto flex items-center justify-center ${JOIN_CONTENT_WIDTH}`}>
        {STEPS.map((step, idx) => {
          const isActive = step.n === activeStep
          const isDone = step.n < activeStep
          const isLast = idx === STEPS.length - 1

          return (
            <li key={step.n} className={clsx('flex items-center', !isLast && 'flex-1')}>
              <button
                type="button"
                disabled={!isDone}
                onClick={() => onStepClick(step.n)}
                className={clsx('group flex shrink-0 items-center gap-2.5', isDone && 'cursor-pointer')}
              >
                <span
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors',
                    isActive
                      ? 'bg-partner text-white ring-4 ring-partner/15'
                      : isDone
                        ? 'bg-verified text-white group-hover:bg-verified-dark'
                        : 'border border-ink/15 bg-white text-muted',
                  )}
                >
                  {isDone ? <FiCheck className="h-4 w-4" aria-hidden /> : step.n}
                </span>
                <span
                  className={clsx(
                    'hidden text-[13px] font-bold sm:inline',
                    isActive ? 'text-ink' : isDone ? 'text-ink/70' : 'text-muted',
                  )}
                >
                  {step.label}
                </span>
              </button>

              {!isLast ? (
                <span
                  aria-hidden
                  className={clsx(
                    'mx-3 h-[2px] flex-1 rounded-full transition-colors sm:mx-4',
                    isDone ? 'bg-verified/50' : 'bg-border',
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

export default StepIndicator
