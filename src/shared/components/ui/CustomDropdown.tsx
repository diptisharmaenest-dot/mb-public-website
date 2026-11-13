'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

export type DropdownOption<T = string> = {
  value: T
  label: string
  icon?: React.ReactNode
  description?: string
  disabled?: boolean
}

export type CustomDropdownProps<T = string> = {
  /** List of dropdown options (objects or string values) */
  options: readonly (DropdownOption<T> | T)[] | (DropdownOption<T> | T)[]
  /** Selected value */
  value: T
  /** Selection handler */
  onChange: (value: T) => void
  /** Optional label element/text rendered next to or above trigger */
  label?: React.ReactNode
  /** Placeholder text when value is not selected */
  placeholder?: string
  /** Custom class for the trigger button */
  buttonClassName?: string
  /** Custom class for the popover dropdown menu */
  menuClassName?: string
  /** Custom class for individual option items */
  optionClassName?: string
  /** Custom class for outer container */
  className?: string
  /** Popover menu alignment relative to trigger button */
  align?: 'left' | 'right'
  /** Disabled state for the dropdown */
  disabled?: boolean
  /** Whether to render a checkmark icon next to active item (default: true) */
  showCheckmark?: boolean
}

function normalizeOption<T = string>(opt: DropdownOption<T> | T): DropdownOption<T> {
  if (typeof opt === 'object' && opt !== null && 'value' in opt) {
    return opt as DropdownOption<T>
  }
  return { value: opt as T, label: String(opt) }
}

export default function CustomDropdown<T = string>({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select option',
  buttonClassName,
  menuClassName,
  optionClassName,
  className,
  align = 'left',
  disabled = false,
  showCheckmark = true,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const normalizedOptions: DropdownOption<T>[] = options.map((opt) => normalizeOption<T>(opt))
  const selectedOption = normalizedOptions.find((opt) => opt.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={containerRef} className={clsx('relative inline-flex items-center gap-2', className)}>
      {label ? (
        typeof label === 'string' ? (
          <span className="text-[13px] font-bold text-muted">{label}</span>
        ) : (
          label
        )
      ) : null}

      <div className="relative inline-block text-left">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={clsx(
            'inline-flex h-[44px] min-w-[160px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/15 bg-paper px-4.5 text-[14px] font-bold text-ink shadow-[0_2px_8px_rgba(42,31,24,0.04)] transition-all duration-200 hover:border-customer hover:shadow-[0_4px_12px_rgba(42,31,24,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-customer/40 disabled:pointer-events-none disabled:opacity-50',
            isOpen && 'border-customer ring-2 ring-customer/30 shadow-md',
            buttonClassName,
          )}
        >
          <span className="inline-flex items-center gap-2 truncate">
            {selectedOption?.icon}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          <FiChevronDown
            className={clsx(
              'h-4 w-4 shrink-0 text-muted transition-transform duration-200',
              isOpen && 'rotate-180 text-customer',
            )}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className={clsx(
              'absolute z-50 mt-2 max-h-64 min-w-[200px] overflow-y-auto rounded-[18px] border border-ink/10 bg-white p-1.5 shadow-[0_12px_32px_rgba(42,31,24,0.12)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              align === 'right' ? 'right-0' : 'left-0',
              menuClassName,
            )}
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value
              return (
                <li key={String(opt.value)} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => {
                      onChange(opt.value)
                      setIsOpen(false)
                    }}
                    className={clsx(
                      'flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-[12px] px-3.5 py-2.5 text-left text-[13.5px] font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40',
                      isSelected
                        ? 'bg-customer-muted text-customer font-bold'
                        : 'text-ink/80 hover:bg-surface hover:text-ink',
                      optionClassName,
                    )}
                  >
                    <span className="inline-flex items-center gap-2 truncate">
                      {opt.icon}
                      <span className="truncate">{opt.label}</span>
                    </span>
                    {showCheckmark && isSelected ? (
                      <FiCheck className="h-4 w-4 shrink-0 text-customer" />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
