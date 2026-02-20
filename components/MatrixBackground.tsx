"use client"

import { useEffect, useRef } from "react"

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const fontSize = 16
    const letters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    let columns = 0
    let drops: number[] = []
    let animationFrameId: number
    let frameCount = 0 // Added to control frame rate

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      frameCount++
      if (frameCount % 3 !== 0) { // Only draw every 3rd frame to slow down the animation
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      if (!ctx) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.06)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)


      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text =
          letters[Math.floor(Math.random() * letters.length)]

        const opacity = Math.random() * 0.5 + 0.5 // Increased base opacity for brighter effect
        ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 8

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0
        }

        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}