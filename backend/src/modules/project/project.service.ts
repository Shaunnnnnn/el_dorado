import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        businessGoals: createProjectDto.businessGoals,
        brandProfile: createProjectDto.brandProfile ? JSON.stringify(createProjectDto.brandProfile) : null,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
    });
    
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    
    return project;
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id, userId); // Check ownership
    
    return this.prisma.project.update({
      where: { id },
      data: {
        ...updateProjectDto,
        brandProfile: updateProjectDto.brandProfile ? JSON.stringify(updateProjectDto.brandProfile) : undefined,
        sitemap: updateProjectDto.sitemap ? JSON.stringify(updateProjectDto.sitemap) : undefined,
        generatedPages: updateProjectDto.generatedPages ? JSON.stringify(updateProjectDto.generatedPages) : undefined,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Check ownership
    
    await this.prisma.project.delete({
      where: { id },
    });
    
    return { message: 'Project deleted' };
  }
}
