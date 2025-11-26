import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  businessGoals?: string;

  @IsOptional()
  @IsObject()
  brandProfile?: Record<string, any>;
}
