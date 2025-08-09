"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase, Calendar, MapPin, Code, Database } from "lucide-react"

const experiences = [
  {
    id: "cothon-solutions",
    title: "Web Developer",
    company: "Cothon Solutions",
    location: "Hybrid",
    duration: "15 May 2025 – 15 July 2025",
    type: "Internship",
    project: "Bizhub – Multi-tenant CRM SaaS",
    description:
      "Worked on the development of a multi-tenant CRM SaaS platform aimed at providing businesses with efficient customer management tools.",
    responsibilities: [
      "Developed and maintained key features of the CRM SaaS platform",
      "Utilized Supabase for database management and authentication",
      "Integrated Prisma ORM to connect Supabase with the frontend",
      "Designed responsive UI components using Tailwind CSS and React",
      "Participated in 4 structured meetings for planning, updates, and feedback",
    ],
    technologies: ["React", "Tailwind CSS", "Prisma", "Supabase", "SaaS Development", "Team Collaboration"],
    certificateUrl: "https://www.linkedin.com/posts/nikhilesh-attal_internship-web-development-cothon-solutions-activity-7359871898077319168-zAAd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD98nEEB0cezh7xYlf6OfKOczEtcLmo4tuo", // Replace with actual certificate link
    icon: "💼",
    color: "from-blue-500 to-cyan-500",
    highlights: [
      { icon: "👥", label: "Multi-tenant Architecture", value: "SaaS Platform" },
      { icon: "🗄️", label: "Database Management", value: "Supabase + Prisma" },
      { icon: "🎨", label: "UI Development", value: "React + Tailwind" },
      { icon: "🤝", label: "Team Meetings", value: "4 Structured Sessions" },
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${experience.color}`} />
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      {/* Left side - Company info and icon */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          {experience.icon}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {experience.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {experience.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="w-4 h-4" />
                            {experience.type}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold font-space-grotesk mb-2 group-hover:text-gradient transition-colors">
                            {experience.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {experience.company}
                            </span>
                            <Badge variant="secondary" className="w-fit">
                              {experience.type}
                            </Badge>
                          </div>
                          <p className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-4">
                            {experience.project}
                          </p>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">{experience.description}</p>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          {experience.highlights.map((highlight, i) => (
                            <div key={i} className="text-center p-3 rounded-lg bg-muted/30">
                              <div className="text-2xl mb-1">{highlight.icon}</div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">{highlight.label}</div>
                              <div className="text-xs font-semibold">{highlight.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Code className="w-4 h-4 text-blue-500" />
                            Key Responsibilities & Contributions
                          </h4>
                          <ul className="space-y-2">
                            {experience.responsibilities.map((responsibility, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-500" />
                            Skills & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certificate Link */}
                        {/* Certificate Link */}
{/* Certificate Link */}
<Button
  variant="outline"
  onClick={async (e) => {
    e.preventDefault()
    console.log("Button clicked, URL:", experience.certificateUrl)
    
    try {
      // Try to open the LinkedIn URL
      const newWindow = window.open(experience.certificateUrl, "_blank", "noopener,noreferrer")
      if (!newWindow) {
        throw new Error("Popup blocked")
      }
    } catch (error) {
      console.error("Error opening LinkedIn URL:", error)
      
      try {
        // Fallback: try direct navigation
        window.location.href = experience.certificateUrl
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError)
      }
    } finally {
      // Always try to open the certificate image as final fallback
      console.log("Opening certificate image as fallback")
      setTimeout(() => {
        try {
          const imageWindow = window.open("/cothon_solution_internship.jpg", "_blank", "noopener,noreferrer")
          if (!imageWindow) {
            // If popup is blocked, create a modal or direct link
            console.log("Image popup blocked, creating direct link")
            const link = document.createElement('a')
            link.href = "/cothon_solution_internship.jpg"
            link.target = "_blank"
            link.rel = "noopener noreferrer"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        } catch (imageError) {
          console.error("Could not open certificate image:", imageError)
          alert("Certificate image is available at: /cothon_solution_internship.jpg")
        }
      }, 1000) // 1 second delay to let the first attempt complete
    }
  }}
  className="group/btn"
>
  <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-x-1" />
  View Certificate
</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-2xl"
            >
              💼
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
