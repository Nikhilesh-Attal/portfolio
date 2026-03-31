"use client"
import { useState } from "react"

export default function ExperimentForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    // Form State - tags and techStack are strings here for easy input editing
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        workType: 'Full-time',
        technologies: '',
        responsibilities: '',
        certificateUrl: '',
    });

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // 1. Format payload to match Mongoose Schema exactly
            const experiencePayLoad = {
                role: formData.role,
                company: formData.company,
                duration: {
                    start: formData.startDate,
                    end: formData.endDate || null, // Allow null for ongoing experiences
                },
                workType: formData.workType,
                responsibilities: formData.responsibilities.split(',').map(item => item.trim()).filter(Boolean), // Convert comma-separated string to array
                technologies: formData.technologies.split(',').map(item => item.trim()).filter(Boolean), // Convert comma-separated string to array
                certificateUrl: formData.certificateUrl.split(',').map(item => item.trim()).filter(Boolean),
            };

            // 2. Send to backend
            const response = await fetch('http://localhost:5000/api/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Uncomment when ready
                },
                body: JSON.stringify(experiencePayLoad),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create experience");
            }

            setMessage('Experience created successfully!');
            
            // Reset Form
            setFormData({
                role: '',
                company: '',
                startDate: '',
                endDate: '',
                workType: 'Full-time',
                technologies: '',
                responsibilities: '',
                certificateUrl: '',
            });

        } catch (error: any) {
            console.error("Submission Error:", error);
            setMessage(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-6">Add New Experience</h2>

            {message && (
                <div className={`p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input type="text" name="role" required value={formData.role} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white bg-white rounded-md p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Company</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white bg-white rounded-md p-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Start Date</label>
                    <input type="date" name="startDate" required value={formData.startDate} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white bg-white rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white bg-white rounded-md p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Work Type</label>
                    <select name="workType" value={formData.workType} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2">
                        <option value="Full-time">Full Time</option>
                        <option value="Part-time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Work From Home">Work From Home</option>
                    </select>
            </div>

            <div>
                <label className="block text-sm font-medium">Technologies (comma separated)</label>
                <input name="technologies" required type="text" placeholder="React, Node.js" value={formData.technologies} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium">Responsibilities</label>
                <textarea rows={10} name="responsibilities" required value={formData.responsibilities} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Certificate URL (comma separated)</label>
                    <input type="url" name="certificateUrl" value={formData.certificateUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                {loading ? 'Processing...' : 'Save Experience'}
            </button>
        </form>
    );
}