"use client"
import { useState, useEffect } from "react"

interface ExperienceFormProps {
    initialData?: any;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function ExperienceForm({
    initialData, onSuccess, onCancel }: ExperienceFormProps) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Safely parse URL to avoid double slash issues
    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, "");

    // Form State
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        workType: 'Full-time',
        technologies: '',
        responsibilities: '',
        certificateUrl: '',
        displayOrder: 0,
    });

    // Pre-fill form if we are in Edit Mode
    useEffect(() => {
        if (initialData) {
            setFormData({
                role: initialData.role || '',
                company: initialData.company || '',
                // Convert ISO dates to YYYY-MM-DD for the HTML date inputs
                startDate: initialData.duration?.start ? new Date(initialData.duration.start).toISOString().split('T')[0] : '',
                endDate: initialData.duration?.end ? new Date(initialData.duration.end).toISOString().split('T')[0] : '',
                workType: initialData.workType || 'Full-time',
                // Convert arrays back to strings for editing
                technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
                responsibilities: Array.isArray(initialData.responsibilities) ? initialData.responsibilities.join('\n') : '',
                certificateUrl: Array.isArray(initialData.certificateUrl) ? initialData.certificateUrl.join(', ') : '',
                displayOrder: initialData.displayOrder || 0,
            });
        }
    }, [initialData]);

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
                responsibilities: formData.responsibilities.split('\n').map(item => item.trim()).filter(Boolean),
                technologies: formData.technologies.split(',').map(item => item.trim()).filter(Boolean),
                certificateUrl: formData.certificateUrl.split(',').map(item => item.trim()).filter(Boolean),
                displayOrder: Number(formData.displayOrder) || 0,
            };

            const isEdit = !!initialData?._id;
            const url = isEdit
                ? `${API_BASE}/api/experiences/${initialData._id}`
                : `${API_BASE}/api/experiences`;

            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

            // 2. Send to backend
            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(experiencePayLoad),
            });

            // 3. PROTECT AGAINST HTML ERROR PAGES
            const contentType = response.headers.get("content-type");
            let data = {};
            
            // Only try to parse JSON if the server actually sent JSON
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else if (!response.ok) {
                // If the server crashed and sent HTML, throw a generic error
                throw new Error(`Server error (${response.status}). The backend returned an invalid response.`);
            }

            if (!response.ok) {
                throw new Error(data.message || `Failed to ${isEdit ? 'update' : 'create'} experience`);
            }

            setMessage(`Experience ${isEdit ? 'updated' : 'created'} successfully!`);

            // If a parent component provided an onSuccess callback, trigger it
            if (onSuccess) {
                onSuccess();
            }

            // Only clear the form if we are adding a new one
            if (!isEdit) {
                setFormData({
                    role: '',
                    company: '',
                    startDate: '',
                    endDate: '',
                    workType: 'Full-time',
                    technologies: '',
                    responsibilities: '',
                    certificateUrl: '',
                    displayOrder: 0,
                });
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            setMessage(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-black">
                {initialData ? "Edit Experience" : "Add New Experience"}
            </h2>

            {message && (
                <div className={`p-4 rounded font-bold ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-900">Role</label>
                    <input type="text" name="role" required value={formData.role} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900">Company</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-900">Start Date</label>
                    <input type="date" name="startDate" required value={formData.startDate} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900">End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Work Type</label>
                <select name="workType" value={formData.workType} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black">
                    <option value="Full-time">Full Time</option>
                    <option value="Part-time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Work From Home">Work From Home</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Technologies (comma separated)</label>
                <input name="technologies" required type="text" placeholder="React, Node.js" value={formData.technologies} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Responsibilities (each on a new line)</label>
                <textarea rows={6} name="responsibilities" required value={formData.responsibilities} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" placeholder="Built automation workflows&#10;Integrated APIs&#10;Optimized data processing" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Certificate URL (comma separated)</label>
                {/* Changed to text type because "url" type will throw HTML validation errors if it has commas */}
                <input type="text" name="certificateUrl" value={formData.certificateUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Display Order</label>
                <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChanges}
                    className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black"
                />
            </div>

            <div className="flex gap-4 mt-6">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    {loading ? 'Processing...' : (initialData ? 'Update Experience' : 'Save Experience')}
                </button>
                
                {/* Added Cancel Button to close the form without submitting */}
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={loading} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}