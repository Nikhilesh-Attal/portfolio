"use client"
import { useState, useEffect } from "react"
import { Button } from "../ui/button";

interface HackathonFormProps {
    initialData?: any;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function HackathonForm({ initialData, onSuccess, onCancel }: HackathonFormProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, "");

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        event: '',
        description: '',
        achievement: '',
        technologies: '',
        links: '',
        member: '',
        duration: '',
        role: '',
        displayOrder: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                event: initialData.event || '',
                description: initialData.description || '',
                achievement: initialData.achievement || '',
                technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
                links: Array.isArray(initialData.links) ? initialData.links.join(', ') : '',
                displayOrder: initialData.displayOrder || 0,
                member: initialData.member|| '',
                duration: initialData.duration || '',
                role: initialData.role || '',
            });
        }
    }, [initialData]);

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const payload = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                links: formData.links.split(',').map(l => l.trim()).filter(Boolean),
                displayOrder: Number(formData.displayOrder) || 0,
            };

            const isEdit = !!initialData?._id;
            const url = isEdit ? `${API_BASE}/api/hackathons/${initialData._id}` : `${API_BASE}/api/hackathons`;
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to save hackathon");

            setMessage(`Hackathon ${isEdit ? 'updated' : 'created'} successfully!`);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            setMessage(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-black">
                {initialData ? "Edit Hackathon" : "Add New Hackathon"}
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
                    <label className="block text-sm font-bold text-gray-900">Event</label>
                    <input type="text" name="event" required value={formData.event} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Description</label>
                <textarea rows={4} name="description" required value={formData.description} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Achievements</label>
                <textarea rows={3} name="achievement" value={formData.achievement} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Technologies (comma separated)</label>
                <input type="text" name="technologies" required value={formData.technologies} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Team Size</label>
                <input type="number" name="member" required value={formData.member} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Duration</label>
                <input type="text" name="duration" required value={formData.duration} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Role</label>
                <input type="text" name="role" required value={formData.role} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Links (comma separated)</label>
                <input type="text" name="links" value={formData.links} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-900">Display Order</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChanges} className="mt-1 block w-full border border-gray-400 bg-white rounded-md p-2 text-black" />
            </div>

            <div className="flex gap-4 mt-6">
                <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    {loading ? 'Processing...' : (initialData ? 'Update Hackathon' : 'Save Hackathon')}
                </Button>
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}