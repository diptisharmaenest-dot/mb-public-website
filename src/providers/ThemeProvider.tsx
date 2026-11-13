'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const applyTheme = (next: Theme) => {
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  useEffect(() => {
    // For now: always light on load (marketing site). Dark tokens + toggle stay for later.
    // To re-enable: restore stored preference and/or prefers-color-scheme below.
    setTheme('light')
    applyTheme('light')

    // const stored = localStorage.getItem('theme') as Theme | null
    // if (stored === 'light' || stored === 'dark') {
    //   setTheme(stored)
    //   applyTheme(stored)
    //   return
    // }
    // const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // const systemTheme = systemDark ? 'dark' : 'light'
    // setTheme(systemTheme)
    // applyTheme(systemTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
