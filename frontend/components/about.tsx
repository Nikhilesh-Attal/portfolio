"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const traits = [
  {
    title: "Relentless Builder",
    description: "I ship fast and iterate faster. Every project teaches me something new.",
    story: "Built 3 products in 6 months while learning AI/ML from scratch.",
    icon: "🚀",
  },
  {
    title: "Collaborative Spirit",
    description: "Great products come from great teams. I believe in transparent communication.",
    story: "Led cross-functional teams to deliver complex automation solutions.",
    icon: "🤝",
  },
  {
    title: "Product-First Mindset",
    description: "Technology serves users, not the other way around. UX drives my decisions.",
    story: "Redesigned entire workflows based on user feedback and analytics.",
    icon: "💡",
  },
  {
    title: "AI-Native Approach",
    description: "I leverage AI as a force multiplier, not a replacement for thinking.",
    story: "Integrated LLMs into every product to enhance user productivity.",
    icon: "🧠",
  },
]

const values = ["AI", "Automation", "Startup"]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [currentValueIndex, setCurrentValueIndex] = useState(0)

  // Rotate values every 2 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % values.length)
    }, 2000)
    return () => clearInterval(interval)
  })

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            I'm a full-stack developer who believes in the power of{" "}
            <motion.span
              key={currentValueIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-gradient font-semibold"
            >
              {values[currentValueIndex]}
            </motion.span>{" "}
            to solve real problems. My journey spans from traditional web development to cutting-edge AI integration,
            always with a focus on creating products that users actually want to use.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Next.js", "TypeScript", "Python", "AI/ML"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group perspective-1000"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <CardContent
                  className="p-6 relative preserve-3d transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCard === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front side */}
                  <div className="backface-hidden">
                    <div className="text-3xl mb-4">{trait.icon}</div>
                    <h3 className="text-lg font-semibold mb-3 font-space-grotesk">{trait.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{trait.description}</p>
                  </div>

                  {/* Back side */}
                  <div
                    className="absolute inset-0 backface-hidden p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="text-2xl mb-4">💫</div>
                    <h3 className="text-lg font-semibold mb-3 font-space-grotesk text-gradient">Real Story</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{trait.story}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-emerald-500/5 border border-purple-500/10"
        >
          <blockquote className="text-xl sm:text-2xl font-medium font-space-grotesk text-gradient mb-4">
            "I learn by building. AI is not a shortcut, it's my partner in shipping better products faster."
          </blockquote>
          <cite className="text-muted-foreground">— My development philosophy</cite>
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
