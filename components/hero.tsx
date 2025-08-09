"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.3} speed={1.5} roughness={0.4} />
    </Sphere>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  )
}

/// Fixed Floating Bubbles Component
function FloatingBubbles() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    duration: number;
    delay: number;
  }>>([])

  useEffect(() => {
    // Set initial dimensions and add resize listener
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Generate bubbles only on client side
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
      setBubbles(newBubbles)
    }

    // Set initial dimensions and generate bubbles
    updateDimensions()
    generateBubbles()
    
    // Add event listener
    window.addEventListener('resize', updateDimensions)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Don't render anything until bubbles are generated (client-side only)
  if (bubbles.length === 0) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.initialX,
            top: bubble.initialY,
          }}
          animate={{
            x: [0, 100, -50, 150, 0],
            y: [0, -100, 50, -150, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            opacity: [0.3, 0.6, 0.2, 0.5, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-emerald-500/10" />

      {/* Floating Bubbles */}
      <FloatingBubbles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                I'm <span className="text-gradient">Nikhilesh Attal</span> — I Build{" "}
                <span className="text-gradient">Fast, Honest</span> Products —{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="block"
                >
                  Without Waiting for Permission
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              AI-powered full-stack indie maker crafting intelligent automation tools and startup solutions with
              Firebase, Supabase, and Appwrite. I turn complex problems into simple, elegant products that just work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              >
                Work with me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")} className="group">
                View projects
                <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50"
            >
              {[
                { number: "3+", label: "Products Built" },
                { number: "100%", label: "Open Source" },
                { number: "24/7", label: "AI Powered" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gradient font-space-grotesk">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Profile Image with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-96 lg:h-[500px] flex items-center justify-center"
          >
            {/* Main Profile Image Container */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Static Border (removed rotation) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 p-1">
                <div className="w-full h-full rounded-full bg-background p-4">
                  {/* Profile Image - Replace with your actual photo */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-6xl font-bold text-gradient border-4 border-border/20 relative overflow-hidden">
                    {/* Replace this with your actual image */}
                    <Image
                      src="./formal_photo.jpeg" // Add your photo here
                      alt="Nikhilesh Attal"
                      fill
                      className="rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image not found
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                    {/* Fallback initials */}
                    <span className="text-6xl font-bold text-gradient absolute inset-0 flex items-center justify-center">NA</span>
                  </div>
                </div>
              </div>

              {/* Floating Tech Icons */}
              {[
                { icon: "⚛️", position: { top: "10%", right: "10%" }, delay: 0 },
                { icon: "🔥", position: { top: "20%", left: "5%" }, delay: 0.5 },
                { icon: "🤖", position: { bottom: "15%", right: "5%" }, delay: 1 },
                { icon: "⚡", position: { bottom: "10%", left: "10%" }, delay: 1.5 },
                { icon: "🚀", position: { top: "50%", right: "-5%" }, delay: 2 },
                { icon: "🧠", position: { top: "50%", left: "-5%" }, delay: 2.5 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl border border-border/50 shadow-lg"
                  style={item.position}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay + 1, duration: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <motion.span
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: item.delay,
                    }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}