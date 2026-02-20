import "./globals.css"
import MatrixBackground from "@/components/MatrixBackground"
import Navbar from "@/components/Navbar"
import SmoothScroll from "@/components/SmoothScroll"
import { JetBrains_Mono, Orbitron } from "next/font/google"



const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-heading",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
})

export const metadata = {
  title: "Mohasin Mulla | IoT & Robotics Engineer",
  description:
    "Portfolio of Mohasin Mulla – IoT Developer, Robotics Engineer, and Embedded Systems enthusiast building intelligent hardware-software systems.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${jetbrains.variable} bg-black text-white overflow-x-hidden font-sans`}
      >
        <SmoothScroll>
          <MatrixBackground />
          <Navbar />

          <div className="relative z-10 min-h-screen pt-24">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
