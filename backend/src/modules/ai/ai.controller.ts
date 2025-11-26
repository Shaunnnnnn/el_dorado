import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateStructureDto } from './dto/generate-structure.dto';
import { GenerateCopyDto } from './dto/generate-copy.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-site-structure')
  generateSiteStructure(@Body() dto: GenerateStructureDto) {
    return this.aiService.generateSiteStructure(dto);
  }

  @Post('generate-copy')
  generateCopy(@Body() dto: GenerateCopyDto) {
    return this.aiService.generateCopy(dto);
  }

  @Post('generate-components')
  generateComponents(@Body() body: { projectId: string }) {
    return this.aiService.generateComponents(body.projectId);
  }

  @Post('refine')
  refine(@Body() body: { projectId: string; feedback: string }) {
    return this.aiService.refine(body.projectId, body.feedback);
  }
}
