'use client'

import { ThemeProvider } from './ThemeProvider'
import { AppDownloadProvider } from './AppDownloadProvider'

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <AppDownloadProvider>{children}</AppDownloadProvider>
    </ThemeProvider>
  )
}
