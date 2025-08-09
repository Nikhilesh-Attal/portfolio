"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const skillCategories = {
  Frontend: [
    { name: "React", icon: "⚛️", level: 95 },
    { name: "Next.js", icon: "▲", level: 90 },
    { name: "TypeScript", icon: "📘", level: 88 },
    { name: "Tailwind CSS", icon: "🎨", level: 92 },
  ],
  Backend: [
    { name: "Node.js", icon: "🟢", level: 85 },
    { name: "Python", icon: "🐍", level: 82 },
    { name: "Firebase", icon: "🔥", level: 88 },
    { name: "Supabase", icon: "⚡", level: 85 },
  ],
  AI: [
    { name: "ChatGPT", icon: "🤖", level: 90 },
    { name: "Claude AI", icon: "🧠", level: 85 },
    { name: "DeepSeek", icon: "🔍", level: 80 },
    { name: "LangChain", icon: "🔗", level: 85 },
  ],
  Database: [
    { name: "MongoDB", icon: "🍃", level: 80 },
    { name: "Firebase", icon: "🔥", level: 88 },
    { name: "Supabase", icon: "⚡", level: 85 },
    { name: "Appwrite", icon: "📱", level: 82 },
  ],
  Automation: [
    { name: "n8n", icon: "🔄", level: 88 },
    { name: "Zapier", icon: "⚡", level: 75 },
    { name: "Google Sheets API", icon: "📊", level: 85 },
    { name: "Telegram Bot", icon: "📱", level: 80 },
  ],
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string>("Frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My toolkit for building modern, AI-powered applications with seamless automation workflows.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {Object.keys(skillCategories).map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-muted"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index) => (
            <motion.div
              key={`${activeCategory}-${skill.name}`} // Fixed key to include category
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative p-6 rounded-2xl bg-card border border-border/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                onHoverStart={() => setHoveredSkill(`${activeCategory}-${skill.name}`)}
                onHoverEnd={() => setHoveredSkill(null)}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Skill Icon */}
                <div className="text-3xl mb-3 text-center">{skill.icon}</div>

                {/* Skill Name */}
                <h3 className="text-lg font-semibold text-center mb-3 font-space-grotesk">{skill.name}</h3>

                {/* Skill Level Bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-2">{skill.level}%</div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredSkill === `${activeCategory}-${skill.name}` && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <span className="text-sm text-muted-foreground">Always learning, always automating</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-lg"
            >
              🚀
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
