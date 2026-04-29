"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Workflow, Target, Cpu, Sparkles } from "lucide-react"

const traits = [
  {
    title: "Relentless Builder",
    description: "I don't just write code; I ship solutions. My focus is on reducing the time between 'Idea' and 'Live Product'.",
    story: "Developed and deployed StartupHQ-AI and ScrapJob, achieving full-stack functionality in weeks, not months.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Agentic Orchestrator",
    description: "I design the 'nervous system' of applications using n8n and Make.com to bridge AI with real-world workflows.",
    story: "Architected a Smart HMS triage system that automates doctor appointments using intelligent AI agents.",
    icon: <Workflow className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Data Alchemist",
    description: "I specialize in transforming unstructured chaos—images, PDFs, and raw text—into structured, actionable JSON assets.",
    story: "Built Smart-Notes AI to instantly summarize complex PDFs and provide context-aware Q&A for students.",
    icon: <Target className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: "AI-First Architect",
    description: "I view LLMs as teammates. I integrate intelligence into the core of the product rather than treating it as an add-on.",
    story: "Mastered prompt engineering to automate lead scraping and content generation workflows that run 24/7.",
    icon: <Cpu className="w-6 h-6 text-purple-500" />,
  },
]

const values = ["AI Agents", "Automated Workflows", "Rapid Prototyping", "Structured Data"]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [currentValueIndex, setCurrentValueIndex] = useState(0)

  // Rotate values every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % values.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-bold font-space-grotesk mb-8">The Mission & The Maker</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
            I’m a developer who bridges the gap between raw code and intelligent systems. I believe in the power of{" "}
            <span className="relative inline-block min-w-[180px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentValueIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-gradient font-bold absolute"
                >
                  {values[currentValueIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            to eliminate repetitive human toil. My journey is defined by building products that solve real friction points, 
            optimized for speed and engineered for impact.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["n8n", "Next.js", "TypeScript", "Python", "LLMs", "MongoDB"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Badge variant="outline" className="px-4 py-1 text-sm border-primary/20 bg-primary/5 hover:bg-primary/10">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="h-[280px]" // Fixed height to prevent layout jump on flip
            >
              <Card
                className="h-full cursor-pointer transition-all duration-300 border-muted/50 hover:border-primary/50 perspective-1000 bg-card/50 backdrop-blur-sm"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              >
                <CardContent
                  className="p-8 h-full relative preserve-3d transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCard === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side */}
                  <div className="backface-hidden absolute inset-0 p-8 flex flex-col items-start justify-center">
                    <div className="p-3 rounded-xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                      {trait.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-space-grotesk">{trait.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{trait.description}</p>
                    <div className="mt-6 text-xs text-primary font-bold flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-3 h-3" /> Hover for the story
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 backface-hidden p-8 bg-gradient-to-br from-primary/20 via-background to-background rounded-lg border border-primary/30 flex flex-col items-start justify-center"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <Badge className="mb-4 bg-primary text-primary-foreground">The Real Story</Badge>
                    <p className="text-sm font-medium leading-relaxed italic text-foreground">
                      "{trait.story}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-24 p-10 rounded-3xl bg-card border border-primary/10 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
          <blockquote className="text-2xl sm:text-3xl font-bold font-space-grotesk text-foreground mb-6 leading-tight">
            "I don't wait for permission to build. I leverage AI as a force multiplier to ship products that turn manual toil into automated assets."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
             <div className="h-[1px] w-8 bg-muted-foreground/30" />
             <cite className="text-muted-foreground font-medium not-italic tracking-wide">Development Philosophy</cite>
             <div className="h-[1px] w-8 bg-muted-foreground/30" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}