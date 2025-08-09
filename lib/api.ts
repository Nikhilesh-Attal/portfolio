// Configuration for data source
const USE_EXTERNAL_API = false // Set to true when you have your API ready
const API_BASE_URL = "https://your-api-endpoint.com" // Replace with your actual API

// Types for external data
export interface Review {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  date: string
}

export interface ProjectData {
  id: string
  title: string
  description: string
  shortDescription: string
  image: string
  liveUrl: string
  githubUrl: string
  tags: string[]
  status: "Live" | "Open Source" | "In Development"
  screenshots: string[]
  caseStudy: string[]
  techStack: string[]
  featured: boolean
  createdAt: string
}

// Local fallback data
const localReviews: Review[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Full Stack Developer",
    company: "Tech Startup",
    content:
      "Nikhilesh is incredibly talented! His ability to integrate AI into real-world applications is outstanding. He built our entire automation pipeline in just 2 weeks.",
    rating: 5,
    avatar: "/avatar-arjun.png",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Product Manager",
    company: "SaaS Company",
    content:
      "Working with Nikhilesh was a game-changer. He doesn't just code - he thinks like a founder. His StartupHQ-AI platform saved us months of manual work.",
    rating: 5,
    avatar: "/avatar-priya.png",
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Rahul Gupta",
    role: "Indie Maker",
    company: "Freelancer",
    content:
      "Nikhilesh helped me automate my entire job application process. His ScrapJob tool is pure magic - it's like having a personal assistant that never sleeps!",
    rating: 5,
    avatar: "/avatar-rahul.png",
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Startup Founder",
    company: "EdTech Startup",
    content:
      "The KindLing platform Nikhilesh built is exactly what our community needed. His attention to user experience and real-time features is phenomenal.",
    rating: 5,
    avatar: "/avatar-sneha.png",
    date: "2023-12-28",
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Tech Lead",
    company: "AI Company",
    content:
      "Nikhilesh has this rare combination of technical depth and product thinking. He can take a complex AI concept and turn it into something users actually want to use.",
    rating: 5,
    avatar: "/avatar-vikram.png",
    date: "2023-12-20",
  },
  {
    id: "6",
    name: "Ananya Joshi",
    role: "UX Designer",
    company: "Design Agency",
    content:
      "I've worked with many developers, but Nikhilesh stands out. He actually cares about the user experience and builds products that feel intuitive and delightful.",
    rating: 5,
    avatar: "/avatar-ananya.png",
    date: "2023-12-15",
  },
]

const localProjects: ProjectData[] = [
  {
    id: "startuphq-ai",
    title: "StartupHQ-AI",
    description:
      "No-fluff AI-powered platform that helps non-technical founders go from raw idea to validated startup concept with investor-ready pitch decks.",
    shortDescription: "Next.js + Appwrite + Multi-AI → Startup validation & pitch deck generation",
    image: "/startup-hq-dashboard.png",
    liveUrl: "https://lnkd.in/gq5HG_RM",
    githubUrl: "https://github.com/nikhilesh-attal/startuphq-ai",
    tags: ["Next.js", "Appwrite", "OpenAI", "Tailwind CSS"],
    status: "Live",
    screenshots: ["/startup-hq-dashboard.png", "/pitch-deck-builder.png", "/idea-validation-engine.png"],
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
      "Claude 3",
      "DeepSeek",
      "Firebase Studio",
      "Vercel",
    ],
    featured: true,
    createdAt: "2024-01-01",
  },
  {
    id: "scrapjob",
    title: "ScrapJob - Automated Job Hunter",
    description:
      "Complete automated job scraping and resume enhancement system that finds relevant jobs and optimizes resumes with AI for better ATS compatibility.",
    shortDescription: "n8n + Python + Firebase + AI → Automated job hunting with resume optimization",
    image: "/job-scraper-dashboard.png",
    liveUrl: "https://lnkd.in/gKfDv8CQ",
    githubUrl: "https://github.com/nikhilesh-attal/scrapjob",
    tags: ["n8n", "Python", "Firebase", "OpenRouter AI"],
    status: "Live",
    screenshots: ["/job-scraper-dashboard.png", "/resume-enhancement-ai.png", "/job-tracking-system.png"],
    caseStudy: [
      "Automated job scraping from 5+ platforms (Internshala, Indeed, LinkedIn, etc.)",
      "Built intelligent data cleaning and merging pipeline using n8n workflows",
      "Integrated AI-powered resume enhancement with ATS compatibility checking",
      "Implemented real-time notifications via Google Sheets and Telegram API",
      "Deployed locally with Firebase backend for reliable data management",
    ],
    techStack: [
      "n8n",
      "Python",
      "BeautifulSoup",
      "Firebase",
      "Firebase Studio",
      "OpenRouter AI",
      "Google Sheets API",
      "Telegram API",
    ],
    featured: true,
    createdAt: "2023-12-01",
  },
  {
    id: "kindling",
    title: "KindLing - Light the Spark of Help",
    description:
      "Decentralized, real-time platform connecting those who need help with those who can offer it, based on location and empathy. Making kindness scalable through technology.",
    shortDescription: "React + Supabase + Geolocation → Real-time community help platform",
    image: "/kindling-help-platform.png",
    liveUrl: "https://lnkd.in/gbbupbuc",
    githubUrl: "https://github.com/nikhilesh-attal/kindling",
    tags: ["React", "Supabase", "Vite", "Tailwind CSS"],
    status: "Open Source",
    screenshots: ["/kindling-help-platform.png", "/location-based-matching.png", "/real-time-requests.png"],
    caseStudy: [
      "Created decentralized platform for instant help requests and offers",
      "Implemented geolocation-based matching for local community support",
      "Built real-time request tracking with Supabase for instant notifications",
      "Designed responsive interface for seamless mobile and desktop experience",
      "Open-sourced to encourage community-driven development and impact",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Supabase", "Geolocation API", "Real-time subscriptions", "Vercel"],
    featured: true,
    createdAt: "2023-11-01",
  },
]

// API functions
export async function fetchReviews(): Promise<Review[]> {
  if (!USE_EXTERNAL_API) {
    return localReviews
  }

  try {
    const response = await fetch(`${API_BASE_URL}/reviews`)
    if (!response.ok) throw new Error("Failed to fetch reviews")
    return await response.json()
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return localReviews // Fallback to local data
  }
}

export async function fetchProjects(): Promise<ProjectData[]> {
  if (!USE_EXTERNAL_API) {
    return localProjects
  }

  try {
    const response = await fetch(`${API_BASE_URL}/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return localProjects // Fallback to local data
  }
}

export async function fetchFeaturedProjects(): Promise<ProjectData[]> {
  const projects = await fetchProjects()
  return projects.filter((project) => project.featured)
}

// Admin functions (for when you build your admin panel)
export async function addProject(project: Omit<ProjectData, "id" | "createdAt">): Promise<ProjectData> {
  if (!USE_EXTERNAL_API) {
    throw new Error("External API not configured")
  }

  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  })

  if (!response.ok) throw new Error("Failed to add project")
  return await response.json()
}

export async function addReview(review: Omit<Review, "id" | "date">): Promise<Review> {
  if (!USE_EXTERNAL_API) {
    throw new Error("External API not configured")
  }

  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  })

  if (!response.ok) throw new Error("Failed to add review")
  return await response.json()
}
