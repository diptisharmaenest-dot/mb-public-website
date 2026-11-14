'use client'

import type { ReactNode } from 'react'
import { useAppDownload } from '@/providers/AppDownloadProvider'
import { androidOpenAppUrl } from '@/shared/data/app-download'
import Button, { type ButtonVariant } from './Button'

type DownloadAppButtonProps = {
  /** Where the click came from — sent with notify-me entries. */
  source: string
  children?: ReactNode
  /** Label when the app is confirmed installed (Android). Defaults to "Open app". */
  openLabel?: ReactNode
  /** 'none' renders a plain button that keeps the caller's own classes untouched. */
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  onClick?: () => void
}

/**
 * Customer-app CTA.
 * - App confirmed installed (Android Chrome): shows `openLabel` and opens the app.
 * - Otherwise: opens the download popup (desktop QR / phone bottom sheet).
 */
export default function DownloadAppButton({
  source,
  children = 'Download app',
  openLabel = 'Open app',
  variant = 'customer',
  size,
  fullWidth,
  className,
  onClick,
}: DownloadAppButtonProps) {
  const { appInstalled, openDownload } = useAppDownload()
  const openUrl = appInstalled ? androidOpenAppUrl() : ''

  const handleClick = () => {
    onClick?.()
    if (openUrl) {
      window.location.href = openUrl
      return
    }
    openDownload(source)
  }

  const label = openUrl ? openLabel : children

  if (variant === 'none') {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {label}
      </button>
    )
  }

  return (
    <Button type="button" variant={variant} size={size} fullWidth={fullWidth} className={className} onClick={handleClick}>
      {label}
    </Button>
  )
}
