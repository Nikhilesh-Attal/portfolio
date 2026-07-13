import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutWrapper from "@/components/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  // 1. Primary Keyword in Title
  title: "Nikhilesh Attal | AI Automation Engineer & Product Builder",
  
  // 2. Secondary Keywords woven into the Description
  description:
    "Portfolio of Nikhilesh Attal, an AI Automation Engineer and AI-Powered Product Builder. Specializing in n8n development, LLM API integration, and automated workflow architecture.",

  // 3. Cleaned and targeted Keyword Array
  keywords: [
    "Nikhilesh Attal",
    "AI Automation Engineer",
    "n8n developer",
    "AI-Powered Product Builder",
    "LLM API Integration",
    "Automated Workflow Architect",
    "Next.js",
    "Full-Stack AI Developer",
  ],

  authors: [{ name: "Nikhilesh Attal" }],
  creator: "Nikhilesh Attal",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikhilesh-attal-portfolio.vercel.app",
    title: "Nikhilesh Attal | AI Automation Engineer",
    description:
      "Portfolio of Nikhilesh Attal, an AI Automation Engineer and AI-Powered Product Builder. Specializing in n8n development, LLM API integration, and automated workflow architecture.",
    siteName: "Nikhilesh Attal Portfolio",
    // 4. Added OpenGraph Image for social sharing
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Nikhilesh Attal - AI Automation Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nikhilesh Attal | AI Automation Engineer",
    description:
      "Portfolio of Nikhilesh Attal, an AI Automation Engineer and AI-Powered Product Builder.",
    // 5. Added Twitter Card Image
    images: ["/og-image.jpg"], 
  },

  robots: {
    index: true,
    follow: true,
  },

  generator: "Next.js",

  verification: {
    google: "IxBW9TvP7CH7_s6NURRyFhZwn7JXtwjKBx0tkQAxNHM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen bg-background">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
            >
              Skip to main content
            </a>

            <LayoutWrapper>{children}</LayoutWrapper>

            <Toaster />
          </div>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-86P2ZFH57M"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-86P2ZFH57M');
          `}
        </Script>
      </body>
    </html>
  );
}