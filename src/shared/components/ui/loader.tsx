import clsx from 'clsx'
import Image from 'next/image'
import { mLogo } from '@/assets'

type LoaderProps = {
  /** Screen reader + visible caption */
  label?: string
  className?: string
}

export default function Loader({ label = 'Loading…', className }: LoaderProps) {
  return (
    <div
      className={clsx(
        'animate-mb-loader-root flex flex-col items-center justify-center gap-3 py-16 motion-reduce:animate-none',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy
    >
      <div
        className="relative flex h-[76px] w-[76px] items-center justify-center motion-reduce:animate-none"
        aria-hidden
      >
        <span className="animate-mb-loader-orbit absolute inset-0 rounded-full border border-dashed border-verified/35 motion-reduce:hidden" />
        <span className="animate-mb-loader-orbit-reverse absolute inset-[5px] rounded-full border border-verified/22 motion-reduce:hidden" />
        <span className="animate-mb-loader-glow absolute inset-[10px] rounded-full bg-verified/15 blur-lg motion-reduce:hidden" />
        <span className="animate-mb-loader-shine absolute inset-[18px] rounded-full bg-gradient-to-br from-white/25 via-transparent to-verified/20 opacity-70 motion-reduce:hidden" />
        <Image
          src={mLogo}
          alt=""
          width={56}
          height={56}
          className="relative z-[1] animate-mb-loader-mark h-14 w-14 object-contain motion-reduce:animate-none"
        />
      </div>
      {label ? (
        <p className="body-copy-muted animate-mb-loader-label text-center text-ink/60">{label}</p>
      ) : null}
      <div className="flex gap-1.5 motion-reduce:hidden" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-mb-loader-dot h-1.5 w-1.5 rounded-full bg-verified/65"
            style={{ animationDelay: `${i * 0.14}s` }}
          />
        ))}
      </div>
    </div>
  )
}
