'use client'

import { useCallback, useMemo, useState } from 'react'
import type { ChefStore } from '../models'
import { dummyChefsStores } from '@/app/home/data/featured-kitchens'

type UseChefsStoresResult = {
  stores: ChefStore[]
  categories: string[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

import { useEffect } from 'react'
import { fetchChefsStores } from '../services'

export function useChefsStores(initialStores: ChefStore[] = []): UseChefsStoresResult {
  const [stores, setStores] = useState<ChefStore[]>(initialStores)
  const [loading, setLoading] = useState(initialStores.length === 0)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await fetchChefsStores()
      setStores(data)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load stores'
      setError(message)
      if (stores.length === 0) {
        setStores(dummyChefsStores)
      }
    } finally {
      setLoading(false)
    }
  }, [stores.length])

  useEffect(() => {
    void load()
  }, [load])

  const categories = useMemo(() => {
    const unique = new Set<string>()
    for (const s of stores) {
      for (const c of s.categories) {
        unique.add(c)
      }
    }
    return ['All', ...Array.from(unique).sort((a, b) => a.localeCompare(b))]
  }, [stores])

  return { stores, categories, loading, error, refetch: load }
}
