"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"

// Interface matching your Admin Dashboard / Backend
export interface Project {
    _id: string;
    category: string;
    title: string;
    description: string;
    shortDescription: string;
    images: string[];
    liveUrl: string;
    githubUrl: string;
    tags: string[];
    techStack: string[];
    status: string;
    videoUrl?: string;
    isPinned?: boolean;
}

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    
    // State Management
    const [allProjects, setAllProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState("All")
    const [visibleCount, setVisibleCount] = useState(6)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [currentScreenshot, setCurrentScreenshot] = useState(0)

    // 1. Fetch Data from Backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/projects")
                if (!response.ok) throw new Error("Failed to fetch")
                const data = await response.json()
                
                // Sort by pinned status first
                const sorted = data.sort((a: Project, b: Project) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                setAllProjects(sorted)
                setFilteredProjects(sorted)
            } catch (error) {
                console.error("Error loading projects:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    // 2. Derive Unique Categories for Filter Bar
    const categories = useMemo(() => {
        const cats = allProjects.map(p => p.category)
        return ["All", ...Array.from(new Set(cats))]
    }, [allProjects])

    // 3. Handle Filtering
    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProjects(allProjects)
        } else {
            setFilteredProjects(allProjects.filter(p => p.category === activeFilter))
        }
        setVisibleCount(6) // Reset pagination on filter change
    }, [activeFilter, allProjects])

    const nextScreenshot = () => {
        if (selectedProject) {
            setCurrentScreenshot((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
        }
    }

    const prevScreenshot = () => {
        if (selectedProject) {
            setCurrentScreenshot((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
        }
    }

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Fetching latest projects...</p>
            </div>
        )
    }

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">Featured Projects</h2>
                    
                    {/* Dynamic Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeFilter === cat ? "default" : "outline"}
                                onClick={() => setActiveFilter(cat)}
                                className="rounded-full capitalize px-6"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Project Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.slice(0, visibleCount).map((project, index) => (
                            <motion.div
                                layout
                                key={project._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 overflow-hidden h-full border-muted/50 bg-card/50 backdrop-blur-sm">
                                    <div className="relative h-48 overflow-hidden" onClick={() => { setSelectedProject(project); setCurrentScreenshot(0); }}>
                                        <Image
                                            src={project.images[0] || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            {project.isPinned && <Badge className="bg-amber-500 text-black border-none">Pinned</Badge>}
                                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
                                                {project.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-6" onClick={() => { setSelectedProject(project); setCurrentScreenshot(0); }}>
                                        <h3 className="text-xl font-bold mb-2 font-space-grotesk group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-[10px] font-normal uppercase tracking-wider">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {project.tags.length > 3 && <span className="text-[10px] text-muted-foreground">+{project.tags.length - 3} more</span>}
                                        </div>

                                        <div className="flex gap-3 mt-auto">
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl, "_blank"); }}>
                                                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Live
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, "_blank"); }}>
                                                <Github className="w-3.5 h-3.5 mr-1" /> Code
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProjects.length && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex justify-center mt-16"
                    >
                        <Button 
                            onClick={() => setVisibleCount(prev => prev + 6)} 
                            variant="outline"
                            size="lg"
                            className="px-10 py-6 text-lg rounded-full border-primary/20 hover:border-primary/50 transition-all"
                        >
                            Load More Projects
                        </Button>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No projects found in this category.</p>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-card border border-muted rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="p-6 border-b border-muted flex items-center justify-between bg-muted/20">
                                    <div>
                                        <h3 className="text-2xl font-bold font-space-grotesk">{selectedProject.title}</h3>
                                        <p className="text-sm text-primary">{selectedProject.category}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedProject(null)}>
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>

                                <div className="overflow-y-auto p-6 md:p-10">
                                    <div className="grid lg:grid-cols-2 gap-10">
                                        {/* Left: Gallery */}
                                        <div className="space-y-6">
                                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted group">
                                                <Image
                                                    src={selectedProject.images[currentScreenshot] || "/placeholder.svg"}
                                                    alt="Gallery"
                                                    fill
                                                    className="object-cover"
                                                />
                                                {selectedProject.images.length > 1 && (
                                                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={prevScreenshot}>
                                                            <ChevronLeft className="w-5 h-5" />
                                                        </Button>
                                                        <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={nextScreenshot}>
                                                            <ChevronRight className="w-5 h-5" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {selectedProject.images.length > 1 && (
                                                <div className="flex gap-3 overflow-x-auto pb-2">
                                                    {selectedProject.images.map((img, idx) => (
                                                        <button 
                                                            key={idx} 
                                                            onClick={() => setCurrentScreenshot(idx)}
                                                            className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${currentScreenshot === idx ? 'border-primary' : 'border-transparent opacity-50'}`}
                                                        >
                                                            <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Content */}
                                        <div className="flex flex-col">
                                            <div className="mb-8">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">The Overview</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {selectedProject.description}
                                                </p>
                                            </div>

                                            <div className="mb-8">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Core Tech Stack</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.techStack.map((tech) => (
                                                        <Badge key={tech} variant="secondary" className="px-3 py-1">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
                                                <Button size="lg" className="flex-1 text-lg py-7 rounded-xl shadow-lg shadow-primary/20" onClick={() => window.open(selectedProject.liveUrl, "_blank")}>
                                                    <ExternalLink className="w-5 h-5 mr-2" /> View Live Project
                                                </Button>
                                                <Button size="lg" variant="outline" className="flex-1 text-lg py-7 rounded-xl" onClick={() => window.open(selectedProject.githubUrl, "_blank")}>
                                                    <Github className="w-5 h-5 mr-2" /> Source Code
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}