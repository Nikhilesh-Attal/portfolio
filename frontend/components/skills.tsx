"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Loader2, Rocket } from "lucide-react"

interface Skill {
  _id: string;
  category: string;
  name: string;
  proficiency: number;
  displayOrder: number;
}

export default function Skills() {
  const ref = useRef(null)
  
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_PORT || "").replace(/\/$/, "");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/skills`)
        if (!response.ok) throw new Error("Failed to fetch")
        const data: Skill[] = await response.json()
        
        const cleanData = data.map(s => ({ ...s, category: s.category.trim() }))
                              .sort((a, b) => a.displayOrder - b.displayOrder)
        
        setSkills(cleanData)
        setCategories(["All", ...Array.from(new Set(cleanData.map(s => s.category)))])
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [API_BASE])

  const displayedSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>

  return (
    <section id="skills" className="py-20 bg-background/50">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-space-grotesk mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground">My toolkit for building modern, AI-powered applications.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Semantic Skill List (SEO Optimized) */}
        <ul className="flex flex-wrap justify-center gap-3">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.li
                layout
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="list-none"
              >
                <div 
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors cursor-default"
                  aria-label={`${skill.name}, ${skill.proficiency}% proficiency`}
                >
                  <span className="font-semibold text-sm">{skill.name}</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-border">
            <span className="text-sm font-medium">Always learning, always automating</span>
            <Rocket className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </div>
    </section>
  )
}