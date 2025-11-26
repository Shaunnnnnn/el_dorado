import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

// TODO: Replace with actual database
const projects: any[] = [];

@Injectable()
export class ProjectService {
  create(userId: string, createProjectDto: CreateProjectDto) {
    const project = {
      id: Date.now().toString(),
      ownerId: userId,
      ...createProjectDto,
      sitemap: {},
      generatedPages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projects.push(project);
    return project;
  }

  findAll(userId: string) {
    return projects.filter((p) => p.ownerId === userId);
  }

  findOne(id: string, userId: string) {
    const project = projects.find((p) => p.id === id && p.ownerId === userId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  update(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    const project = this.findOne(id, userId);
    Object.assign(project, updateProjectDto, { updatedAt: new Date() });
    return project;
  }

  remove(id: string, userId: string) {
    const index = projects.findIndex((p) => p.id === id && p.ownerId === userId);
    if (index === -1) {
      throw new NotFoundException('Project not found');
    }
    projects.splice(index, 1);
    return { message: 'Project deleted' };
  }
}
