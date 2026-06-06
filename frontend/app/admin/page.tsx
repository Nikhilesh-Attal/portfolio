"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// IMPORTANT: Updated import paths! 
// Ensure you have created these files in your components directory.
import ProjectTable from "@/components/admin/projectTable"
import ExperienceTable from "@/components/admin/experienceTable"
import ResumeManager from "@/components/admin/resumeManager"
import {
  FolderKanban,
  Briefcase,
  LayoutDashboard, FileText,
} from "lucide-react"
import HackathonTable from "@/components/admin/hackathonTable"
import SkillTable from "@/components/admin/skillTable"
import ReviewTable from "@/components/admin/reviewTable"

export default function AdminDashboard() {
  const router = useRouter()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    
    if (!token) {
      router.push("/login") 
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const renderContent = () => {
    switch (activePage) {
      case "projects":
        return <ProjectTable />
      case "experience":
        return <ExperienceTable />
      case "hackathons":
        return <HackathonTable />
      case "resume":
        return <ResumeManager />
      case "skill":
        return <SkillTable />
      case "reviews":
        return <ReviewTable />

      default:
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold mb-4">
                Welcome Back 👋
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Manage your projects, experiences, portfolio content,
                and showcase your work professionally from one dashboard.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setActivePage("projects")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Manage Projects
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Add portfolio projects, screenshots, live URLs,
                  GitHub repositories, and showcase your technical work.
                </p>
              </button>

              <button
                onClick={() => setActivePage("experience")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Manage Experience
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Add internships, jobs, work experience,
                  certifications, and professional achievements.
                </p>
              </button>

              <button
                onClick={() => setActivePage("hackathons")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Manage Hackathons
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Add hackathons, competitions, and coding challenges
                  you've participated in.
                </p>
              </button>

              <button
                onClick={() => setActivePage("resume")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Manage Resume</h3>
                <p className="text-gray-500 leading-relaxed">
                  Upload and update your active PDF resume.
                </p>
              </button>

              <button
                onClick={() => setActivePage("skill")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Manage Skills</h3>
                <p className="text-gray-500 leading-relaxed">
                  Manage and add new skills to your portfolio.
                </p>
              </button>

              <button
                onClick={() => setActivePage("reviews")}
                className="group bg-white border border-gray-200 rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Manage Reviews</h3>
                <p className="text-gray-500 leading-relaxed">
                  Manage reviews on your portfolio by approving the reviews given by your friends and colleagues.
                </p>
              </button>
            </div>
          </div>
        )
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-medium tracking-wide">Authenticating...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col fixed h-screen">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2">
            Portfolio Management
          </p>
        </div>

        <nav className="space-y-3">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "dashboard"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("projects")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "projects"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <FolderKanban className="w-5 h-5" />
            Projects
          </button>

          <button
            onClick={() => setActivePage("experience")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "experience"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Experience
          </button>

          <button
            onClick={() => setActivePage("hackathons")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "hackathons"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Hackathons
          </button>

          <button
            onClick={() => setActivePage("resume")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "resume"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            Resume
          </button>

          <button
            onClick={() => setActivePage("skill")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "skill"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            Skills
          </button>

          <button
            onClick={() => setActivePage("reviews")}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activePage === "reviews"
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            Reviews
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 capitalize">
              {activePage}
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Manage and update your portfolio content.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}