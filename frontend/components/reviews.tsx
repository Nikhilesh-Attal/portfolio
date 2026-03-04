"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Full Stack Developer",
    company: "Tech Startup",
    content:
      "Nikhilesh is incredibly talented! His ability to integrate AI into real-world applications is outstanding. He built our entire automation pipeline in just 2 weeks and it's been running flawlessly.",
    rating: 5,
    avatar: "/avatar-arjun.png",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Product Manager",
    company: "SaaS Company",
    content:
      "Working with Nikhilesh was a game-changer. He doesn't just code - he thinks like a founder. His StartupHQ-AI platform saved us months of manual work and the results speak for themselves.",
    rating: 5,
    avatar: "/avatar-priya.png",
  },
  {
    id: "3",
    name: "Rahul Gupta",
    role: "Indie Maker",
    company: "Freelancer",
    content:
      "Nikhilesh helped me automate my entire job application process. His ScrapJob tool is pure magic - it's like having a personal assistant that never sleeps! Highly recommend his work.",
    rating: 5,
    avatar: "/avatar-rahul.png",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Startup Founder",
    company: "EdTech Startup",
    content:
      "The KindLing platform Nikhilesh built is exactly what our community needed. His attention to user experience and real-time features is phenomenal. Users love the intuitive interface.",
    rating: 5,
    avatar: "/avatar-sneha.png",
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "AI Company",
    content:
      "Nikhilesh has this rare combination of technical depth and product thinking. He can take a complex AI concept and turn it into something users actually want to use. Impressive work ethic too.",
    rating: 5,
    avatar: "/avatar-vikram.png",
  },
  {
    id: "6",
    name: "Ananya Joshi",
    role: "UX Designer",
    company: "Design Agency",
    content:
      "I've worked with many developers, but Nikhilesh stands out. He actually cares about the user experience and builds products that feel intuitive and delightful. A true collaborator.",
    rating: 5,
    avatar: "/avatar-ananya.png",
  },
]

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const radius = 280 // Radius of the circle
  const centerX = 0
  const centerY = 0

  return (
    <section id="reviews" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here's what friends, colleagues, and clients have to say about working with me and using my products.
          </p>
        </motion.div>

        {/* Circular Reviews Container */}
        <div className="relative flex items-center justify-center min-h-[600px] lg:min-h-[700px]">
          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute z-10 text-center bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-sm"
          >
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold font-space-grotesk mb-2 text-gradient">
              {reviews.length}+ Happy Collaborators
            </h3>
            <p className="text-muted-foreground">
              Building relationships through quality work and genuine collaboration.
            </p>
          </motion.div>

          {/* Rotating Reviews */}
          <div className="relative w-full h-full">
            {reviews.map((review, index) => {
              const angle = (index * 360) / reviews.length
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={review.id}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    x: centerX,
                    y: centerY,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={
                    isInView
                      ? {
                          x: x - 150, // Offset for card width
                          y: y - 100, // Offset for card height
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {/* Rotating Animation */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 60, // 60 seconds for full rotation
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: `${150 - x}px ${100 - y}px`, // Rotate around center
                    }}
                  >
                    <Card className="w-80 group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <CardContent className="p-6">
                        {/* Quote Icon */}
                        <div className="flex justify-between items-start mb-4">
                          <Quote className="w-6 h-6 text-purple-500/30 group-hover:text-purple-500/50 transition-colors" />

                          {/* Rating Stars */}
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>

                        {/* Review Content */}
                        <blockquote className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-4">
                          "{review.content}"
                        </blockquote>

                        {/* Reviewer Info */}
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-sm">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="font-semibold text-sm">{review.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {review.role} at {review.company}
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          initial={false}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <span className="text-lg font-medium">Want to work together?</span>
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
              🤝
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
