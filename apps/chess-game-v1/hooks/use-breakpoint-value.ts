"use client"

import { useEffect, useState } from "react"

// Tailwind default breakpoints
const breakpoints = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

type BreakpointMap<T> = Partial<Record<keyof typeof breakpoints, T>>

export function useBreakpointValue<T>(values: BreakpointMap<T>): T | undefined {
  const [value, setValue] = useState<T | undefined>(undefined)

  useEffect(() => {
    const mql = Object.entries(breakpoints).map(([key, minWidth]) => ({
      key,
      query: window.matchMedia(`(min-width: ${minWidth}px)`),
    }))

    const update = () => {
      const active = [...mql]
        .reverse()
        .find(({ key, query }) => query.matches && values[key as keyof typeof values] !== undefined)

      if (active) {
        setValue(values[active.key as keyof typeof values])
      } else {
        setValue(values.base)
      }
    }

    update()
    mql.forEach(({ query }) => query.addEventListener("change", update))
    return () => mql.forEach(({ query }) => query.removeEventListener("change", update))
  }, [values])

  return value
}
