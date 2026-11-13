'use client'

import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { Button, CustomDropdown, HEADER_TO_BODY_GAP, RADIUS_CARD, Section, SectionHeader, compactAccentLine } from '@/components'
import BackButton from './BackButton'
import { JOIN_CONTENT_WIDTH } from './constants'

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:30 PM']

type BookInterviewProps = {
  onBack: () => void
}

const BookInterview = ({ onBack }: BookInterviewProps) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState(TIME_SLOTS[0])
  const [submitted, setSubmitted] = useState(false)

  return (
    <Section id="book" aria-labelledby="book-heading" className="bg-paper">
      <div className={`mx-auto ${JOIN_CONTENT_WIDTH}`}>
        <SectionHeader
          id="book-heading"
          align="center"
          eyebrow="Step 4 · Book your home interview"
          gradient="ink"
          marginBottom={HEADER_TO_BODY_GAP}
          description="Every day, 9 AM–5 PM IST. Choose any slot from tomorrow up to two weeks out."
          lines={[compactAccentLine({ text: 'Pick a time that', accent: 'suits you' })]}
        />

        {submitted ? (
          <div
            className={`flex flex-col items-center gap-3 border border-verified/25 bg-verified/10 ${RADIUS_CARD} p-8 text-center`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-verified text-white">
              <FiCheckCircle className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="text-[17px] font-bold text-ink">You&apos;re all set!</h3>
            <p className="body-copy !text-text-500">
              We&apos;ve noted your interview slot. A confirmation is on its way to you on WhatsApp.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
            className={`border border-border-card bg-white text-left ${RADIUS_CARD} p-6 shadow-surface-md-soft sm:p-7`}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-ink">Pick a day</span>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-[14px] text-ink focus:border-partner focus:outline-none"
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-bold text-ink">Time (IST)</span>
                <CustomDropdown
                  options={TIME_SLOTS}
                  value={time}
                  onChange={setTime}
                  buttonClassName="w-full min-w-0"
                  className="w-full"
                />
              </div>
            </div>

            <p className="mt-4 text-[12.5px] text-muted">
              Calendly embed in the live build · confirmation sent on WhatsApp.
            </p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <BackButton onClick={onBack} />
              <Button type="submit" variant="partner" size="md" className="flex-1 justify-center">
                Book my interview
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  )
}

export default BookInterview
