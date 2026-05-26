"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase, Calendar, MapPin, Code, Database, Sparkles } from "lucide-react"

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const fetchExperience = async ()=> {
      try{
        const response = await fetch('http://localhost:5000/api/experiences')

        if(!response.ok){
          throw new Error('Failed to fetch experiences')
        }

        const data = await response.json()

        const sorted = data.sort(
          (a: Experience, b:Experience) => new Date(b.duration.start).getTime() - new Date(a.duration.start).getTime()
        )

        setExperiences(sorted)
      }catch(error){
        console.error('Error fetching experiences:', error)
      }finally{
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  if (loading) {
    return (
        <div className="py-20 flex justify-center">
            <p className="text-muted-foreground animate-pulse">
                Loading experiences...
            </p>
        </div>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk">Professional Experience</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-world experience building production-ready applications and working with professional development
            teams.
          </p>
        </motion.div>

        <div className="relative">

    {/* Center Timeline */}
    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transform -translate-x-1/2 hidden md:block" />

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {experiences.slice(0, visibleCount).map((experience, index) => {

            return (
                <motion.div
                    key={experience._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex justify-center flex-1"
                >

                    {/* Timeline Dot */}
                    <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-20" />

                    <Card className="w-full max/w/sm group hover:shadow-xl transition-all duration-300 border-muted/40 bg-card/70 backdrop-blur-sm">
                        <CardContent className="p-6">

                            {/* Header */}
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold">
                                    {experience.role}
                                </h3>

                                <p className="text-lg text-blue-500 font-semibold">
                                    {experience.company}
                                </p>

                                <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                                    <span>
                                        {new Date(experience.duration.start).toLocaleDateString("en-US", {
                                            month: "short",
                                            year: "numeric",
                                        })}
                                        {" - "}
                                        {experience.duration.end
                                            ? new Date(experience.duration.end).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "Present"}
                                    </span>

                                    <Badge variant="secondary">
                                        {experience.workType}
                                    </Badge>
                                </div>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-5">
                                <h4 className="font-semibold mb-3">
                                    Responsibilities
                                </h4>

                                <ul className="space-y-2">
                                    {experience.responsibilities.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-sm text-muted-foreground flex gap-2"
                                        >
                                            <span>•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {experience.technologies.map((tech) => (
                                    <Badge key={tech} variant="outline">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>

                            {/* Certificates */}
                            {experience.certificateUrl.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {experience.certificateUrl.map((url, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(url, "_blank")}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Certificate
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
              )
            })}
      </div>
        </div>

        {visibleCount < experiences.length && (
          <div className="flex justify-center mt-14">
            <Button
              onClick={() => setVisibleCount(prev => prev + 6)}
              variant="outline"
              className="rounded-full px-8"
             >
              Load More
            </Button>
          </div>
        )}

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <span className="text-lg font-medium">Ready to bring this experience to your team</span>
            <motion.span
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="p-2 rounded-full bg-blue-500/10"
            >
              <Sparkles className="w-6 h-6 text-blue-500" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
