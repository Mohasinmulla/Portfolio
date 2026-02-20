export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      

      {/* Glass Container */}
      <div className="relative w-full max-w-6xl rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-green-500/20 
                      shadow-[0_0_40px_rgba(34,197,94,0.15)]
                      p-10 md:p-16">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-400">
            About Me
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            IoT Developer • Robotics Engineer • Embedded Systems Enthusiast
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left - Description */}
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              I'm <span className="text-green-400 font-semibold">Mohasin Mulla</span>, 
              an IoT and Robotics Engineer passionate about building 
              intelligent hardware-software systems that solve real-world problems.
            </p>

            <p>
              I specialize in embedded programming, sensor integration,
              microcontrollers, automation systems, and real-time device communication.
              My focus is on designing scalable IoT architectures and smart robotic solutions.
            </p>

            <p>
              I enjoy transforming ideas into working prototypes — from circuit design 
              to firmware development and cloud integration. My goal is to create 
              technology that is efficient, intelligent, and impactful.
            </p>
          </div>

          {/* Right - Glass Card Inside Glass */}
          <div className="rounded-2xl bg-black/40 backdrop-blur-md 
                          border border-green-400/20 
                          p-8 shadow-inner">
            <h3 className="text-xl font-semibold text-green-400 mb-6">
              Core Expertise
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>✔ IoT System Architecture & Smart Devices</li>
              <li>✔ Embedded C / C++ Programming</li>
              <li>✔ Robotics & Automation Integration</li>
              <li>✔ Sensor Networks & Communication Protocols</li>
              <li>✔ Real-Time Data Processing</li>
              <li>✔ Hardware-Software Co-Design</li>
            </ul>
          </div>

        </div>

        {/* Bottom Soft Glow Line */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-sm"></div>
      </div>
    </section>
  )
}
