"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Philosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="philosophy-heading">
      {/* Hidden heading for screen readers and SEO context */}
      <h2 id="philosophy-heading" className="sr-only">My Development Philosophy</h2>
      
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-emerald-500/5" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="m-0"
        >
          <motion.blockquote
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk leading-tight mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              "I don't just write code.{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            >
              I architect systems
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              , and AI is my partner in shipping{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="relative inline-block"
            >
              production-ready products faster
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </motion.span>
            ."
          </motion.blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            The focus isn't on writing everything from scratch—it's on solving real problems. By leveraging AI to accelerate development, I can focus entirely on scalable architecture, seamless user experiences, and delivering actual value through robust AI automation pipelines and full-stack applications.
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  )
}