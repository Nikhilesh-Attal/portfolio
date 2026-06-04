"use client";

import { TableHeader } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import ProjectForm from "@/components/admin/projectForm";

export interface Project {
    _id : string;
    category: string;
    title: string;
    description: string;
    shortDescription: string;
    images: string[];
    liveUrl: string[];
    githubUrl: string;
    tags: string[];
    techStack: string[];
    status: string;
    videoUrl: string;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    isPinned: boolean;
}

const ProjectTable: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const [currentPage, setcurrentPage] = useState<number>(1);
    const projectPerPage = 10;

    useEffect(() => {
        fetchProjects();
    }, []);

    // This will now use your live online URL from the .env file
    const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || "";

    const fetchProjects = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${PORT}/api/projects`);
            if(!response.ok) throw new Error("failed to fetch projects");

            const data: Project[] = await response.json();

            //sort so pinned projects always appear at the top
            const sortedProject = data.sort((a, b) => {
                if(a.isPinned === b.isPinned) return 0;
                return a.isPinned ? -1 : 1;
            })
            setProjects(sortedProject);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if(!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${PORT}/api/projects/${id}`, {
                method : "DELETE",
                headers: {
                    "Authorization" : `Bearer ${token}`,
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete project');
            }

            //remove the deleted project from the ui without refreshing
            setProjects(projects.filter((project) => project._id !== id));
        } catch (error: any) {
            setError(`Error deleting project: ${error.message}`);
        }
    };

    const handleTogglePin = async (project: Project) => {
        setProjects(projects.map(p => 
            p._id === project._id ? { ...p, isPinned: !p.isPinned } : p
        ).sort((a, b) => {
            if(a.isPinned === b.isPinned) return 0;
            return a.isPinned ? -1 : 1;
        }));

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${PORT}/api/projects/${project._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ isPinned: !project.isPinned }) // Toggle the current pin status
            });

            if(response.ok) fetchProjects();
        } catch (error) {
            console.error("Error toggling pin status");
            fetchProjects();
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsAddModelOpen(true);
    }
    
    //Pagination logic
    const indexOfLastProject = currentPage * projectPerPage;
    const indexOfFirstProject = indexOfLastProject - projectPerPage;

    //slice the array to get only the 10 items for the current page
    const currentProject = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectPerPage);

    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);

    if (loading) {
        return (
            <div style={{ padding: "20px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}>
                Loading Projects...
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

    return(
        <div style={{ padding: '10px', color: "black", fontFamily: 'sans-serif' }}>
            <h2 style={{ marginBottom: "20px", color: "black", fontWeight: "900" }}>
                Project Management
            </h2>

            {!isAddModelOpen && (
            <div className="mb-6 flex justify-end">
                <button 
                    onClick={() => { setEditingProject(null); setIsAddModelOpen(true); }}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl leading-none mb-0.5">+</span> 
                    Add New Project
                </button>
            </div>
            )}

            {isAddModelOpen ? (
                <ProjectForm initialData = {editingProject} 
                    onSuccess = {() => { setIsAddModelOpen(false); fetchProjects(); }}
                    onCancel = {() => setIsAddModelOpen(false)}
                />
            ) : (
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: "black"}}>
                <thead>
                    <tr style={{backgroundColor: "navy", textAlign: "left", color: "white"}}>
                        <th style={tableHeaderStyle}>#</th>
                        <th style={tableHeaderStyle}>Title</th>
                        <th style={tableHeaderStyle}>Category</th>
                        <th style={tableHeaderStyle}>Status</th>
                        <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentProject.length > 0 ? (
                        currentProject.map((project, index) => (
                            <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">

                                {/* Calculating continuous index across pages */}
                                <td style={tableCellStyle} className="text-gray-900 font-bold">
                                    {indexOfFirstProject + index + 1}
                                </td>
                                <td style={tableCellStyle}>
                                    <strong className="text-gray-900" style={{ fontSize: "1.05rem" }}>
                                        {project.title}
                                    </strong>
                                    <br/>
                                    <small className="text-gray-700 font-semibold">{project.shortDescription}</small>
                                </td>
                                <td className="text-gray-900 font-medium" style={tableCellStyle}>{project.category}</td>
                                <td className="text-gray-900 font-medium" style={tableCellStyle}>{project.status}</td>
                                <td style={tableCellStyle}>
                                    <button 
                                        onClick={() => handleTogglePin(project)} 
                                        style={{color: project.isPinned ? "#d97706" : "gray", marginRight: '10px', cursor: 'pointer', fontWeight: "bold", background: "none", border: "none"}}
                                    >
                                        {project.isPinned ? "Unpin" : "Pin"}
                                    </button>
                                    <button 
                                        onClick={() => handleEdit(project)} 
                                        style={{color: "#2563eb", marginRight: '10px', cursor: 'pointer', fontWeight: "bold", background: "none", border: "none"}}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(project._id)} 
                                        style={{color: "red", cursor: 'pointer', fontWeight: "bold", background: "none", border: "none"}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ): (
                        <tr>
                            <td 
                                colSpan={5} 
                                style={{ textAlign: 'center', padding: "40px", color: "black", fontWeight: "900", fontSize: "1.2rem"}}
                            >
                                No Project Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{marginTop: '20px', display: 'flex', gap: '10px', alignItems:'center', color: 'black', fontWeight: 'bold'}}>
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => paginate(currentPage -1)}
                        style={{ padding: "5px 10px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                    >
                        Previous
                    </button>
                    
                    <span>Page {currentPage} of {totalPages}</span>

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

const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid black'};
const tableCellStyle = { padding: '12px', borderBottom: '1px solid #ccc'};

export default ProjectTable;