'use client'

import { useEffect, useRef, useState } from 'react'
import StoreClassic from '@/shared/components/sections/StoreFront/StoreClassic'
import { demoPreviewMenu, demoStoreDetail } from '@/app/kitchens/demo-store'

/**
 * Main Home "Your name on the door" preview — classic store card inside a
 * browser frame. Same content as the Ananya's Kitchen example page it opens
 * (cover, description, dishes); the kitchen name + URL update as you type.
 */
const W = 855
const H = 680

export function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/['’]/g, '')
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32) || 'your-kitchen'
  )
}

export default function ClassicPreview({ kitchenName }: { kitchenName: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden" style={{ height: H * scale }} aria-hidden>
      <div className="absolute left-0 top-0 origin-top-left font-jakarta text-ink" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* Browser bar */}
        <div className="flex h-[44px] items-center gap-3 bg-[#E8E2D8] px-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EE5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#F4BE4F]" />
            <span className="h-3 w-3 rounded-full bg-[#7FA84A]" />
          </span>
          <span className="ml-2 text-[18px] text-ink/40">‹ &nbsp;›</span>
          <span className="mx-auto flex h-[28px] w-[360px] items-center justify-center gap-1.5 truncate rounded-full bg-white px-4 text-[15px] text-ink/80">
            <span className="text-[11px]">🔒</span>
            motherbhojan.com/kitchens/{slugify(kitchenName)}
          </span>
          <span className="w-[60px]" />
        </div>
        <StoreClassic
          mode="preview"
          name={kitchenName}
          nameCaret
          byLine={`By ${demoStoreDetail.storeOwnerName}`}
          description={demoStoreDetail.description}
          avatar={null}
          cover={demoStoreDetail.coverImageUrl}
          rating={null}
          city="Mohali"
          categories={demoPreviewMenu}
        />
      </div>
    </div>
  )
}
