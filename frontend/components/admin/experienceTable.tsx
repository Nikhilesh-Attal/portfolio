"use client";

import React, { useEffect, useState } from "react";
import ExperienceForm from "@/components/admin/experienceForm";

export interface Experience {
    _id: string;
    role: string;
    company: string;

    duration: {
        start: string;
        end?: string;
    };

    workType: string;

    responsibilities: string[];
    technologies: string[];
    certificateUrl: string[];

    displayOrder: number;

    createdAt: string;
    updatedAt: string;
}

const ExperienceTable: React.FC = () => {

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const experiencePerPage = 10;

    // Safely pull the URL and remove any accidental trailing slashes from the .env file
    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, ""); 

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE}/api/experiences`);

            if (!response.ok) {
                throw new Error("Failed to fetch experiences");
            }

            const data: Experience[] = await response.json();

            // Sort by display order
            const sortedExperiences = data.sort(
                (a, b) => a.displayOrder - b.displayOrder
            );

            setExperiences(sortedExperiences);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this experience?")) {
            return;
        }

        try {
            // Check for both token names just in case
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE}/api/experiences/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json", // Explicitly added to prevent middleware rejections
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message || `Failed to delete experience (Status: ${response.status})`
                );
            }

            // Remove deleted item from UI directly
            setExperiences((prevExperiences) => 
                prevExperiences.filter((exp) => exp._id !== id)
            );

            // Edge case: If you delete the last item on a page, jump back one page
            if (currentExperiences.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

        } catch (error: any) {
            console.error("Delete error:", error);
            alert(`Error deleting experience: ${error.message}`);
        }
    };

    const handleEdit = (experience: Experience) => {
        setEditingExperience(experience);
        setIsAddModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingExperience(null);
        setIsAddModalOpen(true);
    };

    // Pagination logic
    const indexOfLastExperience = currentPage * experiencePerPage;
    const indexOfFirstExperience = indexOfLastExperience - experiencePerPage;

    const currentExperiences = experiences.slice(
        indexOfFirstExperience,
        indexOfLastExperience
    );

    const totalPages = Math.ceil(
        experiences.length / experiencePerPage
    );

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div style={{ padding: "20px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}>
                Loading Experiences...
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
                Experience Management
            </h2>

            {!isAddModalOpen && (
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={handleAddNew}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl leading-none mb-0.5">+</span>
                        Add New Experience
                    </button>
                </div>
            )}

            {isAddModalOpen ? (
                <ExperienceForm
                    initialData={editingExperience}
                    onSuccess={() => {
                        setIsAddModalOpen(false);
                        setEditingExperience(null);
                        fetchExperiences();
                    }}
                    onCancel={() => {
                        setIsAddModalOpen(false);
                        setEditingExperience(null);
                    }}
                />
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: "black" }}>
                    <thead>
                        <tr style={{ backgroundColor: "navy", textAlign: "left", color: "white" }}>
                            <th style={tableHeaderStyle}>#</th>
                            <th style={tableHeaderStyle}>Role</th>
                            <th style={tableHeaderStyle}>Duration</th>
                            <th style={tableHeaderStyle}>Work Type</th>
                            <th style={tableHeaderStyle}>Technologies</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentExperiences.length > 0 ? (
                            currentExperiences.map((experience, index) => (
                                <tr key={experience._id} className="border-b border-gray-200 hover:bg-gray-50">

                                    <td style={tableCellStyle} className="text-gray-900 font-bold">
                                        {indexOfFirstExperience + index + 1}
                                    </td>

                                    <td style={tableCellStyle}>
                                        <strong className="text-gray-900" style={{ fontSize: "1.05rem" }}>
                                            {experience.role}
                                        </strong>
                                        <br />
                                        <small className="text-gray-700 font-semibold">
                                            {experience.company}
                                        </small>
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        {new Date(experience.duration.start).toLocaleDateString()}
                                        {" - "}
                                        {experience.duration.end
                                            ? new Date(experience.duration.end).toLocaleDateString()
                                            : "Present"}
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        {experience.workType}
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        {experience.technologies.join(", ")}
                                    </td>

                                    <td style={tableCellStyle}>
                                        <button
                                            onClick={() => handleEdit(experience)}
                                            style={{ color: "#2563eb", marginRight: '10px', cursor: 'pointer', fontWeight: "bold", background: "none", border: "none" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(experience._id)}
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
                                    colSpan={6}
                                    style={{ textAlign: 'center', padding: "40px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}
                                >
                                    No Experience Found
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

export default ExperienceTable;