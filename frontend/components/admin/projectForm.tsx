"use client"
import { useState, useEffect } from "react"

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = (error) => reject(error);
    });
};

interface ProjectFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ProjectForm({ initialData, onSuccess, onCancel} : ProjectFormProps) {

    useEffect(() => {
        if(initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
                techStack: Array.isArray(initialData.techStack) ? initialData.techStack.join(', ') : '',
            });
        }
    }, [initialData]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    // Safely parse URL to avoid double slash issues leading to 404s/500s
    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, "");

    // Form State
    const [formData, setFormData] = useState({
        category: 'Web development',
        title: '',
        description: '',
        shortDescription: '',
        liveUrl: '',
        githubUrl: '',
        tags: '', 
        techStack: '',
        status: 'active',
        videoUrl: '',
    });

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length > 3) {
                alert("You can only upload up to 3 images.");
                e.target.value = ""; // Clear input
                return;
            }
            setImageFiles(filesArray);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        const isEdit = !!initialData?._id;

        const url = isEdit
            ? `${API_BASE}/api/projects/${initialData._id}`
            : `${API_BASE}/api/projects`;

        try {
            // Convert images
            const base64Images = await Promise.all(
                imageFiles.map(convertToBase64)
            );

            // Create payload
            const projectPayload = {
                ...formData,

                tags: formData.tags
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean),

                techStack: formData.techStack
                    .split(",")
                    .map(tech => tech.trim())
                    .filter(Boolean),

                images: base64Images,
            };

            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(projectPayload),
            });

            // PROTECT AGAINST HTML ERROR PAGES
            const contentType = response.headers.get("content-type");
            let data: any = {};
            
            // Only try to parse JSON if the server actually sent JSON
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else if (!response.ok) {
                // Catch the Vercel HTML crash page cleanly
                throw new Error(`Server error (${response.status}). The backend returned an invalid HTML response.`);
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to save project");
            }

            setMessage(
                isEdit
                    ? "Project updated successfully!"
                    : "Project created successfully!"
            );

            onSuccess();

        } catch (error: any) {
            console.error("Submission Error:", error);
            setMessage(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-black">
                {initialData ? "Edit Project" : "Add New Project"}
            </h2>

            {message && (
                <div className={`p-4 rounded font-bold ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-900">Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-900">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black">
                        <option value="Web development">Web Development</option>
                        <option value="Automation">Automation</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Short Description</label>
                <input name="shortDescription" required type="text" value={formData.shortDescription} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Description</label>
                <textarea rows={4} name="description" required value={formData.description} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-900">Live URL</label>
                    <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900">Github URL</label>
                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900">Video URL</label>
                    <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-900">Tags (comma separated)</label>
                    <input type="text" name="tags" placeholder="SaaS, AI, Hackathon" value={formData.tags} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900">Tech Stack (comma separated)</label>
                    <input type="text" name="techStack" required placeholder="React, Node.js" value={formData.techStack} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Project Images (1-3 images required)</label>
                <input type="file" accept="image/*" required={!initialData} multiple onChange={handleImageChange} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div className="flex gap-4 mt-6">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    {loading ? 'Processing...' : (initialData ? 'Update Project' : 'Save Project')}
                </button>
                
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={loading} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}