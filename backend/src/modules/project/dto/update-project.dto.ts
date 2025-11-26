import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  businessGoals?: string;

  @IsOptional()
  @IsObject()
  brandProfile?: Record<string, any>;

  @IsOptional()
  @IsObject()
  sitemap?: Record<string, any>;

  @IsOptional()
  generatedPages?: any[];
}
