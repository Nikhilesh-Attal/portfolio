"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// 📝 TO ADD NEW PROJECTS:
// 1. Copy the project object structure below
// 2. Add your new project to the 'projects' array
// 3. Make sure to include all required fields
// 4. Add your project screenshots to the public folder
// 5. Update the image paths accordingly

const projects = [
  {
    id: "startuphq-ai",
    title: "StartupHQ-AI",
    description:
      "No-fluff AI-powered platform that helps non-technical founders go from raw idea to validated startup concept with investor-ready pitch decks.",
    shortDescription: "Next.js + Appwrite + Multi-AI → Startup validation & pitch deck generation",
    image: "/startuphq-ai.png",
    liveUrl: "https://startuphq-ai.vercel.app/",
    githubUrl: "https://github.com/Nikhilesh-Attal/StartupHQ-AI",
    tags: ["Next.js", "Appwrite", "OpenAI", "Tailwind CSS"],
    status: "Live", // Options: "Live", "Open Source", "In Development"
    screenshots: ["/startuphq-ai.png","/startup_dashboard.png"],
    caseStudy: [
      "Built comprehensive startup validation platform serving solo founders and startup studios",
      "Integrated multiple AI models (GPT-4, Gemini Pro, Claude 3, DeepSeek) for diverse thinking patterns",
      "Implemented secure authentication and database management with Appwrite",
      "Created investor-ready pitch deck generator with AI-powered content optimization",
      "Deployed on Vercel with Firebase Studio integration for design logic",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Appwrite",
      "OpenAI GPT-4",
      "Gemini Pro",
      "Claude AI",
      "DeepSeek",
      "Firebase Studio",
      "Vercel",
    ],
  },
  {
    id: "scrapjob",
    title: "ScrapJob - Automated Job Hunter",
    description:
      "Complete automated job scraping and resume enhancement system that finds relevant jobs and optimizes resumes with AI for better ATS compatibility.",
    shortDescription: "n8n + Python + Firebase + AI → Automated job hunting with resume optimization",
    image: "/scrapjob_image.png",
    liveUrl: "https://scrapjob.vercel.app/",
    githubUrl: "https://github.com/Nikhilesh-Attal/ScrapJob",
    tags: ["n8n", "Typescript", "Firebase", "OpenRouter AI"],
    status: "Live",
    screenshots: ["/scrapjob_image.png", "/n8n_workflow.png", "/scrapjob_list.png"],
    caseStudy: [
      "Automated job scraping from 5+ platforms (Internshala, Indeed, LinkedIn, etc.)",
      "Built intelligent data cleaning and merging pipeline using n8n workflows",
      "Integrated AI-powered resume enhancement with ATS compatibility checking",
      "Implemented real-time notifications via Google Sheets and Telegram API",
      "Deployed locally with Firebase backend for reliable data management",
    ],
    techStack: [
      "n8n",
      "Typescrit",
      "BeautifulSoup",
      "Firebase",
      "Firebase Studio",
      "OpenRouter AI",
      "Google Sheets API",
      "Telegram API",
    ],
  },
  {
    id: "kindling",
    title: "KindLing - Light the Spark of Help",
    description:
      "Decentralized, real-time platform connecting those who need help with those who can offer it, based on location and empathy. Making kindness scalable through technology.",
    shortDescription: "React + Supabase -> Real-time community help platform",
    image: "./kinding_image.png",
    liveUrl: "https://kindling.vercel.app/",
    githubUrl: "https://github.com/Nikhilesh-Attal/spark-a-hand",
    tags: ["React", "Supabase", "Vite", "Tailwind CSS"],
    status: "Live",
    screenshots: ["/kinding_image.png"],
    caseStudy: [
      "Created decentralized platform for instant help requests and offers",
      "Implemented geolocation-based matching for local community support",
      "Built real-time request tracking with Supabase for instant notifications",
      "Designed responsive interface for seamless mobile and desktop experience",
      "Open-sourced to encourage community-driven development and impact",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Supabase", "Real-time subscriptions", "Vercel"],
  },

  // 🚀 ADD YOUR NEW PROJECTS HERE:
  // Copy this template and fill in your details:
  /*
  {
    id: "your-project-id", // unique identifier (lowercase, no spaces)
    title: "Your Project Title",
    description: "Detailed description of what your project does and its impact...",
    shortDescription: "Tech Stack → Main outcome/benefit",
    image: "/your-project-image.png", // Add image to public folder
    liveUrl: "https://your-live-url.com",
    githubUrl: "https://github.com/your-username/your-repo",
    tags: ["React", "Node.js", "AI"], // Main technologies (max 4-5)
    status: "Live", // "Live", "Open Source", or "In Development"
    screenshots: [
      "/screenshot1.png", // Add screenshots to public folder
      "/screenshot2.png",
      "/screenshot3.png"
    ],
    caseStudy: [
      "Key achievement or feature 1",
      "Key achievement or feature 2", 
      "Key achievement or feature 3",
      "Impact or results achieved"
    ],
    techStack: [
      "All", "Technologies", "Used", "In", "The", "Project"
    ],
  },
  */
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentScreenshot, setCurrentScreenshot] = useState(0)

  const nextScreenshot = () => {
    if (selectedProject) {
      setCurrentScreenshot((prev) => (prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1))
    }
  }

  const prevScreenshot = () => {
    if (selectedProject) {
      setCurrentScreenshot((prev) => (prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1))
    }
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of the products I've built that solve real problems with AI-powered automation and intelligent
            user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={project.status === "Live" ? "default" : "secondary"}
                      className={project.status === "Live" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveUrl, "_blank")
                        }}
                        className="bg-white/90 hover:bg-white text-black"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, "_blank")
                        }}
                        className="bg-white/90 hover:bg-white text-black"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6" onClick={() => setSelectedProject(project)}>
                  <h3 className="text-xl font-semibold mb-2 font-space-grotesk group-hover:text-gradient transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  <p className="text-sm font-medium mb-4 text-gradient">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold font-space-grotesk">{selectedProject.title}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Screenshot Carousel */}
              <div className="relative mb-6">
                <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.screenshots[currentScreenshot] || "/placeholder.svg"}
                    alt={`${selectedProject.title} screenshot ${currentScreenshot + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {selectedProject.screenshots.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={prevScreenshot}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={nextScreenshot}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    <div className="flex justify-center mt-4 gap-2">
                      {selectedProject.screenshots.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentScreenshot ? "bg-primary" : "bg-muted"
                          }`}
                          onClick={() => setCurrentScreenshot(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Case Study</h4>
                  <ul className="space-y-2">
                    {selectedProject.caseStudy.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => window.open(selectedProject.liveUrl, "_blank")} className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                      className="flex-1"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
