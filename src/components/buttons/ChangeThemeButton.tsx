'use client'

import { HalfMoon, SunLight } from 'iconoir-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ChangeThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-label="DarkModeToggle"
        type="button"
        disabled
      >
        <SunLight />
      </button>
    )
  }

  return (
    <button
      aria-label="DarkModeToggle"
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <HalfMoon /> : <SunLight />}
    </button>
  )
}
