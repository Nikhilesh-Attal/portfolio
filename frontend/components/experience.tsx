"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Sparkles } from "lucide-react"

interface Experience {
  _id: string
  role: string
  company: string
  duration: {
    start: string
    end?: string
  }
  workType: string
  responsibilities: string[]
  technologies: string[]
  certificateUrl: string[]
  displayOrder: number
}

// Helper function to calculate months/years
const formatDuration = (startStr: string, endStr?: string) => {
  const startDate = new Date(startStr)
  const endDate = endStr ? new Date(endStr) : new Date()

  const formatOpts: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" }
  const formattedStart = startDate.toLocaleDateString("en-US", formatOpts)
  const formattedEnd = endStr ? endDate.toLocaleDateString("en-US", formatOpts) : "Present"

  // Calculate total months difference
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12
  months -= startDate.getMonth()
  months += endDate.getMonth()
  months += 1 // Inclusive of starting month

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  const durationText = []
  if (years > 0) durationText.push(`${years} yr${years > 1 ? "s" : ""}`)
  if (remainingMonths > 0) durationText.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`)

  return `${formattedStart} - ${formattedEnd} · ${durationText.join(" ")}`
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)

  const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
  const API_BASE = rawPort.replace(/\/$/, "");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/experiences`)

        if (!response.ok) {
          throw new Error('Failed to fetch experiences')
        }

        const data = await response.json()

        // FIX: Sort ascending (oldest first, newest on the right)
        const sorted = data.sort(
          (a: Experience, b: Experience) => {
            const dateA = a.duration?.start ? new Date(a.duration.start).getTime() : 0;
            const dateB = b.duration?.start ? new Date(b.duration.start).getTime() : 0;
            return dateA - dateB; 
          }
        )

        setExperiences(sorted)
      } catch (error) {
        console.error('Error fetching experiences:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [API_BASE])

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <p className="text-primary animate-pulse font-medium text-lg">
          Loading experiences...
        </p>
      </div>
    )
  }

  return (
    // FIX: Removed hardcoded bg-slate-50. It now uses the global theme background.
    <section id="experience" className="py-20 relative overflow-hidden">
      
      {/* FIX: Matched Skills bg-gradient with pointer-events-none and -z-10 */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      {/* FIX: Added relative z-10 for interactivity */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
            {/* FIX: text-foreground replaces text-slate-800 */}
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-foreground">Professional Experience</h2>
          </div>
          {/* FIX: text-muted-foreground replaces text-slate-600 */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-world experience building production-ready applications and working with professional development teams.
          </p>
        </motion.div>

        {experiences.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No experiences have been added yet.</p>
          </motion.div>
        ) : (
          <div className="relative w-full overflow-x-auto pb-10 pt-4 snap-x snap-mandatory flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            <div className="flex gap-8 items-center min-h-[750px] relative w-max min-w-full px-4 md:px-12">
              
              {/* Timeline Center Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 -translate-y-1/2 z-0 rounded-full opacity-70" />

              {experiences.slice(0, visibleCount).map((experience, index) => {
                const isUpNode = index % 2 === 0;

                return (
                  <motion.div
                    key={experience._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative w-[320px] h-[500px] shrink-0 snap-center"
                  >
                    {/* Timeline Node Dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-20 shadow-lg transition-transform hover:scale-125" />

                    {/* Connecting Stem */}
                    <div className={`absolute left-1/2 w-0.5 bg-border z-10 -translate-x-1/2 ${
                      isUpNode ? "bottom-1/2 h-12" : "top-1/2 h-12"
                    }`} />

                    <div className={`absolute w-full px-2 ${
                      isUpNode ? "bottom-1/2 mb-12" : "top-1/2 mt-12"
                    }`}>
                      <div className={`absolute w-full px-2 ${isUpNode ? "bottom-1/2 mb-16" : "top-1/2 mt-16"}`}>
                        {/* FIX: bg-card and border-border/50 for dark mode compatibility */}
                        <Card className="bg-card border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                          <CardContent className="p-4 space-y-2">
                            {/* FIX: text-foreground */}
                            <h3 className="font-bold text-foreground leading-tight truncate">{experience.role}</h3>
                            {/* FIX: text-primary */}
                            <p className="text-sm text-primary font-semibold">{experience.company}</p>
                            
                            {/* FIX: New Date and Month calculation string */}
                            <p className="text-[11px] text-muted-foreground uppercase font-bold">
                              {formatDuration(experience.duration.start, experience.duration.end)}
                            </p>
      
                            <div className="text-xs text-muted-foreground space-y-1">
                              {experience.responsibilities.slice(0, 2).map((res, i) => (
                                <p key={i} className="line-clamp-2">• {res}</p>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1 pt-2">
                              {experience.technologies.slice(0, 3).map(tech => (
                                <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {visibleCount < experiences.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6 mb-12"
          >
            <Button
              onClick={() => setVisibleCount(prev => prev + 6)}
              variant="outline"
              size="lg"
              className="rounded-full px-8 hover:scale-105 transition-all duration-300"
            >
              Load More Experiences
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          {/* FIX: Replaced hardcoded blue with theme-compatible muted background */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-muted/50 border border-border/50">
            <span className="text-lg font-medium text-foreground">Ready to bring this experience to your team?</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-full bg-primary/10"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}