'use client'

import { useEffect, useRef, useState } from 'react'
import StoreFront, { type StoreFrontCategory } from '@/shared/components/sections/StoreFront/StoreFront'
// Sample photos (no people). Swap for the design's originals when available.
import cover from '@/assets/images/how-it-works/f1-kitchen.jpg'
import kofta from '@/assets/images/how-it-works/f2-curry.jpg'
import dal from '@/assets/images/how-it-works/f3-dal.jpg'
import thali from '@/assets/images/home-v2/hero-thali.jpg'
import sabzi from '@/assets/images/home-v2/sabzi.jpg'

/**
 * Live store preview for "Your name on the door": the real store design
 * (StoreFront) with sample content — the kitchen name updates as people type.
 * Rendered at a fixed design width and scaled to fit.
 */
const W = 1180

const filler = (n: number, label: string) =>
  Array.from({ length: n }, (_, i) => ({ name: `${label} ${i + 1}`, description: '', price: 0 }))

const SAMPLE_MENU: StoreFrontCategory[] = [
  {
    name: "Today's Specials",
    dishes: [
      { name: 'Kofta Curry', description: 'Soft koftas simmered in a rich, home-style tomato gravy.', price: 160, image: kofta },
      { name: 'Dal Tadka', description: 'Yellow dal tempered with ghee, jeera and garlic.', price: 120, image: dal },
      { name: 'Home Thali', description: 'Dal, seasonal sabzi, rotis, achaar and salad.', price: 199, image: thali },
      { name: 'Aloo Matar Sabzi', description: 'Potatoes and peas cooked home-style, served with rotis.', price: 140, image: sabzi },
    ],
  },
  { name: 'Main Course', dishes: filler(6, 'Main') },
  { name: 'Rice & Breads', dishes: filler(4, 'Rice') },
  { name: 'Beverages', dishes: filler(2, 'Drink') },
]

export default function StorePreview({ kitchenName }: { kitchenName: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.45)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const box = boxRef.current
    const inner = innerRef.current
    if (!box || !inner) return
    const update = () => {
      const s = box.clientWidth / W
      setScale(s)
      setHeight(inner.offsetHeight * s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(box)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden bg-[#FBF6F0]" style={{ height: height || undefined }} aria-hidden>
      <div ref={innerRef} className="absolute left-0 top-0 origin-top-left p-8" style={{ width: W, transform: `scale(${scale})` }}>
        <StoreFront
          mode="preview"
          name={kitchenName}
          nameCaret
          cuisine="Home-style North Indian"
          avatar={null}
          cover={cover}
          rating={null}
          city="Mohali"
          deliveryLabel="Home delivery"
          preorderLabel="Freshly cooked to order"
          categories={SAMPLE_MENU}
        />
      </div>
    </div>
  )
}
