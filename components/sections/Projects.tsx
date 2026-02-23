"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github } from "lucide-react"

const projects = [
  {
    title: "Smart Agriculture System",
    description:
      "IoT-based smart irrigation system using ESP32, soil sensors, and cloud dashboard monitoring.",
    tech: ["ESP32", "MQTT", "Firebase", "Sensors"],
    image: "/agriculture.jpg",
    github: "https://github.com/Mohasinmulla/agriculture-project",
  },
  {
    title: "Autonomous Robot",
    description:
      "Obstacle-avoiding robot using ultrasonic sensors and real-time motor control algorithms.",
    tech: ["Arduino", "Ultrasonic", "C++", "Robotics"],
    image: "/robot.jpg",
    github: "https://github.com/Mohasinmulla/robot-project",
  },
  {
    title: "Industrial Monitoring Dashboard",
    description:
      "Real-time monitoring system for industrial machines with live data visualization.",
    tech: ["Next.js", "Node.js", "IoT", "Charts"],
    image: "/dashboard.jpg",
    github: "https://github.com/Mohasinmulla/dashboard-project",
  },
  {
    title: "ROS2 Delivery Bot",
    description:
      "Autonomous indoor delivery robot built using ROS2 navigation stack.",
    tech: ["ROS2", "Lidar", "SLAM", "Navigation"],
    image: "/ros2.jpg",
    github: "https://github.com/Mohasinmulla/ros2-project",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="pt-24 pb-24">
      {/*
        APPROACH: Title card is z-index 0 (bottom of stack).
        Each project card has increasing z-index and stacks ON TOP of the title card.
        The title card stays perfectly still — project cards slide up and cover it.
        When the section ends, everything scrolls away together naturally.
      */}
      <div
        className="relative"
        // +1 for the title card screen
        style={{ height: `${(projects.length + 1) * 100}vh` }}
      >

        {/* ===== TITLE CARD — z-index 0, sits at the bottom of the stack ===== */}
        <div
          className="sticky top-24 flex justify-center px-6"
          style={{ zIndex: 0 }}
        >
          <div className="w-full max-w-6xl mt-8">
            <div className="
              relative rounded-3xl
              bg-white/5 backdrop-blur-xl
              border border-green-500/20
              shadow-[0_0_40px_rgba(34,197,94,0.15)]
              p-10 md:p-16
              flex items-center justify-center
              min-h-[60vh]
            ">
              {/* Decorative background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5 pointer-events-none rounded-3xl"
                aria-hidden="true"
              />

              <div className="text-center space-y-4 relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl md:text-6xl font-bold text-green-400"
                >
                  My Work
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-gray-400 text-lg"
                >
                  Scroll to explore projects ↓
                </motion.p>
              </div>

              {/* Bottom Glow Line */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-sm"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ===== PROJECT CARDS — stack on top of the title card ===== */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="sticky top-24 flex justify-center px-6"
            // z-index starts at 1, each card covers the one below
            style={{ zIndex: index + 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full max-w-6xl mt-8"
            >
              <div
                className="
                  relative rounded-3xl
                  bg-white/5 backdrop-blur-xl
                  border border-green-500/20
                  shadow-[0_0_40px_rgba(34,197,94,0.15)]
                  p-10 md:p-10
                  transition-all duration-500
                  hover:shadow-[0_0_70px_rgba(34,197,94,0.35)]
                  hover:-translate-y-4
                "
              >
                <div
                  className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5 pointer-events-none rounded-3xl"
                  aria-hidden="true"
                />

                <div className="relative grid md:grid-cols-2 gap-12 items-center">
                  {/* LEFT */}
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-green-400">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-full text-green-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-green-400/20 p-8 shadow-inner">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-semibold text-green-400">
                        Project Preview
                      </h4>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title} on GitHub`}
                        className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                      >
                        <Github size={20} />
                        <span className="text-sm font-medium">View Code</span>
                      </a>
                    </div>

                    <div className="flex justify-center items-center">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={500}
                        height={300}
                        className="rounded-xl border border-green-400/20 shadow-lg hover:scale-105 transition duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-sm"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}