"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const qualities = [
  {
    emoji: "🚀",
    title: "Fast shipping",
    description: "From idea to production in weeks, not months",
  },
  {
    emoji: "🧠",
    title: "Honest thinking",
    description: "Clear communication, realistic timelines, no BS",
  },
  {
    emoji: "🔥",
    title: "Founder energy",
    description: "I care about your product like it's my own",
  },
  {
    emoji: "💪",
    title: "DSA-ready mindset",
    description: "Strong fundamentals meet practical problem-solving",
  },
]

export default function WhatIBring() {
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
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">What I Bring to the Table</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            More than just technical skills — I bring the mindset and energy that turns ideas into successful products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center group"
            >
              <motion.div
                className="relative inline-block mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-6xl mb-2 relative z-10">{quality.emoji}</div>

                {/* Particle burst effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      whileHover={{
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 60],
                        y: [0, (Math.random() - 0.5) * 60],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <h3 className="text-xl font-semibold mb-3 font-space-grotesk group-hover:text-gradient transition-colors duration-300">
                {quality.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{quality.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <span className="text-lg font-medium">Ready to build something amazing together?</span>
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
              ✨
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
