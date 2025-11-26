import { IsString } from 'class-validator';

export class GenerateStructureDto {
  @IsString()
  businessGoals: string;

  @IsString()
  projectId: string;
}
