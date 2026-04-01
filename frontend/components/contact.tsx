"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Github, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "nikhileshatal@gmail.com",
    href: "mailto:nikhileshatal@gmail.com",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/nikhilesh-attal",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Check out my code",
    href: "https://github.com/Nikhilesh-Attal",
    color: "from-gray-700 to-gray-900",
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const { toast } = useToast()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nikhileshatal@gmail.com")
      setCopiedEmail(true)
      toast({
        title: "Email copied!",
        description: "nikhileshatal@gmail.com has been copied to your clipboard.",
      })
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the email manually: nikhileshatal@gmail.com",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">Let's Build Something Great</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have an idea? Need a technical co-founder? Or just want to chat about AI and startups? I'm always excited to
            connect with fellow builders and innovators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${method.color} mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-semibold mb-2 font-space-grotesk">{method.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{method.value}</p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(method.href, "_blank")}
                        className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Open
                      </Button>

                      {method.label === "Email" && (
                        <Button variant="outline" size="sm" onClick={copyEmail} className="px-3 bg-transparent">
                          {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => window.open("mailto:nikhileshatal@gmail.com", "_blank")}
              className="group bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 text-white border-0 px-8 py-4 text-lg font-semibold relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start a conversation
                <Mail className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Confetti effect on click */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileTap={{ opacity: 1 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0, x: "50%", y: "50%" }}
                    whileTap={{
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 200],
                      y: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  />
                ))}
              </motion.div>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-muted-foreground mt-4"
          >
            Usually respond within 24 hours ⚡
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
          <p className="text-xs text-muted-foreground mt-2">© 2024 Nikhilesh Attal. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  )
}
