'use client'

import { useCallback, useState } from 'react'
import StoreHeroSection from './sections/StoreHero'
import StoresSection from './sections/Stores'
import type { KitchenFiltersState } from './sections/KitchenFilters'
import type { ChefStore } from '@/features'

const defaultFilters: KitchenFiltersState = {
  cuisine: 'All cuisines',
  diet: 'all',
}

export default function KitchensPageClient({ initialStores = [] }: { initialStores?: ChefStore[] }) {
  const [filters, setFilters] = useState<KitchenFiltersState>(defaultFilters)
  const [resultCount, setResultCount] = useState(initialStores.length)

  const handleFilteredCountChange = useCallback((count: number) => {
    setResultCount(count)
  }, [])

  return (
    <>
      <StoreHeroSection />
      <StoresSection
        initialStores={initialStores}
        filters={filters}
        onFiltersChange={setFilters}
        onFilteredCountChange={handleFilteredCountChange}
      />
    </>
  )
}
