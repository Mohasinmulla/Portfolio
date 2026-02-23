"use client"

type Skill = {
  name: string
  icon: string
}

const skillsRow1: Skill[] = [
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "ESP32", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "ROS2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
]

const skillsRow2: Skill[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  // Fixed: tailwindcss-plain no longer exists in devicons — updated to correct URL
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
]

export default function Skills() {
  return (
    <section id="skills" className="relative pt-12 pb-24 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-10">
        Skills &amp; Technologies
      </h2>

      <div className="relative bg-white/5 backdrop-blur-xl border-y border-green-400/20 py-10 space-y-12 overflow-hidden">
        {/* Fade Edges */}
        <div
          className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/*
          CSS-based marquee — no hardcoded pixel values, adapts to any content width.
          Uses @keyframes defined inline via style tag to avoid needing framer-motion here.
        */}
        <style>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          .marquee-left  { animation: marquee-left  30s linear infinite; }
          .marquee-right { animation: marquee-right 30s linear infinite; }
        `}</style>

        <Marquee skills={skillsRow1} direction="left" />
        <Marquee skills={skillsRow2} direction="right" />
      </div>
    </section>
  )
}

function Marquee({
  skills,
  direction,
}: {
  skills: Skill[]
  direction: "left" | "right"
}) {
  // Duplicate for seamless loop
  const duplicated = [...skills, ...skills]

  return (
    <div className="overflow-hidden" aria-hidden="true">
      {/* w-max ensures the flex row doesn't wrap; animation slides exactly 50% (one copy) */}
      <div className={`flex gap-16 w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {duplicated.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col items-center min-w-[140px] group">
      <div
        className="bg-black/40 p-6 rounded-2xl
                   border border-green-400/20
                   group-hover:border-green-400
                   group-hover:shadow-[0_0_25px_rgba(34,197,94,0.7)]
                   transition duration-300"
      >
        <img
          src={skill.icon}
          alt={skill.name}
          width={36}
          height={36}
          className="w-9 h-9 object-contain"
          draggable={false}
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-gray-300 text-sm group-hover:text-green-400 transition">
        {skill.name}
      </p>
    </div>
  )
}
