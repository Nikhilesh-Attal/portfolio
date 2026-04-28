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

    const fetchProjects = async () => {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:5000/api/projects");
            if(!response.ok) throw new Error("failed to fetch projects");

            const data: Project[] = await response.json();

            //sort so pinned projects always apper at the top
            const sortedProject = data.sort((a, b) => {
                if(a.isPinned === b.isPinned) return 0;
                return a.isPinned ? -1 : 1;
            })
            setProjects(sortedProject);
        } catch (error: any) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if(!window.confirm("Are you confirm to delete this project?")) return;

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
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
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/projects/${project._id}`, {
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

    if(loading) return <div>Loading Projects</div>;
    if(error) return <div>Error: {error}</div>;

    return(
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Project Management</h2>

            {!isAddModelOpen && (
                <button onClick={() => { setEditingProject(null); setIsAddModelOpen(true); }}>
                    Add New Project
                </button>
            )}

            {isAddModelOpen ? (
                <ProjectForm initialData = {editingProject} 
                    onSucess = {() => { setIsAddModelOpen(false); fetchProjects(); }}
                    onancle = {() => setIsAddModelOpen(false)}
                />
            ) : (
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
                <thead>
                    <tr style={{backgroundColor: "navy", textAlign: "left"}}>
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
                            <tr key={project._id} style={{ borderBottom: '1px solid white'}}>

                                {/* Calculating continuous index across pages */}
                                <td style={tableCellStyle}>{indexOfFirstProject + index + 1}</td>
                                <td style={tableCellStyle}>
                                    <strong>{project.title}</strong>
                                    <br/>
                                    <small style={{ color: "white" }}>{project.shortDescription}</small>
                                </td>
                                <td style={tableCellStyle}>{project.category}</td>
                                <td style={tableCellStyle}>{project.status}</td>
                                <td style={tableCellStyle}>
                                    <button onClick={() => handleEdit(project._id)} style={{marginRight: '10px', cursor: 'pointer'}}>Edit</button>
                                    <button onClick={() => handleDelete(project._id)} style={{color: "red", cursor: 'pointer'}}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ): (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: "20px"}}>No Project Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{marginTop: '20px', display: 'flex', gap: '10px', alignItems:'center'}}>
                    <button disabled={currentPage === 1} onClick={() => paginate(currentPage -1)}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>

                    <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</button>
                </div>
            )}
        </div>
    );
};

const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid black'};
const tableCellStyle = { padding: '12px', borderBottom: '1px solid #ddd'};

export default ProjectTable;