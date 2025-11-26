'use client';

import { useEffect, useState } from 'react';
import { projectApi, aiApi } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      const response = await projectApi.getOne(params.id as string);
      setProject(response.data);
    } catch (error) {
      console.error('Failed to load project', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStructure = async () => {
    if (!project) return;
    
    const goals = prompt('Enter business goals:');
    if (!goals) return;

    try {
      const response = await aiApi.generateStructure({
        businessGoals: goals,
        projectId: project.id,
      });
      alert('Structure generated! Check console for details.');
      console.log(response.data);
    } catch (error) {
      alert('Failed to generate structure');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!project) return <div className="p-8">Project not found</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{project.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <p className="text-gray-600">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2">
              Pages: {project.generatedPages?.length || 0}
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Actions</h2>
            <button
              onClick={generateStructure}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Generate Site Structure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}