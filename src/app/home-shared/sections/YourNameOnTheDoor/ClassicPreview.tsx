'use client'

import { useEffect, useRef, useState } from 'react'
import StoreClassic from '@/shared/components/sections/StoreFront/StoreClassic'
import type { StoreFrontCategory } from '@/shared/components/sections/StoreFront/StoreFront'
import cover from '@/assets/images/store-preview/cover.jpg'
import samosa from '@/assets/images/store-preview/samosa.jpg'
import pakora from '@/assets/images/store-preview/pakora.jpg'
import curry from '@/assets/images/store-preview/curry.jpg'
import dalRice from '@/assets/images/store-preview/dal-rice.jpg'
import riceCurry from '@/assets/images/store-preview/rice-curry.jpg'
import bhature from '@/assets/images/store-preview/bhature.jpg'

/**
 * Main Home "Your name on the door" preview — classic store card (profile left,
 * menu right) inside a browser frame; the kitchen name + URL update as you type.
 * Sample content only; no person photo, no made-up rating, no Pickup.
 */
const W = 855
const H = 680

const MENU: StoreFrontCategory[] = [
  {
    name: 'Starters',
    dishes: [
      { name: 'Aloo samosa', price: 80, description: 'Crispy pastry filled with spiced potato and peas.', image: samosa },
      { name: 'Mixed pakora', price: 120, description: 'Assorted vegetable fritters.', image: pakora },
    ],
  },
  {
    name: 'Thalis',
    dishes: [
      { name: 'Paneer butter masala', price: 220, description: 'Soft paneer in a rich tomato gravy.', image: curry },
      { name: 'Dal makhani thali', price: 180, description: 'Slow-cooked black dal with rice.', image: dalRice },
    ],
  },
  {
    name: 'Curries',
    dishes: [
      { name: 'Rajma chawal', price: 150, description: 'Home-style rajma with steamed rice.', image: riceCurry },
      { name: 'Chole bhature', price: 160, description: 'Spiced chickpeas served with bhature.', image: bhature },
    ],
  },
]

function slugify(name: string) {
  return (
    name
      .toLowerCase()
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
          byLine="By you"
          description="Home-cooked North Indian meals made fresh to order — the kind of food you would wait for at home."
          avatar={null}
          cover={cover}
          rating={null}
          city="Mohali"
          categories={MENU}
        />
      </div>
    </div>
  )
}
