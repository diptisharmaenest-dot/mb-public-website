'use client'

import { useState } from 'react'
import type { IconType } from 'react-icons'
import { FiArrowRight, FiCamera, FiCheckCircle, FiFilm, FiUser, FiVideo } from 'react-icons/fi'
import { Button, CARD_GRID_GAP, HEADER_TO_BODY_GAP, RADIUS_CARD, RADIUS_DEFAULT, Section, SectionHeader } from '@/components'
import BackButton from './BackButton'
import { JOIN_CONTENT_WIDTH } from './constants'

const TILES = [
  { id: 'kitchenPhoto', label: 'Kitchen photo', icon: FiCamera, required: true },
  { id: 'kitchenVideo', label: 'Kitchen video', icon: FiVideo, required: true },
  { id: 'selfPhoto', label: 'Photo of you', icon: FiUser, required: true },
  { id: 'cookingVideo', label: '60s cooking video', icon: FiFilm, required: false },
] as const

function UploadTile({
  label,
  icon: Icon,
  required,
  fileName,
  onFileChange,
  hasError,
}: {
  label: string
  icon: IconType
  required: boolean
  fileName: string | null
  onFileChange: (name: string | null) => void
  hasError: boolean
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col items-center gap-3 border-2 border-dashed bg-white ${RADIUS_CARD} p-6 text-center transition-colors hover:border-customer/40 hover:bg-customer/5 ${
        hasError ? 'border-customer/50' : 'border-ink/15'
      }`}
    >
      <input
        type="file"
        accept={required ? 'image/*,video/*' : 'video/*'}
        className="sr-only"
        onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? null)}
      />
      <div className={`flex h-12 w-12 items-center justify-center ${RADIUS_DEFAULT} bg-customer/10 text-customer`}>
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <span className="text-[14px] font-bold text-ink">{label}</span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
          required ? 'bg-partner/10 text-partner' : 'bg-surface text-muted'
        }`}
      >
        {required ? 'Required' : 'Optional'}
      </span>
      {fileName ? (
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-verified-text">
          <FiCheckCircle className="h-3.5 w-3.5" aria-hidden />
          {fileName}
        </span>
      ) : null}
    </label>
  )
}

type UploadsProps = {
  onNext: () => void
  onBack: () => void
}

const Uploads = ({ onNext, onBack }: UploadsProps) => {
  const [files, setFiles] = useState<Record<string, string | null>>({})
  const [consent, setConsent] = useState(false)
  const [showError, setShowError] = useState(false)

  const missingRequired = TILES.some((tile) => tile.required && !files[tile.id])
  const isComplete = !missingRequired && consent

  const handleContinue = () => {
    if (!isComplete) {
      setShowError(true)
      return
    }
    setShowError(false)
    onNext()
  }

  return (
    <Section id="uploads" aria-labelledby="uploads-heading" className="bg-paper">
      <div className={`mx-auto ${JOIN_CONTENT_WIDTH}`}>
        <SectionHeader
          id="uploads-heading"
          align="center"
          eyebrow="Step 3 · Uploads"
          gradient="ink"
          marginBottom={HEADER_TO_BODY_GAP}
          classNames={{ eyebrow: 'text-verified-text' }}
          description="Stored privately for verification — never published without your say-so."
          lines={[{ text: 'Real, not staged' }]}
        />

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${CARD_GRID_GAP}`}>
          {TILES.map((tile) => (
            <UploadTile
              key={tile.id}
              label={tile.label}
              icon={tile.icon}
              required={tile.required}
              fileName={files[tile.id] ?? null}
              onFileChange={(name) => setFiles((prev) => ({ ...prev, [tile.id]: name }))}
              hasError={showError && tile.required && !files[tile.id]}
            />
          ))}
        </div>

        <label className="mt-6 flex items-start gap-3 text-left">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-partner"
          />
          <span className="text-[13px] leading-relaxed text-text-500">
            I agree that Mother Bhojan (a brand of Womro Solutions Private Limited) may use these photos and
            videos to verify my kitchen and, if I join, to create my chef profile.
          </span>
        </label>

        {showError && !isComplete ? (
          <p className="mt-4 text-center text-[13px] font-semibold text-customer">
            Please upload all required files and accept the consent to continue.
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <BackButton onClick={onBack} />
          <Button type="button" variant="partner" size="md" onClick={handleContinue} className="inline-flex items-center gap-2">
            Continue
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default Uploads
