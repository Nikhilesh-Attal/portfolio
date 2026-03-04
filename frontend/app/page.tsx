import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Hackathons from "@/components/hackathons"
import Reviews from "@/components/reviews"
import Philosophy from "@/components/philosophy"
import WhatIBring from "@/components/what-i-bring"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Hackathons />
      <Reviews />
      <Philosophy />
      <WhatIBring />
      <Contact />
    </main>
  )
}
