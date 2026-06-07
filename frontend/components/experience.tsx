"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Sparkles, X, ExternalLink } from "lucide-react"

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

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12
  months -= startDate.getMonth()
  months += endDate.getMonth()
  months += 1 

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
  
  // NEW: State to manage the open modal
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

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
    <section id="experience" className="py-20 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

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
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-foreground">Professional Experience</h2>
          </div>
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
                        
                        <Card 
                          onClick={() => setSelectedExperience(experience)}
                          className="bg-card border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group"
                        >
                          <CardContent className="p-5 space-y-3">
                            <div>
                                <h3 className="font-bold text-lg text-foreground leading-tight truncate group-hover:text-primary transition-colors">{experience.role}</h3>
                                <p className="text-sm text-primary font-semibold">{experience.company}</p>
                            </div>
                            
                            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">
                              {formatDuration(experience.duration.start, experience.duration.end)}
                            </p>
      
                            <div className="text-sm text-muted-foreground space-y-1">
                              {experience.responsibilities.slice(0, 2).map((res, i) => (
                                <p key={i} className="line-clamp-2">• {res}</p>
                              ))}
                            </div>

                            {/* Show Read More cue if there are more responsibilities or details */}
                            {experience.responsibilities.length > 2 && (
                                <p className="text-xs text-primary font-semibold mt-1">Read more...</p>
                            )}

                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                              {experience.technologies.slice(0, 3).map(tech => (
                                <Badge key={tech} variant="secondary" className="text-[10px] font-normal">{tech}</Badge>
                              ))}
                              {experience.technologies.length > 3 && (
                                  <span className="text-[10px] text-muted-foreground py-0.5">+{experience.technologies.length - 3} more</span>
                              )}
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
            className="flex justify-center mt-6 mb-12 relative z-30"
          >
            {/* Added type="button" and explicit z-index to prevent click blocking */}
            <Button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 6)}
              variant="outline"
              size="lg"
              className="rounded-full px-8 hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/50"
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

      {/* --- DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedExperience && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
                onClick={() => setSelectedExperience(null)}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-muted w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex justify-between items-start p-6 border-b border-border/50 bg-muted/20">
                        <div className="pr-8">
                            <h3 className="text-2xl font-bold text-foreground font-space-grotesk">{selectedExperience.role}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="text-lg text-primary font-semibold">{selectedExperience.company}</span>
                                <Badge variant="outline" className="bg-background">{selectedExperience.workType}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 font-medium">
                                {formatDuration(selectedExperience.duration.start, selectedExperience.duration.end)}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => setSelectedExperience(null)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Modal Body (Scrollable) */}
                    <div className="p-6 overflow-y-auto space-y-8">
                        
                        {/* Responsibilities */}
                        <section>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Key Responsibilities</h4>
                            <ul className="space-y-3">
                                {selectedExperience.responsibilities.map((res, i) => (
                                    <li key={i} className="flex items-start text-foreground leading-relaxed">
                                        <span className="text-primary mr-3 text-lg leading-none">•</span>
                                        <span>{res}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Technologies */}
                        <section>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Technologies & Tools</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedExperience.technologies.map(tech => (
                                    <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        {/* Certificates (If any exist) */}
                        {selectedExperience.certificateUrl && selectedExperience.certificateUrl.length > 0 && selectedExperience.certificateUrl[0] !== "" && (
                            <section>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Credentials</h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedExperience.certificateUrl.map((cert, index) => (
                                        <Button 
                                            key={index} 
                                            variant="outline" 
                                            size="sm" 
                                            className="gap-2"
                                            onClick={() => window.open(cert, "_blank")}
                                        >
                                            <ExternalLink className="w-4 h-4" /> 
                                            View Certificate {selectedExperience.certificateUrl.length > 1 ? `#${index + 1}` : ''}
                                        </Button>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}