'use client'

import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Button, HEADER_TO_BODY_GAP, Section, SectionHeader } from '@/components'
import BackButton from './BackButton'
import { JOIN_CONTENT_WIDTH } from './constants'
import YesNoToggle from './YesNoToggle'

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-partner focus:outline-none'

type TextFieldProps = {
  label: string
  help?: string
} & InputHTMLAttributes<HTMLInputElement>

function TextField({ label, help, ...props }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-[13px] font-bold text-ink">
        {label}
        {help ? <span className="ml-1.5 font-medium text-muted">— {help}</span> : null}
      </span>
      <input className={inputClass} {...props} />
    </label>
  )
}

type ApplicationFormProps = {
  onNext: () => void
  onBack: () => void
}

const ApplicationForm = ({ onNext, onBack }: ApplicationFormProps) => {
  const [familySupportive, setFamilySupportive] = useState<'yes' | 'no' | null>(null)
  const [familyError, setFamilyError] = useState(false)

  return (
    <Section id="application" aria-labelledby="application-heading" className="bg-paper">
      <div className={`mx-auto ${JOIN_CONTENT_WIDTH}`}>
        <SectionHeader
          id="application-heading"
          align="center"
          eyebrow="Step 2 · Application form"
          gradient="ink"
          marginBottom={HEADER_TO_BODY_GAP}
          description="One thing at a time. Label above every field."
          lines={[{ text: 'Tell us about you & your cooking' }]}
        />

        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!familySupportive) {
              setFamilyError(true)
              return
            }
            setFamilyError(false)
            onNext()
          }}
          className="flex flex-col gap-5 text-left"
        >
          <TextField label="Full name" help="shown as “Chef [Name]”" placeholder="e.g. Sunita Sharma" required />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Address & sector" placeholder="House, sector" required />
            <TextField label="PIN code" help="confirms 5 km band" placeholder="160055" required />
          </div>

          <div>
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-4">
              <span className="text-[15px] font-semibold text-ink">
                Is your family supportive of a home kitchen?
              </span>
              <YesNoToggle
                value={familySupportive}
                onChange={(value) => {
                  setFamilySupportive(value)
                  setFamilyError(false)
                }}
              />
            </div>
            {familyError ? (
              <p className="mt-2 text-[12.5px] font-semibold text-customer">Please select Yes or No.</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Orders you can comfortably prep at once" placeholder="e.g. 10–15" required />
            <TextField label="Monthly earning you hope for" placeholder="Amount in ₹" required />
          </div>

          <TextField label="Speciality cuisine" placeholder="e.g. North Indian vegetarian" required />
          <TextField
            label="Your three signature dishes"
            placeholder="Dal makhani, rajma chawal, roti & sabzi"
            required
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold text-ink">Why are you joining Mother Bhojan?</span>
            <textarea rows={4} placeholder="In your own words…" className={inputClass} required />
          </label>

          <div className="mt-3 flex items-center justify-between">
            <BackButton onClick={onBack} />
            <Button type="submit" variant="partner" size="md" className="inline-flex items-center gap-2">
              Continue
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </form>
      </div>
    </Section>
  )
}

export default ApplicationForm
