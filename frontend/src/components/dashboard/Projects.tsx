'use client';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

interface Project {
    id: number;
    name: string;
    description: string;
    owner_id: number;
    status: string;
    role: string;
    created_at: string;
    updated_at: string;
}

interface ProjectsResponse {
    success: boolean;
    projects: Project[];
    error?: string;
}

export function Projects() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only fetch projects if user is logged in
        if (user) {
            fetchUserProjects();
        }
    }, [user]);

    const fetchUserProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            
            const data: ProjectsResponse = await response.json();
            
            if (data.success) {
                setProjects(data.projects);
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-800 mb-4">Projects</h3>
            
            {loading ? (
                <p className="text-gray-600">Loading projects...</p>
            ) : error ? (
                <div className="text-red-500">
                    <p>Error: {error}</p>
                    <button 
                        onClick={fetchUserProjects}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        Try again
                    </button>
                </div>
            ) : projects.length === 0 ? (
                <>
                    <p className="text-gray-600 mb-4">You don't have any projects yet.</p>
                    <button className="text-indigo-600 font-medium hover:text-indigo-800">
                        Create your first project
                    </button>
                </>
            ) : (
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-4 rounded-md shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    project.role === 'owner' 
                                        ? 'bg-indigo-100 text-indigo-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {project.role}
                                </span>
                            </div>
                            <div className="mt-3 flex text-xs text-gray-500">
                                <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <span>Status: {project.status}</span>
                            </div>
                        </div>
                    ))}
                    <button className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Create New Project
                    </button>
                </div>
            )}
        </div>
    );
}