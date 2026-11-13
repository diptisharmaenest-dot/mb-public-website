'use client'

import { useState } from 'react'
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi'
import { Button, HEADER_TO_BODY_GAP, RADIUS_CARD, RADIUS_DEFAULT, Section, SectionHeader } from '@/components'
import { JOIN_CONTENT_WIDTH } from './constants'
import YesNoToggle from './YesNoToggle'

const QUESTIONS = [
  { id: 'age', label: 'Are you 18 or older?' },
  { id: 'kitchen', label: 'Do you have a clean, dedicated home kitchen?' },
  { id: 'location', label: 'Are you in Mohali, Chandigarh or Panchkula?' },
  { id: 'phone', label: 'Do you have a smartphone & WhatsApp?' },
] as const

type Answer = 'yes' | 'no' | null

type EligibilityCheckProps = {
  onNext: () => void
}

const EligibilityCheck = ({ onNext }: EligibilityCheckProps) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({ age: 'yes' })
  const [showError, setShowError] = useState(false)

  const isComplete = QUESTIONS.every((q) => answers[q.id] === 'yes' || answers[q.id] === 'no')

  const handleContinue = () => {
    if (!isComplete) {
      setShowError(true)
      return
    }
    setShowError(false)
    onNext()
  }

  return (
    <Section id="eligibility" aria-labelledby="eligibility-heading" className="bg-paper">
      <div className={`mx-auto ${JOIN_CONTENT_WIDTH}`}>
        <SectionHeader
          id="eligibility-heading"
          align="center"
          eyebrow="Step 1 · Quick eligibility check"
          gradient="ink"
          marginBottom={HEADER_TO_BODY_GAP}
          classNames={{ eyebrow: 'text-verified-text' }}
          description="Instant and private. A “No” isn’t a dead end — we’ll show you what helps."
          lines={[{ text: 'Four quick questions' }]}
        />

        <div className="flex flex-col gap-4">
          {QUESTIONS.map((q) => {
            const unanswered = showError && answers[q.id] == null
            return (
              <div
                key={q.id}
                className={`flex items-center justify-between gap-4 border-b pb-4 transition-colors ${
                  unanswered ? 'border-customer/40' : 'border-border-subtle'
                }`}
              >
                <span className="text-[15px] font-semibold text-ink">{q.label}</span>
                <YesNoToggle
                  value={answers[q.id] ?? null}
                  onChange={(value) => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                />
              </div>
            )
          })}
        </div>

        <div className={`mt-6 flex items-start gap-4 border border-yellow/40 bg-yellow/10 ${RADIUS_CARD} p-5 text-left`}>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center ${RADIUS_DEFAULT} bg-yellow text-ink`}>
            <FiAlertCircle className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Answered “No” to one?</h3>
            <p className="body-copy mt-1 !text-text-500">
              That’s okay — we’ll show an encouraging “not yet, here’s what helps” note and a way to stay in
              touch. No one is turned away at a wall.
            </p>
          </div>
        </div>

        {showError && !isComplete ? (
          <p className="mt-4 text-center text-[13px] font-semibold text-customer">
            Please answer all four questions to continue.
          </p>
        ) : null}

        <div className="mt-6 flex justify-center">
          <Button type="button" variant="partner" size="md" onClick={handleContinue} className="inline-flex items-center gap-2">
            Continue
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default EligibilityCheck
