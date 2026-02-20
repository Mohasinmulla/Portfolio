"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react"

export default function Contact() {
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
              Got a question? I’m just a message away.
            </p>

            <form className="space-y-4">

              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30 focus:outline-none focus:border-green-400 text-white text-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30 focus:outline-none focus:border-green-400 text-white text-sm"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-green-400/30 focus:outline-none focus:border-green-400 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 transition text-black font-semibold py-2 rounded-lg text-sm"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* RIGHT - CONTACT INFO */}
          <div className="flex flex-col justify-center space-y-6 text-gray-300 text-sm">

            <div className="flex items-center gap-3">
              <MapPin className="text-green-400" size={18} />
              <span>Sangli, Maharashtra, India</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-green-400" size={18} />
              <a href="tel:+917385093488" className="hover:text-green-400">
                +91 7385093488
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-green-400" size={18} />
              <a
                href="mailto:mohasinmulla861@gmail.com"
                className="hover:text-green-400"
              >
                mohasinmulla861@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-2">
              <a
                href="https://github.com/Mohasinmulla"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <Github size={25} />
              </a>

              <a
                href="https://www.linkedin.com/in/mohasin861"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={25} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Mohasin Mulla. All rights reserved.
        </div>

      </div>
    </section>
  )
}
