"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  Monitor, 
  Server, 
  Database, 
  Zap, 
  BrainCircuit, 
  Code2, 
  Loader2, 
  Rocket
} from "lucide-react"

// Interface matching your backend schema
interface Skill {
  _id: string;
  category: string;
  name: string;
  proficiency: number;
  displayOrder: number;
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true }) 
  
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_PORT || "").replace(/\/$/, "");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/skills`)
        if (!response.ok) throw new Error("Failed to fetch skills")
        
        const data: Skill[] = await response.json()
        
        // FIX: Clean trailing spaces from the database categories and sort
        const cleanData = data.map(skill => ({
          ...skill,
          category: skill.category.trim()
        })).sort((a, b) => a.displayOrder - b.displayOrder)
        
        setSkills(cleanData)

        // Automatically extract unique trimmed categories
        const uniqueCategories = Array.from(new Set(cleanData.map(s => s.category)))
        setCategories(["All", ...uniqueCategories])

      } catch (err) {
        console.error("Error fetching skills:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [API_BASE])

  // Helper function to assign a professional icon based on the category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return <Monitor className="w-8 h-8 text-blue-500" />
      case "Backend": return <Server className="w-8 h-8 text-green-500" />
      case "Database": return <Database className="w-8 h-8 text-emerald-500" />
      case "Automation": return <Zap className="w-8 h-8 text-yellow-500" />
      case "Generative AI": return <BrainCircuit className="w-8 h-8 text-purple-500" />
      default: return <Code2 className="w-8 h-8 text-gray-500" />
    }
  }

  // Filter skills based on the active tab
  const displayedSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  // FIX: 5-Tier Color System
  const getProgressBarColor = (level: number) => {
    if (level >= 90) return "from-emerald-400 to-emerald-600"; // Expert (Green)
    if (level >= 75) return "from-blue-400 to-blue-600";       // Advanced (Blue)
    if (level >= 60) return "from-yellow-400 to-orange-500";   // Intermediate (Orange)
    if (level >= 45) return "from-purple-400 to-purple-600";   // Developing (Purple)
    return "from-slate-400 to-slate-600";                      // Novice (Gray)
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading toolkit...</p>
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* FIX: Added pointer-events-none and -z-10 so it doesn't block clicks */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      {/* FIX: Added relative and z-10 to ensure content is clickable over the background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My toolkit for building modern, AI-powered applications with seamless automation workflows.
          </p>
        </motion.div>

        {/* Dynamic Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedSkills.length > 0 ? (
              displayedSkills.map((skill, index) => (
                <motion.div
                  layout
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  {/* FIX: Removed h-full, flex-col to stop the gap stretching */}
                  <motion.div
                    className="relative p-6 rounded-2xl bg-card border border-border/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
                    onHoverStart={() => setHoveredSkill(skill._id)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {/* Skill Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:scale-110 transition-transform duration-300">
                        {getCategoryIcon(skill.category)}
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-lg font-bold text-center mb-2 font-space-grotesk group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>

                    {/* Skill Level Bar (FIX: Changed mt-auto to mt-4) */}
                    <div className="relative mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Proficiency</span>
                        <span className="text-xs font-bold text-primary">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden border border-border/50">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getProgressBarColor(skill.proficiency)} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
                        >
                          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    {hoveredSkill === skill._id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full text-center py-10"
              >
                <p className="text-muted-foreground">No skills found in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Always learning, always automating</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              <Rocket className="w-5 h-5 text-blue-500" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}