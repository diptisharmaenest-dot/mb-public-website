import type { SectionHeaderClassNames } from '@/components'

/** Hero-only title sizes — not part of SectionHeader defaults. */
export const HERO_HEADING_TITLE =
  'font-antonio text-[2rem] font-bold uppercase leading-[1.05] text-customer sm:text-5xl md:text-6xl lg:text-[6rem]'

export const HERO_HEADING_ACCENT =
  '-rotate-4 mt-5 origin-left inline-block overflow-visible font-aguafina text-[1.5rem] font-normal lowercase translate-y-0 drop-shadow-text-glow sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.25rem] xl:text-[5rem]'

/** Pass to SectionHeader as `classNames={HERO_HEADING_CLASSNAMES}` */
export const HERO_HEADING_CLASSNAMES = {
  lines: 'space-y-0',
  line: 'flex flex-wrap items-baseline gap-x-3 overflow-visible',
  title: HERO_HEADING_TITLE,
  accent: HERO_HEADING_ACCENT,
} as const satisfies SectionHeaderClassNames
