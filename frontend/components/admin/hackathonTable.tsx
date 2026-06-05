"use client";

import React, { useEffect, useState } from "react";
// Assuming you have a form for hackathons similar to ExperienceForm
import HackathonForm from "@/components/admin/hackathonForm";

export interface Hackathon {
    _id: string;
    title: string;
    event: string;
    description: string;
    achievement: string;
    technologies: string[];
    links: string[];
    displayOrder: number;
    createdAt: string;
    member: number;
    role: string;
    duration: string;
}

const HackathonTable: React.FC = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const perPage = 10;

    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, ""); 

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/api/hackathons`);
            if (!response.ok) throw new Error("Failed to fetch hackathons");
            const data: Hackathon[] = await response.json();
            
            setHackathons(data.sort((a, b) => a.displayOrder - b.displayOrder));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this hackathon?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch(`${API_BASE}/api/hackathons/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete");
            setHackathons(prev => prev.filter(h => h._id !== id));
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleEdit = (hackathon: Hackathon) => {
        setEditingHackathon(hackathon);
        setIsAddModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingHackathon(null);
        setIsAddModalOpen(true);
    };

    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentList = hackathons.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(hackathons.length / perPage);

    if (loading) return <div className="p-5 font-bold">Loading Hackathons...</div>;
    if (error) return <div className="p-5 text-red-600 font-bold">Error: {error}</div>;

    return (
        <div className="p-4 text-black font-sans">
            <h2 className="mb-6 font-black text-2xl">Hackathon Management</h2>

            {!isAddModalOpen && (
                <div className="mb-6 flex justify-end">
                    <button onClick={handleAddNew} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700">
                        + Add New Hackathon
                    </button>
                </div>
            )}

            {isAddModalOpen ? (
                <HackathonForm
                    initialData={editingHackathon}
                    onSuccess={() => { setIsAddModalOpen(false); fetchHackathons(); }}
                    onCancel={() => setIsAddModalOpen(false)}
                />
            ) : (
                <table className="w-full border-collapse mt-4">
                    <thead>
                        <tr className="bg-navy text-white text-left">
                            <th style={tableHeaderStyle}>#</th>
                            <th style={tableHeaderStyle}>Title</th>
                            <th style={tableHeaderStyle}>Event</th>
                            <th style={tableHeaderStyle}>Team Size</th>
                            <th style={tableHeaderStyle}>Duration</th>
                            <th style={tableHeaderStyle}>Role</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map((h, index) => (
                            <tr key={h._id} className="border-b hover:bg-gray-50">
                                <td style={tableCellStyle}>{indexOfFirst + index + 1}</td>
                                <td style={tableCellStyle}>
                                    <div className="font-bold">{h.title}</div>
                                </td>
                                <td style={tableCellStyle}>{h.event}</td>
                                <td style={tableCellStyle}>{h.member}</td>
                                <td style={tableCellStyle}>{h.duration}</td>
                                <td style={tableCellStyle}>{h.role}</td>
                                <td style={tableCellStyle}>
                                    <button onClick={() => handleEdit(h)} className="text-blue-600 font-bold mr-4">Edit</button>
                                    <button onClick={() => handleDelete(h._id)} className="text-red-600 font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const tableHeaderStyle: React.CSSProperties = { padding: '12px', borderBottom: '2px solid black', backgroundColor: '#000080', color: 'white' };
const tableCellStyle: React.CSSProperties = { padding: '12px', borderBottom: '1px solid #ccc' };

export default HackathonTable;