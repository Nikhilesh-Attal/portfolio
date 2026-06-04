"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // <-- Added this

import ProjectTable from "../project/page"
import ExperienceTable from "../experience/page"

import {
  FolderKanban,
  Briefcase,
  LayoutDashboard,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  
  // Added authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    
    if (!token) {
      // If no token exists, immediately redirect to your login page
      // (Change "/login" to "/" if your login is on your homepage)
      router.push("/login") 
    } else {
      // If token exists, reveal the dashboard
      setIsAuthenticated(true)
    }
  }, [router])

  const renderContent = () => {
    switch (activePage) {
      case "projects":
        return <ProjectTable />
      case "experience":
        return <ExperienceTable />
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold mb-4">
                Welcome Back 👋
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Manage your projects, experiences, portfolio content,
                and showcase your work professionally from one dashboard.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Projects Card */}
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

              {/* Experience Card */}
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
            </div>
          </div>
        )
    }
  }

  // Prevent a brief "flicker" of the dashboard before the redirect happens
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
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2">
            Portfolio Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {/* Dashboard */}
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

          {/* Projects */}
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

          {/* Experience */}
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 capitalize">
              {activePage}
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Manage and update your portfolio content.
            </p>
          </div>

          {/* Dynamic Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}