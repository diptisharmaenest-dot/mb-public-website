'use client'

import type { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { EASE } from '@/shared/lib/motion'
import { cn } from '@/shared/lib'
import { PROSE_MAX_WIDTH } from './spacing'

/** Default section eyebrow — 12px, consumer red on web */
export const SECTION_EYEBROW_CLASS = 'text-[14px] font-semibold text-partner'

export const HEADING_GRADIENTS = {
  olive: '!text-olive',
  gold: '!text-yellow',
  yellow: '!text-yellow',
  ink: '!text-ink',
  white: '!text-white',
  whiteSoft: '!text-white',
  whiteStrong: '!text-white',
  partner: '!text-partner',
  customer: '!text-customer',
  verified: '!text-verified',
  'verified-text': '!text-verified-text',
  paper: '!text-paper',
} as const satisfies Record<string, string>

export type GradientKey =
  | 'olive'
  | 'gold'
  | 'ink'
  | 'white'
  | 'whiteSoft'
  | 'whiteStrong'
  | 'partner'
  | 'customer'

export type SolidKey =
  | 'olive'
  | 'verified'
  | 'verified-text'
  | 'customer'
  | 'partner'
  | 'yellow'
  | 'ink'
  | 'white'
  | 'paper'

export type HeadingSolid = SolidKey | (string & {})

/** `true` = solid fill of `gradient` key; or pass a color key / class string */
export type SolidProp = boolean | HeadingSolid

export type HeadingLine = {
  text: string
  accent?: string
  accentNode?: ReactNode
  rotateAccent?: boolean
  gradient?: GradientKey
  /** `true` uses solid of this line’s / header `gradient`; or a color key / class */
  solid?: SolidProp
  noWrap?: boolean
  accentClassName?: string
  titleClassName?: string
  rowClassName?: string
  fontSize?: string
}

export const SECTION_HEADING_TITLE_DISPLAY =
  'text-[1.85rem] font-semibold tracking-normal text-ink leading-none sm:text-[2.5rem] lg:text-[44px]'

export const SECTION_HEADING_SIMPLE =
  'text-h3 font-bold tracking-[-0.4px] text-ink'

export const SECTION_HEADING_SIMPLE_ON_DARK =
  'text-h3 font-bold tracking-[-0.4px] text-footer-text'

export const SECTION_HEADING_CUSTOM_FS =
  '[font-size:var(--section-heading-fs)] lg:[font-size:var(--section-heading-fs)]'

export const COMPACT_ACCENT_CLASS =
  '!leading-none !translate-y-0 !pb-0'

const SECTION_HEADING_LINES_DISPLAY = 'space-y-1'
const SECTION_HEADING_LINE_DEFAULT =
  'flex flex-wrap items-baseline gap-x-3 gap-y-0 sm:gap-x-4'
const SECTION_HEADING_ACCENT_DISPLAY =
  'inline-block font-jakarta text-[1.85rem] font-semibold tracking-normal normal-case leading-[1.18] translate-y-0 pb-0 sm:text-[2.5rem] lg:text-[44px]'

export type SectionHeaderClassNames = {
  eyebrow?: string
  description?: string
  header?: string
  title?: string
  accent?: string
  lines?: string
  line?: string
}

/** Default mid-page title styles (override via classNames when needed) */
export const SECTION_HEADING_DISPLAY_PROPS = {
  linesClassName: SECTION_HEADING_LINES_DISPLAY,
  lineClassName: SECTION_HEADING_LINE_DEFAULT,
  titleClassName: SECTION_HEADING_TITLE_DISPLAY,
  accentClassName: SECTION_HEADING_ACCENT_DISPLAY,
} as const

export function compactAccentLine(line: HeadingLine): HeadingLine {
  if (!line.accent && !line.accentNode) return line
  return {
    ...line,
    accentClassName: [COMPACT_ACCENT_CLASS, line.accentClassName]
      .filter(Boolean)
      .join(' '),
  }
}

function resolveHeadingFill(
  line: HeadingLine,
  solid: SolidProp | undefined,
  gradient: GradientKey | undefined,
): string | null {
  const lineSolidKey = line.solid === true ? (line.gradient ?? gradient) : typeof line.solid === 'string' ? line.solid : null
  const headerSolidKey = solid === true ? gradient : typeof solid === 'string' ? solid : null
  const key = lineSolidKey ?? headerSolidKey ?? line.gradient ?? gradient

  if (!key) return null
  return HEADING_GRADIENTS[key as keyof typeof HEADING_GRADIENTS] ?? (typeof key === 'string' ? key : null)
}

const HEADING_FS_VAR = '--section-heading-fs'

function titleStyle(line: HeadingLine): CSSProperties | undefined {
  if (!line.fontSize) return undefined
  return { [HEADING_FS_VAR]: line.fontSize } as CSSProperties
}

export type SectionHeaderProps = {
  lines: HeadingLine[]
  eyebrow?: string
  description?: string
  action?: ReactNode

  as?: 'h1' | 'h2' | 'div'
  id?: string
  align?: 'left' | 'center'
  className?: string
  marginBottom?: string
  /** Defaults to true. Pass false for heroes / inline feature titles. */
  animated?: boolean

  /** Clipped gradient key from HEADING_GRADIENTS (default `olive` for display titles). */
  gradient?: GradientKey
  /**
   * Solid fill:
   * - `true` → solid version of `gradient` (e.g. `gradient="partner" solid`)
   * - color key / class → that solid (e.g. `solid="olive"`)
   */
  solid?: SolidProp
  /** Accent script color class. Defaults to `text-partner`. */
  accent?: string
  accentVariant?: string

  /** Override defaults only where needed. */
  classNames?: SectionHeaderClassNames
}

function HeadingLines({
  lines,
  as: HeadingTag = 'div',
  id,
  align = 'center',
  gradient,
  solid,
  className,
  linesClassName = 'space-y-1',
  lineClassName = SECTION_HEADING_LINE_DEFAULT,
  titleClassName,
  accentClassName,
}: {
  lines: HeadingLine[]
  as?: SectionHeaderProps['as']
  id?: string
  align?: 'left' | 'center'
  gradient?: GradientKey
  solid?: SolidProp
  className?: string
  linesClassName?: string
  lineClassName?: string
  titleClassName?: string
  accentClassName?: string
}) {
  const isCenter = align === 'center'

  return (
    <HeadingTag
      id={id}
      className={clsx('w-full', isCenter ? 'text-center' : 'text-left', className)}
    >
      <div className={linesClassName}>
        {lines.map((line, idx) => (
          <div
            key={`${idx}-${line.text}`}
            className={clsx(
              lineClassName,
              isCenter ? 'justify-center' : 'justify-start',
              line.noWrap && 'flex-nowrap',
              line.rowClassName,
            )}
          >
            {line.text ? (
              <span
                className={clsx(
                  titleClassName,
                  line.fontSize && SECTION_HEADING_CUSTOM_FS,
                  resolveHeadingFill(line, solid, gradient),
                  line.titleClassName,
                )}
                style={titleStyle(line)}
              >
                {line.text}
              </span>
            ) : null}
            {line.accentNode || line.accent ? (
              <span
                className={clsx(
                  accentClassName,
                  line.accentClassName,
                  line.rotateAccent && '-rotate-4 inline-block',
                )}
              >
                {line.accentNode ?? line.accent}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </HeadingTag>
  )
}

export function SectionHeader({
  lines,
  as = 'h2',
  id,
  align = 'center',
  className,
  eyebrow,
  description,
  action,
  animated = true,
  marginBottom = 'mb-10 sm:mb-12 lg:mb-14',
  gradient,
  solid,
  accent,
  classNames,
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  const usingDisplayTitle = classNames?.title === undefined

  // Skip default olive gradient when solid fill is requested
  const wantsSolid =
    solid === true ||
    typeof solid === 'string' ||
    lines.some((line) => line.solid === true || typeof line.solid === 'string')

  const resolvedGradient = wantsSolid
    ? gradient
    : (gradient ?? (usingDisplayTitle ? 'olive' : undefined))

  const resolvedAccent = accent ?? 'text-partner'

  const heading = (
    <HeadingLines
      as={as}
      id={id}
      align={align}
      className={clsx(
        description ? 'mb-3' : 'mb-0',
        isCenter && '[&>div>div]:justify-center',
        classNames?.header,
      )}
      linesClassName={
        classNames?.lines ?? SECTION_HEADING_DISPLAY_PROPS.linesClassName
      }
      lineClassName={
        classNames?.line ?? SECTION_HEADING_LINE_DEFAULT
      }
      titleClassName={
        classNames?.title ?? SECTION_HEADING_DISPLAY_PROPS.titleClassName
      }
      accentClassName={clsx(
        classNames?.accent ?? SECTION_HEADING_DISPLAY_PROPS.accentClassName,
        resolvedAccent,
      )}
      gradient={resolvedGradient}
      solid={solid}
      lines={lines}
    />
  )

  const inner = (
    <>
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 uppercase tracking-[0.2em]',
            SECTION_EYEBROW_CLASS,
            classNames?.eyebrow,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {heading}
      {description ? (
        <p
          className={clsx(
            'text-ink/80 mt-4',
            isCenter ? `mx-auto ${PROSE_MAX_WIDTH} text-center` : 'max-w-prose',
            classNames?.description,
          )}
        >
          {description}
        </p>
      ) : null}
    </>
  )

  const headerWrapClass = clsx(
    isCenter && !action && 'mx-auto text-center',
    action ? 'min-w-0 flex-1' : isCenter && 'text-center',
  )

  const HeaderTag = (animated ? motion.header : 'header') as React.ElementType
  const animProps = animated
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.6 },
        transition: { duration: 0.75, ease: EASE },
      }
    : {}

  if (action) {
    return (
      <div
        className={clsx(
          'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
          marginBottom,
          className,
        )}
      >
        <HeaderTag className={headerWrapClass} {...animProps}>
          {inner}
        </HeaderTag>
        {action}
      </div>
    )
  }

  return (
    <HeaderTag
      className={clsx(headerWrapClass, marginBottom, className)}
      {...animProps}
    >
      {inner}
    </HeaderTag>
  )
}

export default SectionHeader
