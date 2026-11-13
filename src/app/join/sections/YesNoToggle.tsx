'use client'

type YesNoValue = 'yes' | 'no' | null

type YesNoToggleProps = {
  value: YesNoValue
  onChange: (value: 'yes' | 'no') => void
}

const YesNoToggle = ({ value, onChange }: YesNoToggleProps) => (
  <div className="flex shrink-0 overflow-hidden rounded-full border border-ink/15">
    {(['yes', 'no'] as const).map((opt) => (
      <button
        key={opt}
        type="button"
        aria-pressed={value === opt}
        onClick={() => onChange(opt)}
        className={`px-4 py-2 text-[13px] font-bold capitalize transition-colors ${
          value === opt
            ? opt === 'yes'
              ? 'bg-verified text-white'
              : 'bg-customer text-white'
            : 'bg-white text-muted hover:bg-surface'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
)

export default YesNoToggle
