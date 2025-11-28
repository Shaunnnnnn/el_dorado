import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// In-memory chat history (TODO: move to database)
const chatHistories = new Map<string, ChatMessage[]>();

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async sendMessage(userId: string, dto: SendMessageDto) {
    // Verify project ownership
    const project = await this.prisma.project.findFirst({
      where: { id: dto.projectId, ownerId: userId },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Get or create chat history
    const historyKey = `${userId}-${dto.projectId}`;
    if (!chatHistories.has(historyKey)) {
      chatHistories.set(historyKey, [
        {
          role: 'system',
          content: `You are a helpful website design assistant. You're helping the user refine their website project: "${project.name}". 
Business goals: ${project.businessGoals || 'Not specified yet'}

You can help with:
- Refining page structure and layout
- Improving copy and messaging
- Suggesting design changes
- Adding or removing sections
- Optimizing for conversions

Be conversational, helpful, and actionable. Provide specific suggestions.`,
          timestamp: new Date(),
        },
      ]);
    }

    const history = chatHistories.get(historyKey)!;

    // Add user message
    history.push({
      role: 'user',
      content: dto.message,
      timestamp: new Date(),
    });

    try {
      // Call Gemini
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
      });
      
      // Build conversation context (Gemini doesn't have system messages, so we prepend context)
      const systemContext = history.find(msg => msg.role === 'system')?.content || '';
      const conversationHistory = history
        .filter(msg => msg.role !== 'system')
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');
      
      const prompt = `${systemContext}\n\nConversation so far:\n${conversationHistory}\n\nUser: ${dto.message}\n\nAssistant:`;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const assistantMessage = response.text() || 'I apologize, I could not generate a response.';

      // Add assistant response
      history.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date(),
      });

      return {
        message: assistantMessage,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Gemini error:', error);
      const fallbackMessage = "I'm having trouble connecting right now. Could you try rephrasing your question?";
      
      history.push({
        role: 'assistant',
        content: fallbackMessage,
        timestamp: new Date(),
      });

      return {
        message: fallbackMessage,
        timestamp: new Date(),
      };
    }
  }

  async getChatHistory(userId: string, projectId: string) {
    const historyKey = `${userId}-${projectId}`;
    const history = chatHistories.get(historyKey) || [];
    
    // Filter out system messages for the user
    return history
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
  }

  async clearChatHistory(userId: string, projectId: string) {
    const historyKey = `${userId}-${projectId}`;
    chatHistories.delete(historyKey);
    return { message: 'Chat history cleared' };
  }
}
