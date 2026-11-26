'use client'

import { useState } from 'react'
import StoreHeroSection from './sections/StoreHero'
import StoresSection from './sections/Stores'
import { DEFAULT_KITCHEN_FILTERS, type KitchenFiltersState } from './sections/KitchenFilters'
import type { ChefStore } from '@/features'

export default function KitchensPageClient({ initialStores = [] }: { initialStores?: ChefStore[] }) {
  const [filters, setFilters] = useState<KitchenFiltersState>(DEFAULT_KITCHEN_FILTERS)

  return (
    <>
      <StoreHeroSection />
      <StoresSection initialStores={initialStores} filters={filters} onFiltersChange={setFilters} />
    </>
  )
}
