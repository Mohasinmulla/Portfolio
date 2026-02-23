"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Proper type extension instead of (window as any)
declare global {
  interface Window {
    lenis: Lenis | null
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    window.lenis = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Proper cleanup — cancels RAF and destroys lenis instance
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}
