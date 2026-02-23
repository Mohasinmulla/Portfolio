"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Github, Linkedin, MapPin, Send, CheckCircle, XCircle, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

type Status = "idle" | "loading" | "sent" | "error"

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "loading") return

    const form = e.currentTarget
    const data = new FormData(form)

    const name    = (data.get("from_name")  as string)?.trim()
    const email   = (data.get("from_email") as string)?.trim()
    const message = (data.get("message")    as string)?.trim()

    // Validation
    if (!name || !email || !message) {
      setStatus("error")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      return
    }

    setStatus("loading")

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setStatus("sent")
      form.reset()
      setTimeout(() => setStatus("idle"), 6000)

    } catch (err) {
      console.error("EmailJS error:", err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const isLoading = status === "loading"

  return (
    <section
      id="contact"
      className="h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl w-full h-full flex flex-col justify-between py-8">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-green-400"
        >
          Get In Touch
        </motion.h2>

        {/* MAIN GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-25 bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-green-400/20 min-h-[70vh]"
        >

          {/* LEFT - FORM */}
          <div>
            <p className="text-gray-300 mb-4 text-sm">
              Got a question? I&apos;m just a message away.
            </p>

            {/*
              Field names must match EmailJS template variables exactly:
              from_name  → {{from_name}}
              from_email → {{from_email}}
              message    → {{message}}
            */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>

              <div>
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  name="from_name"
                  type="text"
                  placeholder="Your Name"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30
                             focus:outline-none focus:border-green-400 text-white text-sm
                             disabled:opacity-50 disabled:cursor-not-allowed transition"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                <input
                  id="contact-email"
                  name="from_email"
                  type="email"
                  placeholder="Your Email"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30
                             focus:outline-none focus:border-green-400 text-white text-sm
                             disabled:opacity-50 disabled:cursor-not-allowed transition"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30
                             focus:outline-none focus:border-green-400 text-white text-sm
                             disabled:opacity-50 disabled:cursor-not-allowed transition"
                />
              </div>

              {/* Submit button — reflects current state */}
              <button
                type="submit"
                disabled={isLoading || status === "sent"}
                className="w-full flex items-center justify-center gap-2
                           bg-green-400 hover:bg-green-500 transition text-black
                           font-semibold py-2 rounded-lg text-sm
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "idle"    && <><Send size={15} /> SEND MESSAGE</>}
                {status === "loading" && <><Loader2 size={15} className="animate-spin" /> Sending...</>}
                {status === "sent"    && <><CheckCircle size={15} /> Message Sent!</>}
                {status === "error"   && <><XCircle size={15} /> Try Again</>}
              </button>

              {/* Status feedback */}
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-center justify-center gap-2 text-green-400 text-sm text-center"
                >
                  <CheckCircle size={15} />
                  Thanks! I&apos;ll get back to you soon.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-center justify-center gap-2 text-red-400 text-sm text-center"
                >
                  <XCircle size={15} />
                  Please fill all fields with a valid email.
                </motion.p>
              )}
            </form>
          </div>

          {/* RIGHT - CONTACT INFO */}
          <div className="flex flex-col justify-center space-y-6 text-gray-300 text-sm">

            <address className="not-italic space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-green-400 shrink-0" size={18} aria-hidden="true" />
                <span>Sangli, Maharashtra, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-green-400 shrink-0" size={18} aria-hidden="true" />
                <a href="tel:+917385093488" className="hover:text-green-400 transition">
                  +91 7385093488
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-green-400 shrink-0" size={18} aria-hidden="true" />
                <a
                  href="mailto:mohasinmulla861@gmail.com"
                  className="hover:text-green-400 transition"
                >
                  mohasinmulla861@gmail.com
                </a>
              </div>
            </address>

            <div className="flex gap-6 pt-2">
              <a
                href="https://github.com/Mohasinmulla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <Github size={25} aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohasin861"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={25} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Mohasin Mulla. All rights reserved.
        </div>

      </div>
    </section>
  )
}