'use client'

import clsx from 'clsx'
import { CustomDropdown } from '@/shared/components/ui'

export type DietFilter = 'all' | 'veg' | 'nonveg'

export type KitchenFiltersState = {
  cuisine: string
  diet: DietFilter
}

export const CUISINES = [
  'All cuisines',
  'North Indian',
  'South Indian',
  'Punjabi',
  'Bengali',
  'Gujarati',
  'Bakery',
] as const

type KitchenFiltersProps = {
  filters: KitchenFiltersState
  onChange: (next: KitchenFiltersState) => void
  resultCount?: number
  className?: string
}

const dietOptions: { value: DietFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Veg' },
  { value: 'nonveg', label: 'Non-veg' },
]

const KitchenFilters = ({
  filters,
  onChange,
  resultCount,
  className,
}: KitchenFiltersProps) => {
  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-3.5',
        className,
      )}
    >
      <CustomDropdown
        label="Cuisine"
        options={CUISINES}
        value={filters.cuisine}
        onChange={(cuisine) => onChange({ ...filters, cuisine })}
        buttonClassName="min-w-[175px]"
      />

      <div
        className="inline-flex gap-1.5 rounded-xl border border-ink/10 bg-paper p-1"
        role="group"
        aria-label="Diet filter"
      >
        {dietOptions.map((option) => {
          const pressed = filters.diet === option.value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange({ ...filters, diet: option.value })}
              className={clsx(
                'cursor-pointer rounded-xl border-none px-4 py-2 font-jakarta text-xs font-bold transition-all duration-150',
                pressed
                  ? 'bg-verified/20 text-verified-dark shadow-sm'
                  : 'bg-transparent text-muted hover:text-ink',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {typeof resultCount === 'number' ? (
        <span className="ml-auto text-[13.5px] font-semibold text-muted">
          {resultCount} verified kitchen{resultCount === 1 ? '' : 's'}
        </span>
      ) : null}
    </div>
  )
}

export default KitchenFilters
