'use client'

import clsx from 'clsx'
import { FiSearch, FiX } from 'react-icons/fi'

export type DietFilter = 'all' | 'veg' | 'nonveg'

export type KitchenFiltersState = {
  query: string
  cuisine: string
  diet: DietFilter
}

export const ALL_CUISINES = 'All'

export const DEFAULT_KITCHEN_FILTERS: KitchenFiltersState = {
  query: '',
  cuisine: ALL_CUISINES,
  diet: 'all',
}

type KitchenFiltersProps = {
  filters: KitchenFiltersState
  onChange: (next: KitchenFiltersState) => void
  /** Cuisine chips, built from the kitchens' own categories. */
  cuisines: string[]
  resultCount?: number
  className?: string
}

const dietOptions: { value: DietFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Veg' },
  { value: 'nonveg', label: 'Non-veg' },
]

const KitchenFilters = ({ filters, onChange, cuisines, resultCount, className }: KitchenFiltersProps) => {
  return (
    <div
      className={clsx(
        'rounded-[22px] border border-ink/[0.08] bg-white p-3 shadow-[0_10px_30px_-18px_rgba(42,31,24,0.3)] sm:p-4',
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search kitchens</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="Search a kitchen, cook or dish"
            className="h-12 w-full rounded-2xl border border-ink/10 bg-paper pl-11 pr-10 text-[15px] text-ink outline-none transition placeholder:text-ink/40 focus:border-customer/50 focus:bg-white focus:ring-4 focus:ring-customer/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.query ? (
            <button
              type="button"
              onClick={() => onChange({ ...filters, query: '' })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"
            >
              <FiX className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </label>

        <div className="inline-flex shrink-0 self-start rounded-2xl bg-paper p-1 sm:self-auto" role="group" aria-label="Diet">
          {dietOptions.map((option) => {
            const pressed = filters.diet === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange({ ...filters, diet: option.value })}
                className={clsx(
                  'inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl px-4 text-[13px] font-bold transition-all duration-150',
                  pressed ? 'bg-white text-ink shadow-sm' : 'text-ink/55 hover:text-ink',
                )}
              >
                {option.value !== 'all' ? (
                  <span
                    aria-hidden
                    className={clsx(
                      'flex h-3 w-3 items-center justify-center rounded-[3px] border',
                      option.value === 'veg' ? 'border-verified' : 'border-partner',
                    )}
                  >
                    <span className={clsx('h-1.5 w-1.5 rounded-full', option.value === 'veg' ? 'bg-verified' : 'bg-partner')} />
                  </span>
                ) : null}
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div
          className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1 pr-8 [mask-image:linear-gradient(to_right,black_calc(100%-40px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Cuisine"
        >
          {[ALL_CUISINES, ...cuisines].map((c) => {
            const active = filters.cuisine === c
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...filters, cuisine: c })}
                className={clsx(
                  'h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold transition-colors',
                  active
                    ? 'border-ink bg-ink text-white'
                    : 'border-ink/10 bg-white text-ink/70 hover:border-ink/30 hover:text-ink',
                )}
              >
                {c === ALL_CUISINES ? 'All cuisines' : c}
              </button>
            )
          })}
        </div>

        {typeof resultCount === 'number' ? (
          <span className="hidden shrink-0 text-[13px] font-semibold text-ink/50 sm:block" aria-live="polite">
            {resultCount} kitchen{resultCount === 1 ? '' : 's'}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default KitchenFilters
