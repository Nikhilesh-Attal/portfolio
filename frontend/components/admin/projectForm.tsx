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

    // Form State - tags and techStack are strings here for easy input editing
    const [formData, setFormData] = useState({
        category: 'Web development', // Match schema case exactly
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

    const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT; // Added fallback just in case

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

        // Replaced hardcoded localhost:5000 with the PORT variable
        const url = isEdit
            ? `${PORT}/api/projects/${initialData._id}`
            : `${PORT}/api/projects`;

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

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },

                body: JSON.stringify(projectPayload),
            });

            const data = await response.json();

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

            console.error(error);

            setMessage(
                error.message || "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

            {message && (
                <div className={`p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white bg-white rounded-md p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2">
                        <option value="Web development">Web Development</option>
                        <option value="Automation">Automation</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Short Description</label>
                <input name="shortDescription" required type="text" value={formData.shortDescription} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea rows={4} name="description" required value={formData.description} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium">Live URL</label>
                    <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Github URL</label>
                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Video URL</label>
                    {/* Fixed bug here: value was previously formData.githubUrl */}
                    <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Tags (comma separated)</label>
                    <input type="text" name="tags" placeholder="SaaS, AI, Hackathon" value={formData.tags} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tech Stack (comma separated)</label>
                    <input type="text" name="techStack" required placeholder="React, Node.js" value={formData.techStack} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Project Images (1-3 images required)</label>
                <input type="file" accept="image/*" required multiple onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                {loading ? 'Processing...' : 'Save Project'}
            </button>
        </form>
    );
}