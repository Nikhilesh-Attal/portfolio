"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Trophy, Users, Clock, Target } from "lucide-react"

const hackathons = [
  {
    id: "hack4",
    title: "Hack4.0 - Blockchain Crowdfunding Platform",
    duration: "36 hours",
    role: "Team Lead",
    teamSize: 4,
    description: "Led a 4-member team to design a blockchain-powered crowdfunding platform using Ethereum & Web3.js.",
    achievements: [
      "Coordinated debugging, blockchain integration, and feature prioritization under time pressure",
      "Learned to navigate real-time problem solving in high-pressure environments",
      "Successfully deployed smart contracts for transparent fund management",
      "Implemented Web3 wallet integration for seamless user experience",
    ],
    technologies: ["Ethereum", "Web3.js", "Solidity", "React", "Node.js"],
    linkedinUrl: "https://linkedin.com/posts/nikhilesh-attal-hack4",
    icon: "💰",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "lnmhacks",
    title: "LNMHacks 7.0 - Decentralized Voting System",
    duration: "72 hours",
    role: "Team Lead",
    teamSize: 5,
    description: "Designed a secure blockchain-based voting application ensuring transparency and immutability.",
    achievements: [
      "Managed team communication, task allocation, and overall project direction",
      "Engaged with mentors and participants to refine the product vision",
      "Implemented cryptographic security for vote integrity",
      "Created intuitive UI for complex blockchain interactions",
    ],
    technologies: ["Blockchain", "Smart Contracts", "React", "Cryptography", "IPFS"],
    linkedinUrl: "https://linkedin.com/posts/nikhilesh-attal-lnmhacks",
    icon: "🗳️",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "codefiesta",
    title: "CodeFiesta 3.0 - Blockchain Certificate Verification",
    duration: "24 hours",
    role: "Team Lead",
    teamSize: 3,
    description: "Built a prototype for issuing and verifying academic certificates via blockchain.",
    achievements: [
      "Facilitated team planning, milestone tracking, and resource coordination",
      "Developed stronger adaptability and collaboration skills under tight deadlines",
      "Created tamper-proof certificate storage system",
      "Designed QR code verification for instant authenticity checks",
    ],
    technologies: ["Blockchain", "QR Codes", "Digital Signatures", "React", "Express.js"],
    linkedinUrl: "https://linkedin.com/posts/nikhilesh-attal-codefiesta",
    icon: "🎓",
    color: "from-green-500 to-teal-500",
  },
]

export default function Hackathons() {
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
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk">Hackathon Leadership Experience</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leading teams through high-pressure innovation challenges, building blockchain solutions, and developing
            leadership skills in fast-paced environments.
          </p>
        </motion.div>

        <div className="space-y-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${hackathon.color}`} />
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Left side - Icon and basic info */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {hackathon.icon}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {hackathon.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {hackathon.teamSize} members
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="w-4 h-4" />
                            {hackathon.role}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold font-space-grotesk mb-3 group-hover:text-gradient transition-colors">
                          {hackathon.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{hackathon.description}</p>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {hackathon.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {hackathon.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* LinkedIn Link */}
                        <Button
                          variant="outline"
                          onClick={() => window.open(hackathon.linkedinUrl, "_blank")}
                          className="group/btn"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-x-1" />
                          View LinkedIn Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "3", label: "Hackathons Led", icon: "🏆" },
            { number: "132", label: "Total Hours", icon: "⏱️" },
            { number: "12", label: "Team Members", icon: "👥" },
            { number: "100%", label: "Blockchain Focus", icon: "⛓️" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-border/50"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gradient font-space-grotesk">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
