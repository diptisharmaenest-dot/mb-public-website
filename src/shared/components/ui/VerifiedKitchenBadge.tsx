import Image from 'next/image'
import clsx from 'clsx'
import { mLogo } from '@/assets'
import {
  VERIFIED_KITCHEN_TITLE,
  verifiedKitchenAuditLabel,
} from '@/shared/data/verified-kitchen'

type VerifiedKitchenBadgeProps = {
  variant?: 'icon' | 'full'
  className?: string
  iconSize?: number
  /** Subtitle tone — default for light surfaces; `on-dark` for ink/footer bands */
  tone?: 'default' | 'on-dark'
}

function VerifiedKitchenMark({ size = 40 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-verified shadow-[0_4px_12px_rgba(111,138,62,0.28)]"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src={mLogo}
        alt=""
        width={Math.round(size * 0.80)}
        height={Math.round(size * 0.80)}
        className="object-contain"
      />
    </span>
  )
}

const VerifiedKitchenBadge = ({
  variant = 'full',
  className,
  iconSize = 40,
  tone = 'default',
}: VerifiedKitchenBadgeProps) => {
  if (variant === 'icon') {
    return (
      <span className={clsx('inline-flex', className)}>
        <VerifiedKitchenMark size={iconSize} />
      </span>
    )
  }

  

  return (
    <span className={clsx('inline-flex items-center gap-2.5', className)}>
      <VerifiedKitchenMark size={iconSize} />
      <span className="flex min-w-0 flex-col leading-[1.18]">
        <b className={clsx('font-jakarta text-s font-extrabold tracking-tight text-olive')}>
          {VERIFIED_KITCHEN_TITLE}
        </b>
        <span className={clsx('font-jakarta text-[12px] font-semibold', tone === 'on-dark' ? 'text-white/80' : 'text-muted')}>
          {verifiedKitchenAuditLabel}
        </span>
      </span>
    </span>
  )
}

export default VerifiedKitchenBadge
