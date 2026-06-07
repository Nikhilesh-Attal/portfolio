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
    // New States for Image Management
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
        status: 'completed',
        videoUrl: '',
    });

    // Safely parse URL
    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, "");

    useEffect(() => {
        if(initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
                techStack: Array.isArray(initialData.techStack) ? initialData.techStack.join(', ') : '',
            });
            // Load existing images if editing
            setExistingImages(initialData.images || []);
        }
    }, [initialData]);

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            
            // Validate total count (Existing + Currently Staged + Newly Selected)
            if (existingImages.length + imageFiles.length + filesArray.length > 3) {
                alert("You can only have up to 3 images per project.");
                e.target.value = ""; // Clear input
                return;
            }
            
            const updatedFiles = [...imageFiles, ...filesArray];
            setImageFiles(updatedFiles);
            
            // Create preview URLs for the UI
            setNewImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
        }
    };

    // Remove an image that is already saved in the database
    const removeExistingImage = (indexToRemove: number) => {
        setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // Remove an image that is staged for upload
    const removeNewImage = (indexToRemove: number) => {
        const updatedFiles = imageFiles.filter((_, index) => index !== indexToRemove);
        setImageFiles(updatedFiles);
        setNewImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation before sending
        if (existingImages.length + imageFiles.length === 0) {
            setMessage("At least one image is required.");
            return;
        }

        setLoading(true);
        setMessage("");

        const isEdit = !!initialData?._id;
        const url = isEdit
            ? `${API_BASE}/api/projects/${initialData._id}`
            : `${API_BASE}/api/projects`;

        try {
            // Convert new files to Base64
            const base64Images = await Promise.all(
                imageFiles.map(convertToBase64)
            );

            // Create payload: Combine old kept URLs with new Base64 strings
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

                images: [...existingImages, ...base64Images],
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

            const contentType = response.headers.get("content-type");
            let data: any = {};
            
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else if (!response.ok) {
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

    const totalImages = existingImages.length + imageFiles.length;

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

            {/* --- NEW IMAGE MANAGER UI --- */}
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-gray-900">Project Images</label>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {totalImages} / 3 Uploaded
                    </span>
                </div>
                
                {/* Image Gallery */}
                {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                    <div className="flex gap-4 mb-4 flex-wrap">
                        {/* 1. Render Existing Database Images */}
                        {existingImages.map((imgUrl, index) => (
                            <div key={`existing-${index}`} className="relative w-24 h-24 border-2 border-gray-200 rounded-md overflow-hidden bg-white group">
                                <img src={imgUrl} alt="Existing" className="object-cover w-full h-full" />
                                <button 
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete image"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {/* 2. Render New Upload Previews */}
                        {newImagePreviews.map((preview, index) => (
                            <div key={`new-${index}`} className="relative w-24 h-24 border-2 border-blue-400 border-dashed rounded-md overflow-hidden bg-blue-50 group">
                                <img src={preview} alt="New Preview" className="object-cover w-full h-full opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20 pointer-events-none">
                                    <span className="text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded">NEW</span>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove draft image"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* File Input (Only visible if limit is not reached) */}
                {totalImages < 3 && (
                    <input 
                        type="file" 
                        accept="image/*" 
                        required={totalImages === 0} 
                        multiple 
                        onChange={handleImageChange} 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                    />
                )}
                {totalImages >= 3 && (
                    <p className="text-sm text-orange-600 font-medium mt-2">Maximum of 3 images reached. Delete an image to upload a new one.</p>
                )}
            </div>
            {/* --- END IMAGE MANAGER UI --- */}

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