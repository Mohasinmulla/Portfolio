"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
]

const sectionIds = navItems.map((item) => item.id)

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [hidden, setHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScroll = currentScroll

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(id)
        }
      }

      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      setScrollProgress((window.scrollY / totalHeight) * 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -90, duration: 1.2 })
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-green-400 z-50"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Main navigation"
        className="fixed top-0 left-0 w-full z-40
                   flex justify-between items-center
                   px-10 py-6
                   bg-black/40 backdrop-blur-xl
                   border-b border-green-500/20"
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          aria-label="Scroll to top"
          className="text-xl font-bold text-green-400 tracking-wider"
        >
          MM
        </button>

        {/* Links */}
        <div className="flex space-x-8 text-sm tracking-wide" role="list">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <div key={item.id} className="relative" role="listitem">
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`transition duration-300 hover:text-green-400
                    ${isActive ? "text-green-400" : "text-gray-300"}`}
                >
                  {item.name}
                </button>

                {/*
                  KEY: All indicators share the same layoutId="nav-underline".
                  When `active` changes, Framer Motion sees the indicator
                  disappear from one item and appear on another, then
                  automatically animates it sliding between the two positions.
                  No manual position tracking needed.
                */}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-2 h-[2px] w-full bg-green-400 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}