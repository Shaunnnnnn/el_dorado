import { IsString } from 'class-validator';

export class GenerateCopyDto {
  @IsString()
  projectId: string;

  @IsString()
  pageId: string;

  @IsString()
  sectionType: string;
}
