'use client';

import { useEffect, useState } from 'react';
import { projectApi, aiApi } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [businessGoals, setBusinessGoals] = useState('');
  const [generatedData, setGeneratedData] = useState<any>(null);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      const response = await projectApi.getOne(params.id as string);
      setProject(response.data);
      setBusinessGoals(response.data.businessGoals || '');
    } catch (error) {
      console.error('Failed to load project', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStructure = async () => {
    if (!businessGoals.trim()) {
      alert('Please enter business goals first');
      return;
    }

    setGenerating(true);
    try {
      const response = await aiApi.generateStructure({
        businessGoals,
        projectId: project.id,
      });
      setGeneratedData(response.data);
      setDialogOpen(false);
      
      // Update project with business goals
      await projectApi.update(project.id, { businessGoals });
      await loadProject();
    } catch (error) {
      alert('Failed to generate structure');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg">Project not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-2">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Overview of your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Business Goals</Label>
                <p className="text-sm text-gray-600 mt-1">
                  {project.businessGoals || 'Not set yet'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <p className="text-sm text-gray-600 mt-1">
                  {generatedData ? 'Structure Generated' : 'Ready to generate'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Generation</CardTitle>
              <CardDescription>Generate your website structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    🪄 Generate Site Structure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Website Structure</DialogTitle>
                    <DialogDescription>
                      Describe your business goals and let AI create your site structure
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="goals">Business Goals</Label>
                      <Input
                        id="goals"
                        placeholder="E.g., Sell handmade jewelry online with a focus on sustainability"
                        value={businessGoals}
                        onChange={(e) => setBusinessGoals(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={generateStructure} 
                      className="w-full"
                      disabled={generating}
                    >
                      {generating ? 'Generating...' : 'Generate Structure'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={() => router.push(`/chat?projectId=${project.id}`)}
              >
                💬 Open Vibe Coding Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {generatedData && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Structure</CardTitle>
              <CardDescription>AI-generated website structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Pages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {generatedData.sitemap?.pages?.map((page: any) => (
                      <div key={page.id} className="border rounded p-3">
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-gray-600">{page.path}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sections</h3>
                  <div className="space-y-2">
                    {generatedData.sections?.map((section: any, idx: number) => (
                      <div key={idx} className="border rounded p-3 text-sm">
                        <span className="font-medium">{section.type}</span> on{' '}
                        <span className="text-gray-600">{section.pageId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}