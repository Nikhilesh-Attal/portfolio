"use client";

import React, { useEffect, useState } from "react";
// Make sure to create this component next!
import SkillForm from "./skillForm";

export interface Skill {
    _id: string;
    category: string;
    name: string;
    proficiency: number;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}

const SkillTable: React.FC = () => {

    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const skillsPerPage = 10;

    // Safely pull the URL and remove any accidental trailing slashes from the .env file
    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, ""); 

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE}/api/skills`);

            if (!response.ok) {
                throw new Error("Failed to fetch skills");
            }

            const data: Skill[] = await response.json();

            // Sort by display order
            const sortedSkills = data.sort(
                (a, b) => a.displayOrder - b.displayOrder
            );

            setSkills(sortedSkills);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) {
            return;
        }

        try {
            // Check for both token names just in case
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/skills/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json", 
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message || `Failed to delete skill (Status: ${response.status})`
                );
            }

            // Remove deleted item from UI directly
            setSkills((prevSkills) => 
                prevSkills.filter((skill) => skill._id !== id)
            );

            // Edge case: If you delete the last item on a page, jump back one page
            if (currentSkills.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

        } catch (error: any) {
            console.error("Delete error:", error);
            alert(`Error deleting skill: ${error.message}`);
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setIsAddModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingSkill(null);
        setIsAddModalOpen(true);
    };

    // Pagination logic
    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;

    const currentSkills = skills.slice(
        indexOfFirstSkill,
        indexOfLastSkill
    );

    const totalPages = Math.ceil(
        skills.length / skillsPerPage
    );

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div style={{ padding: "20px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}>
                Loading Skills...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "20px", color: "#dc2626", fontWeight: "bold", fontSize: "1.1rem" }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '10px', color: "black", fontFamily: 'sans-serif' }}>
            <h2 style={{ marginBottom: "20px", color: "black", fontWeight: "900" }}>
                Skill Management
            </h2>

            {!isAddModalOpen && (
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={handleAddNew}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl leading-none mb-0.5">+</span>
                        Add New Skill
                    </button>
                </div>
            )}

            {isAddModalOpen ? (
                <SkillForm
                    initialData={editingSkill}
                    onSuccess={() => {
                        setIsAddModalOpen(false);
                        setEditingSkill(null);
                        fetchSkills();
                    }}
                    onCancel={() => {
                        setIsAddModalOpen(false);
                        setEditingSkill(null);
                    }}
                />
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: "black" }}>
                    <thead>
                        <tr style={{ backgroundColor: "navy", textAlign: "left", color: "white" }}>
                            <th style={tableHeaderStyle}>#</th>
                            <th style={tableHeaderStyle}>Skill Name</th>
                            <th style={tableHeaderStyle}>Category</th>
                            <th style={tableHeaderStyle}>Proficiency</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentSkills.length > 0 ? (
                            currentSkills.map((skill, index) => (
                                <tr key={skill._id} className="border-b border-gray-200 hover:bg-gray-50">

                                    <td style={tableCellStyle} className="text-gray-900 font-bold">
                                        {indexOfFirstSkill + index + 1}
                                    </td>

                                    <td style={tableCellStyle}>
                                        <strong className="text-gray-900" style={{ fontSize: "1.05rem" }}>
                                            {skill.name}
                                        </strong>
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                            {skill.category}
                                        </span>
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-600 rounded-full" 
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                            <span>{skill.proficiency}%</span>
                                        </div>
                                    </td>

                                    <td style={tableCellStyle}>
                                        <button
                                            onClick={() => handleEdit(skill)}
                                            style={{ color: "#2563eb", marginRight: '10px', cursor: 'pointer', fontWeight: "bold", background: "none", border: "none" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill._id)}
                                            style={{ color: "red", cursor: 'pointer', fontWeight: "bold", background: "none", border: "none" }}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    style={{ textAlign: 'center', padding: "40px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}
                                >
                                    No Skills Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center', color: 'black', fontWeight: 'bold' }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                        style={{ padding: "5px 10px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                        style={{ padding: "5px 10px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid black' };
const tableCellStyle = { padding: '12px', borderBottom: '1px solid #ccc' };

export default SkillTable;