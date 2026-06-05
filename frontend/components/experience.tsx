"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase, Sparkles } from "lucide-react"

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

export default function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [visibleCount, setVisibleCount] = useState(6)

    // SAFELY parse URL to avoid double-slash 404/500 errors
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
                        return dateB - dateA;
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
                <p className="text-blue-600 animate-pulse font-medium text-lg">
                    Loading experiences...
                </p>
            </div>
        )
    }

    return (
        <section id="experience" className="py-20 relative overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* CHANGED to whileInView so it actually triggers */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-slate-800">Professional Experience</h2>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
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
                        <p className="text-slate-500 text-lg">No experiences have been added yet.</p>
                    </motion.div>
                ) : (
                    <div className="relative w-full overflow-x-auto pb-10 pt-4 snap-x snap-mandatory flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        
                        <div className="flex gap-8 items-center min-h-[750px] relative w-max min-w-full px-4 md:px-12">
                            
                            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 -translate-y-1/2 z-0 rounded-full opacity-70" />

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
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-slate-100 z-20 shadow-lg transition-transform hover:scale-125" />

                                        <div className={`absolute left-1/2 w-0.5 bg-blue-500/50 z-10 -translate-x-1/2 ${
                                            isUpNode ? "bottom-1/2 h-12" : "top-1/2 h-12"
                                        }`} />

                                        <div className={`absolute w-full px-2 ${
                                            isUpNode ? "bottom-1/2 mb-12" : "top-1/2 mt-12"
                                        }`}>
                                            <div className={`absolute w-full px-2 ${isUpNode ? "bottom-1/2 mb-16" : "top-1/2 mt-16"}`}>
                                              <Card className="border-blue-100 bg-white">
                                                <CardContent className="p-4 space-y-2">
                                                  <h3 className="font-bold text-slate-900 leading-tight truncate">{experience.role}</h3>
                                                  <p className="text-sm text-blue-700 font-semibold">{experience.company}</p>
                                                  <p className="text-[11px] text-slate-500 uppercase font-bold">
                                                    {new Date(experience.duration.start).getFullYear()} - {experience.duration.end ? new Date(experience.duration.end).getFullYear() : "Present"}
                                                  </p>
            
                                                  {/* Description: Only show first 2 bullets and clamp text */}
                                                  <div className="text-xs text-slate-600 space-y-1">
                                                      {experience.responsibilities.slice(0, 2).map((res, i) => (
                                                          <p key={i} className="line-clamp-2">• {res}</p>
                                                      ))}
                                                  </div>

                                                    {/* Compact Badges */}
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
                            className="rounded-full px-8 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-200 shadow-sm transition-all duration-300 hover:scale-105"
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
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200">
                        <span className="text-lg font-medium text-blue-900">Ready to bring this experience to your team?</span>
                        <motion.span
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            className="p-2 rounded-full bg-blue-200/50"
                        >
                            <Sparkles className="w-6 h-6 text-blue-700" />
                        </motion.span>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}