function getApiBaseUrl(): string {
  const envUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').trim().replace(/\/+$/, '')
  return envUrl || 'http://localhost:55717'
}

export type RequestOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined | null>
}

const withQueryParams = (url: string, query?: RequestOptions['query']) => {
  if (!query) return url

  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()
  return queryString ? `${url}?${queryString}` : url
}

export const apiRequest = async <T>(
  endpoint: string,
  { query, headers, ...options }: RequestOptions = {},
): Promise<T> => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const baseUrl = getApiBaseUrl()
  const url = withQueryParams(`${baseUrl}${normalizedEndpoint}`, query)
  const method = (options.method ?? 'GET').toString().toUpperCase()
  const jsonBody = method !== 'GET' && method !== 'HEAD'

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(jsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
