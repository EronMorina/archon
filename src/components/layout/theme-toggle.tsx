'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDictionary } from './locale-provider'

/**
 * Theme toggle. Renders a fixed-size placeholder until mounted so the
 * navbar never shifts (avoids a CLS hit) and the icon never flashes wrong.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useDictionary().theme
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? (isDark ? t.toLight : t.toDark) : t.toggle}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative text-muted-foreground hover:text-foreground"
    >
      {mounted && (
        <>
          <Sun
            className={`absolute size-[18px] transition-all duration-500 ease-arc ${
              isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Moon
            className={`absolute size-[18px] transition-all duration-500 ease-arc ${
              isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </>
      )}
    </Button>
  )
}
