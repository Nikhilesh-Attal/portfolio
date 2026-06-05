"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Skill } from "./skillTable"; // Importing the interface from your table

interface SkillFormProps {
    initialData: Skill | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const CATEGORY_OPTIONS = [
    "Frontend", 
    "Backend", 
    "Automation", 
    "Generative AI", 
    "Database"
];

export default function SkillForm({ initialData, onSuccess, onCancel }: SkillFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, "");

    // Form State mapped to your Mongoose Schema
    const [formData, setFormData] = useState({
        name: "",
        category: "Frontend", // Default value
        proficiency: 60,      // Default value from schema
        displayOrder: 0
    });

    // Populate form if editing an existing skill
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                proficiency: initialData.proficiency,
                displayOrder: initialData.displayOrder || 0,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "proficiency" || name === "displayOrder" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            
            // Determine if we are creating or updating
            const isEditing = !!initialData;
            const url = isEditing 
                ? `${API_BASE}/api/skills/${initialData._id}` 
                : `${API_BASE}/api/skills`;
            
            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to save skill");
            }

            // Success! Trigger the callback to close modal and refresh table
            onSuccess();

        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                    {initialData ? "Edit Skill" : "Add New Skill"}
                </h3>
                <button 
                    onClick={onCancel}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="mx-6 mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Skill Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Skill Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., React, Node.js, Python"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Category *</label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                        >
                            {CATEGORY_OPTIONS.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Proficiency Slider */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-700">Proficiency (%) *</label>
                            <span className="text-2xl font-black text-blue-600">{formData.proficiency}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                name="proficiency"
                                min="0"
                                max="100"
                                value={formData.proficiency}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>

                    {/* Display Order */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Display Order</label>
                        <input
                            type="number"
                            name="displayOrder"
                            value={formData.displayOrder}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500">Lower numbers appear first in the list.</p>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                        ) : (
                            <><Save className="w-4 h-4" /> Save Skill</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}