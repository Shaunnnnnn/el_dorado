import { Injectable } from '@nestjs/common';
import { GenerateStructureDto } from './dto/generate-structure.dto';
import { GenerateCopyDto } from './dto/generate-copy.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async generateSiteStructure(dto: GenerateStructureDto) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `You are a website architect. Given business goals, generate a complete website structure with pages and sections. Return ONLY valid JSON with this structure:
{
  "sitemap": {
    "pages": [{"id": "string", "path": "string", "title": "string", "description": "string"}]
  },
  "sections": [{"pageId": "string", "type": "string", "order": number, "purpose": "string"}]
}

Business goals: ${dto.businessGoals}

Return ONLY the JSON, no markdown formatting or explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let content = response.text();
      
      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const parsed = JSON.parse(content);

      return {
        projectId: dto.projectId,
        ...parsed,
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      // Fallback to stub data
      return {
        projectId: dto.projectId,
        sitemap: {
          pages: [
            { id: 'home', path: '/', title: 'Home', description: 'Homepage' },
            { id: 'about', path: '/about', title: 'About', description: 'About us' },
            { id: 'contact', path: '/contact', title: 'Contact', description: 'Contact page' },
          ],
        },
        sections: [
          { pageId: 'home', type: 'hero', order: 1, purpose: 'Main hero section' },
          { pageId: 'home', type: 'features', order: 2, purpose: 'Feature showcase' },
          { pageId: 'home', type: 'cta', order: 3, purpose: 'Call to action' },
        ],
      };
    }
  }

  async generateCopy(dto: GenerateCopyDto) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `You are a professional copywriter. Generate compelling copy for website sections. Return ONLY valid JSON with this structure:
{
  "headline": "string",
  "subheadline": "string",
  "body": "string",
  "cta": "string"
}

Generate copy for a ${dto.sectionType} section on page ${dto.pageId}

Return ONLY the JSON, no markdown formatting or explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let content = response.text();
      
      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const parsed = JSON.parse(content);

      return {
        pageId: dto.pageId,
        sectionType: dto.sectionType,
        content: parsed,
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      return {
        pageId: dto.pageId,
        sectionType: dto.sectionType,
        content: {
          headline: 'AI Generated Headline',
          subheadline: 'AI Generated Subheadline',
          body: 'AI generated body content goes here.',
          cta: 'Get Started',
        },
      };
    }
  }

  async generateComponents(projectId: string) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `You are a React component generator. Generate modern, responsive React components using Tailwind CSS. Return ONLY valid JSON with this structure:
{
  "components": [{"id": "string", "type": "string", "code": "string", "description": "string"}]
}

Generate essential website components (navbar, hero, features, footer) for project ${projectId}

Return ONLY the JSON, no markdown formatting or explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let content = response.text();
      
      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const parsed = JSON.parse(content);

      return {
        projectId,
        ...parsed,
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      return {
        projectId,
        components: [
          { id: 'navbar', type: 'navigation', code: '// Navbar component', description: 'Navigation bar' },
          { id: 'footer', type: 'footer', code: '// Footer component', description: 'Footer section' },
        ],
      };
    }
  }

  async refine(projectId: string, feedback: string) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `You are a website improvement assistant. Analyze feedback and suggest specific improvements.

Project: ${projectId}
Feedback: ${feedback}

Provide actionable improvements.`;

      const result = await model.generateContent(prompt);
      const response = result.response;

      return {
        projectId,
        feedback,
        suggestions: response.text(),
        status: 'completed',
      };
    } catch (error) {
      console.error('Gemini error:', error);
      return {
        projectId,
        feedback,
        status: 'error',
        message: 'Failed to process refinement',
      };
    }
  }
}
