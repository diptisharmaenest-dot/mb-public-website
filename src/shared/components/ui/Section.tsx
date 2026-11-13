import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'clsx'
import { SECTION_MAX_W_DEFAULT, SECTION_PX } from './spacing'

export type SectionProps<T extends ElementType = 'section'> = {
  children: ReactNode
  /** Remove top padding (`pt-0`) — same-background section pairs. */
  flushTop?: boolean
  /** Remove bottom padding (`pb-0`). */
  flushBottom?: boolean
  /** Inner content spans full width (no 1200px track). */
  fullWidth?: boolean
  /** Skip default horizontal gutter. */
  noPaddingX?: boolean
  /** Skip default vertical padding (`pt-0 pb-0`). */
  noPaddingY?: boolean
  /** `section` — full-width outer + contained inner. `div` — single shell (header/footer). */
  as?: T
  /** Outer section: background, overflow, borders. */
  className?: string
  /** Inner shell layout classes. */
  innerClassName?: string
  /** Inside the section, outside the inner shell (e.g. absolute blur orbs). */
  decorations?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

/**
 * Single responsive shell: gutter (24→48→64) + track on one element.
 * `.track-wide.gutter-x` uses calc so content stays a true 1200px while
 * padding remains outside that width at every breakpoint.
 */
function innerShellClass(
  verticalPadding: 'standard' | 'none',
  flushTop: boolean | undefined,
  flushBottom: boolean | undefined,
  fullWidth: boolean,
  noPaddingX: boolean,
  innerClassName?: string,
) {
  const customMaxW = innerClassName?.includes('max-w')
  return clsx(
    'mx-auto w-full',
    verticalPadding === 'none'
      ? 'pt-0 pb-0'
      : clsx(
        flushTop ? 'pt-0' : 'pt-section-standard',
        flushBottom ? 'pb-0' : 'pb-section-standard',
      ),
    !fullWidth && !customMaxW && SECTION_MAX_W_DEFAULT,
    !noPaddingX && SECTION_PX,
    innerClassName,
  )
}

function Section<T extends ElementType = 'section'>({
  children,
  flushTop = false,
  flushBottom = false,
  fullWidth = false,
  noPaddingX = false,
  noPaddingY = false,
  as,
  className,
  innerClassName,
  decorations,
  ...props
}: SectionProps<T>) {
  const Tag = (as ?? 'section') as ElementType

  const isFlushTop = flushTop || noPaddingY
  const isFlushBottom = flushBottom || noPaddingY

  const shellClass = innerShellClass(
    Tag === 'section' && !noPaddingY ? 'standard' : 'none',
    isFlushTop,
    isFlushBottom,
    fullWidth,
    noPaddingX,
    innerClassName,
  )

  if (Tag !== 'section') {
    return (
      <Tag className={clsx(shellClass, className)} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <section className={clsx('w-full', className)} {...props}>
      {decorations}
      <div className={shellClass}>{children}</div>
    </section>
  )
}

/** Single shell — header, footer, in-page blocks. No vertical padding. */
function SectionContainer({
  children,
  flushTop = false,
  flushBottom = false,
  fullWidth = false,
  noPaddingX = false,
  className,
  innerClassName,
  ...props
}: SectionProps<'div'>) {
  const shellClass = innerShellClass(
    'none',
    flushTop,
    flushBottom,
    fullWidth,
    noPaddingX,
    innerClassName,
  )

  return (
    <div className={clsx(shellClass, className)} {...props}>
      {children}
    </div>
  )
}

export default Section
export { SectionContainer }
