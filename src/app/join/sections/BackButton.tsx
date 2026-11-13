'use client'

import { FiArrowLeft } from 'react-icons/fi'

type BackButtonProps = {
  onClick: () => void
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-muted transition-colors hover:text-ink"
  >
    <FiArrowLeft className="h-4 w-4" aria-hidden />
    Back
  </button>
)

export default BackButton
