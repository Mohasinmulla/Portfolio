"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Cpu, Wifi, Biohazard, Microchip } from "lucide-react"

// TextScramble extracted to module scope — cleaner, no re-creation on render
class TextScramble {
  el: HTMLElement
  chars: string
  queue: { from: string; to: string; start: number; end: number; char?: string }[]
  frameRequest: number
  frame: number
  resolve: ((value: void) => void) | null

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{|}—=+*^?#ナニヌ"
    this.queue = []
    this.frameRequest = 0
    this.frame = 0
    this.resolve = null
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => (this.resolve = resolve))
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 30)
      const end = start + Math.floor(Math.random() * 40) + 20
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0; i < this.queue.length; i++) {
      const { to, start, end } = this.queue[i]
      let { from, char } = this.queue[i]

      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.35) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output

    if (complete === this.queue.length) {
      this.resolve?.()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame += 0.7
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest)
  }
}

const phrases = ["IoT Developer", "Robotics Engineer", "Embedded Systems Developer"]

export default function Hero() {
  const textRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const fx = new TextScramble(el)
    let counter = 0
    let destroyed = false
    let timeoutId: ReturnType<typeof setTimeout>

    const next = () => {
      if (destroyed) return
      fx.setText(phrases[counter]).then(() => {
        timeoutId = setTimeout(next, 2200)
      })
      counter = (counter + 1) % phrases.length
    }

    next()

    // Proper cleanup — stops animation and pending timeouts on unmount
    return () => {
      destroyed = true
      clearTimeout(timeoutId)
      fx.destroy()
    }
  }, [])

  return (
    <>
      {/* Floating Icons */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-green-500/20 blur-[1px] drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]"
        >
          <Biohazard size={85} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-24 right-24 text-green-400/20 blur-[1px] drop-shadow-[0_0_30px_rgba(16,185,129,0.7)]"
        >
          <Microchip size={105} />
        </motion.div>

        <motion.div
          animate={{ x: [0, 25, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute top-40 right-40 text-emerald-400/20 blur-[1px] drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]"
        >
          <Wifi size={75} />
        </motion.div>

        <motion.div
          animate={{ x: [0, -30, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-32 left-32 text-green-300/20 blur-[1px] drop-shadow-[0_0_35px_rgba(134,239,172,0.7)]"
        >
          <Cpu size={95} />
        </motion.div>
      </div>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="rounded-3xl w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex items-center bg-white/[0.015] border border-green-400/20 rounded-3xl p-16 w-full backdrop-blur-[5px]"
          >
            {/* IMAGE */}
            <div className="w-1/3 flex justify-start">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full bg-green-500 blur-2xl opacity-40 animate-pulse"
                  aria-hidden="true"
                />
                <Image
                  src="/Mohasin.png"
                  alt="Mohasin Mulla, IoT and Robotics Engineer"
                  width={280}
                  height={280}
                  priority
                  className="rounded-full border-4 border-green-400 object-cover relative z-10"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-2/3 pl-12 flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm tracking-[0.3em] uppercase text-green-400/60 font-light mb-2"
              >
                Hi, I am
              </motion.p>

              <h1 className="text-green-400 text-5xl font-bold cyber-glow cyber-name mb-4">
                Mohasin Mulla
              </h1>

              <p className="text-xl text-green-300 tracking-wide">
                I&apos;m a{" "}
                <span
                  ref={textRef}
                  className="cyber-role"
                  aria-label="IoT Developer, Robotics Engineer, and Embedded Systems Developer"
                />
              </p>

              <p className="text-sm text-gray-500 max-w-md mt-4">
                Building intelligent systems with hardware + software integration.
              </p>

              <div className="mt-20 flex gap-6">
                <a
                  href="/Mohasin_emb.pdf"
                  download="Mohasin_Mulla_Resume.pdf"
                  className="px-8 py-3 rounded-xl border border-green-400 text-green-300 hover:bg-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition duration-300"
                >
                  Download Resume
                </a>

                <a
                  href="#projects"
                  className="px-8 py-3 bg-green-500/20 border border-green-400 rounded-xl text-green-300 hover:bg-green-500/40 transition duration-300"
                >
                  View Projects →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
