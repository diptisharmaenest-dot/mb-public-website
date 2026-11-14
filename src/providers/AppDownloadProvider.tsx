'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppDownloadModal } from '@/components/sections/AppDownload'
import { APP_DOWNLOAD, detectPlatform, type AppPlatform } from '@/shared/data/app-download'

type RelatedApp = { platform: string; id?: string }
type NavigatorWithRelatedApps = Navigator & {
  getInstalledRelatedApps?: () => Promise<RelatedApp[]>
}

type AppDownloadContextValue = {
  platform: AppPlatform
  /** True only when the browser confirms the app is installed (Android Chrome). */
  appInstalled: boolean
  openDownload: (source: string) => void
}

const AppDownloadContext = createContext<AppDownloadContextValue | null>(null)

export function useAppDownload(): AppDownloadContextValue {
  const ctx = useContext(AppDownloadContext)
  if (!ctx) throw new Error('useAppDownload must be used inside AppDownloadProvider')
  return ctx
}

export function AppDownloadProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<AppPlatform>('desktop')
  const [appInstalled, setAppInstalled] = useState(false)
  const [source, setSource] = useState<string | null>(null)

  useEffect(() => {
    const detected = detectPlatform(navigator.userAgent)
    setPlatform(detected)

    // Android Chrome can confirm an installed app when the site and app are linked
    // (manifest related_applications + assetlinks.json). Other browsers: unknown → false.
    const nav = navigator as NavigatorWithRelatedApps
    if (detected !== 'android' || !APP_DOWNLOAD.androidPackage || !nav.getInstalledRelatedApps) return
    nav
      .getInstalledRelatedApps()
      .then((apps) =>
        setAppInstalled(apps.some((a) => a.platform === 'play' && a.id === APP_DOWNLOAD.androidPackage)),
      )
      .catch(() => setAppInstalled(false))
  }, [])

  const openDownload = useCallback((from: string) => setSource(from), [])
  const close = useCallback(() => setSource(null), [])

  const value = useMemo(() => ({ platform, appInstalled, openDownload }), [platform, appInstalled, openDownload])

  return (
    <AppDownloadContext.Provider value={value}>
      {children}
      <AppDownloadModal open={source !== null} source={source ?? ''} platform={platform} onClose={close} />
    </AppDownloadContext.Provider>
  )
}
