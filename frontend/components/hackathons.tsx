"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Trophy, Users, Clock, Target, Loader2 } from "lucide-react"

export default function Hackathons() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const [hackathons, setHackathons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_PORT || "").replace(/\/$/, "");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/hackathons`)
        if (!response.ok) throw new Error("Failed to fetch")
        
        const data = await response.json()
        console.log("API Response:", data)

        if (Array.isArray(data)) {
          setHackathons(data)
        } else if (data && Array.isArray(data.hackathons)) {
          setHackathons(data.hackathons)
        } else if (data && Array.isArray(data.data)) {
          setHackathons(data.data)
        } else {
          console.error("Data is not an array:", data)
          setHackathons([])
        }
      } catch (err) {
        console.error("Error fetching hackathons:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchHackathons()
  }, [API_BASE])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Fetching hackathons...</p>
      </div>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk">Hackathon Leadership Experience</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leading teams through high-pressure innovation challenges.
          </p>
        </motion.div>

        <div className="space-y-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon._id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${hackathon.color || "from-blue-500 to-purple-500"}`} />
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-4xl mb-4">
                          {hackathon.icon || "💻"}
                        </div>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4" /> {hackathon.duration}</div>
                          <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4" /> {hackathon.member} Team Size</div>
                          <div className="flex items-center gap-2 text-sm"><Target className="w-4 h-4" /> {hackathon.role}</div>
                        </div>
                      </div>

                      <div className="flex-1">
                        {/* Added group-hover:text-primary transition-colors to match project cards */}
                        <h3 className="text-2xl font-bold font-space-grotesk mb-3 group-hover:text-primary transition-colors">
                          {hackathon.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{hackathon.description}</p>

                        <div className="mb-6">
                          {/* Styled to match the Projects component modal subheadings */}
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" /> Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {hackathon.achievement ? (
                              <li className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> {hackathon.achievement}
                              </li>
                            ) : null}
                          </ul>
                        </div>

                        <div className="mb-6">
                          {/* Styled to match the Projects component modal subheadings */}
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {hackathon.technologies?.map((tech: string) => (
                              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" onClick={() => window.open(hackathon.links?.[0], "_blank")}>
                          <ExternalLink className="w-4 h-4 mr-2" /> View Project
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}