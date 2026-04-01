import { Suspense } from "react"
import dynamic from "next/dynamic"

//static import (above the fold - load instantly)
import Hero from "@/components/hero"
import About from "@/components/about"
import { SectionSkeleton } from "@/components/ui/section-skeleton"

//dynamic iimport (below the fold - load on demand { lazy loading})
const Projects = dynamic(() => import("@/components/projects"))
const Skills = dynamic(() => import("@/components/skills"))
const Experience = dynamic(() => import("@/components/experience"))
const Hackathons = dynamic(() => import("@/components/hackathons"))
const Reviews = dynamic(() => import("@/components/reviews"))
const Philosophy = dynamic(() => import("@/components/philosophy"))
const WhatIBring = dynamic(() => import("@/components/what-i-bring"))
const Contact = dynamic(() => import("@/components/contact"))

export default function Home() {
  return (
    <main className="min-h-screen">

      {/*instantly loaded */}
      <Hero />
      <About />

      {/* Lazy loading with suspense fallback */}
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>

      <Suspense fallback={ <SectionSkeleton />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <Experience />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <Hackathons />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <Reviews />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <Philosophy />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <WhatIBring />
      </Suspense>
      
      <Suspense fallback={ <SectionSkeleton />}>
        <Contact />
      </Suspense>
    </main>
  )
}
