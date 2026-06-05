"use client"

import React, { useState, useEffect } from "react"
import { FileText, UploadCloud, Loader2, ExternalLink } from "lucide-react"

export default function ResumeManager() {
  const [currentResume, setCurrentResume] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || ""
  const API_BASE = rawPort.replace(/\/$/, "")

  // Fetch the latest resume on load
  const fetchResume = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/api/resume`)
      if (response.ok) {
        const data = await response.json()
        setCurrentResume(data)
      }
    } catch (error) {
      console.error("Failed to fetch resume", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResume()
  }, [])

  // Handle the file upload
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.")

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", selectedFile) // 'file' matches your multer setup

      const response = await fetch(`${API_BASE}/api/resume`, {
        method: "POST",
        // Do NOT set Content-Type header manually when using FormData!
        body: formData, 
      })

      if (!response.ok) throw new Error("Upload failed")

      alert("Resume updated successfully!")
      setSelectedFile(null)
      fetchResume() // Refresh the view to show the new resume
    } catch (error) {
      console.error("Error uploading resume:", error)
      alert("Failed to upload resume.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="p-5 font-bold flex items-center gap-2"><Loader2 className="animate-spin" /> Loading Resume Data...</div>

  return (
    <div className="p-4 text-black font-sans max-w-2xl">
      <h2 className="mb-6 font-black text-2xl">Resume Management</h2>

      {/* Current Resume Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Current Active Resume</h3>
        {currentResume ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">resume.pdf</p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(currentResume.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
            <a 
              href={currentResume.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> View PDF
            </a>
          </div>
        ) : (
          <p className="text-gray-500">No resume found. Please upload one below.</p>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-colors hover:border-blue-500">
        <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Upload New Resume</h3>
        <p className="text-gray-500 mb-6">Uploading a new file will automatically replace the active resume on your portfolio.</p>
        
        <input 
          type="file" 
          accept="application/pdf"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        />

        <button 
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            !selectedFile || uploading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg"
          }`}
        >
          {uploading ? "Uploading to Cloud..." : "Upload & Update"}
        </button>
      </div>
    </div>
  )
}