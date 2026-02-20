"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [hidden, setHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const sections = ["home", "about", "skills", "projects", "contact"]

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY

      // Hide on scroll down
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScroll = currentScroll

      // Active section detection
      for (let section of sections) {
        const el = document.getElementById(section)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(section)
        }
      }

      // Scroll progress
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)

    if (target && (window as any).lenis) {
      ;(window as any).lenis.scrollTo(target, {
        offset: -90,
        duration: 1.2,
      })
    }
  }

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-green-400 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-40
                   flex justify-between items-center
                   px-10 py-6
                   bg-black/40 backdrop-blur-xl
                   border-b border-green-500/20"
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold text-green-400 tracking-wider"
        >
          MM
        </button>

        {/* Links */}
        <div className="flex space-x-8 text-sm tracking-wide relative">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`transition duration-300 hover:text-green-400
                  ${active === item.id ? "text-green-400" : "text-gray-300"}`}
              >
                {item.name}
              </button>

              {/* Animated Underline */}
              <div
  className={`absolute left-0 -bottom-2 h-[2px] w-full bg-green-400 rounded-full
    transition-all duration-300
    ${active === item.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
  origin-left`}
/>

            </div>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
