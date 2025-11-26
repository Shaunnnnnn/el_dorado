'use client';

import { useEffect, useState } from 'react';
import { projectApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectApi.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects', error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    const name = prompt('Project name:');
    if (!name) return;

    try {
      const response = await projectApi.create({ name });
      router.push(`/project/${response.data.id}`);
    } catch (error) {
      alert('Failed to create project');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => router.push(`/project/${project.id}`)}
              className="border rounded-lg p-6 hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No projects yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}