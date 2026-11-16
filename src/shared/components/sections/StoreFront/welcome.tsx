'use client'

import Image, { type StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import { LuChefHat, LuLeaf, LuMapPin } from 'react-icons/lu'
import { MdVerified } from 'react-icons/md'

/**
 * Welcome card for a cook's store — kitchen-app colours (olive green + cream,
 * red accent). Used by the example store on both store versions.
 */
export function StoreWelcome({
  cookName,
  avatar,
  city,
}: {
  cookName: string
  avatar?: string | StaticImageData | null
  city: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-6 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#7B9A45] via-[#6f8a3e] to-[#55702c] px-5 py-4 text-white shadow-[0_18px_40px_-26px_rgba(85,112,44,0.9)] sm:px-7 sm:py-5"
    >
      {/* soft cream glow + leaf motif */}
      <span aria-hidden className="absolute -left-10 -top-16 h-44 w-44 rounded-full bg-[#FFF6E6]/15 blur-2xl" />
      <LuLeaf aria-hidden className="absolute -right-4 -bottom-6 h-32 w-32 rotate-12 text-white/10" strokeWidth={1.2} />

      <div className="relative flex items-center gap-4 sm:gap-5">
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF6E6] ring-4 ring-white/25 sm:h-16 sm:w-16">
          {avatar ? (
            <Image src={avatar} alt="" fill sizes="64px" className="object-cover" unoptimized={typeof avatar === 'string'} />
          ) : (
            <LuChefHat className="h-7 w-7 text-[#55702c]" aria-hidden />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#FFE9B8]">Namaste!</p>
          <p className="font-hand text-[24px] leading-[1.3] sm:text-[32px]">{cookName}&apos;s store welcomes you</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white/85 sm:text-[14px]">
            <span>Freshly cooked in her home kitchen, for every order</span>
            <span className="inline-flex items-center gap-1">
              <LuMapPin className="h-3.5 w-3.5" aria-hidden /> {city}
            </span>
          </p>
        </div>

        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#55702c] shadow-sm md:inline-flex">
          <MdVerified className="h-4 w-4 text-verified" aria-hidden /> Verified home kitchen
        </span>
      </div>
    </motion.div>
  )
}
