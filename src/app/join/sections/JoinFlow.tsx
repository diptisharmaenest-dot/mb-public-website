'use client'

import { useState } from 'react'
import ApplicationForm from './ApplicationForm'
import BookInterview from './BookInterview'
import JoinHero from './Hero'
import EligibilityCheck from './EligibilityCheck'
import StepIndicator from './StepIndicator'
import Uploads from './Uploads'

const TOTAL_STEPS = 4

const JoinFlow = () => {
  const [step, setStep] = useState(1)

  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <>
      <JoinHero />
      <StepIndicator activeStep={step} onStepClick={setStep} />
      {step === 1 ? <EligibilityCheck onNext={goNext} /> : null}
      {step === 2 ? <ApplicationForm onNext={goNext} onBack={goBack} /> : null}
      {step === 3 ? <Uploads onNext={goNext} onBack={goBack} /> : null}
      {step === 4 ? <BookInterview onBack={goBack} /> : null}
    </>
  )
}

export default JoinFlow
