import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nikhilesh Attal - AI-Powered Full-Stack Indie Maker",
  description:
    "I build fast, honest products without waiting for permission. Full-stack developer specializing in AI automation, startup tools, and modern web applications.",
  keywords: [
    "Nikhilesh Attal",
    "Full Stack Developer",
    "AI Developer",
    "Indie Maker",
    "Startup",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Nikhilesh Attal" }],
  creator: "Nikhilesh Attal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikhilesh-attal.vercel.app",
    title: "Nikhilesh Attal - AI-Powered Full-Stack Indie Maker",
    description: "I build fast, honest products without waiting for permission.",
    siteName: "Nikhilesh Attal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhilesh Attal - AI-Powered Full-Stack Indie Maker",
    description: "I build fast, honest products without waiting for permission.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <div className="relative min-h-screen bg-background">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
            >
              Skip to main content
            </a>
            <Navbar />
            <div id="main-content">{children}</div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
