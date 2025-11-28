import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  sendMessage(@CurrentUser() user: any, @Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(user.userId, dto);
  }

  @Get('history/:projectId')
  getChatHistory(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.chatService.getChatHistory(user.userId, projectId);
  }

  @Delete('history/:projectId')
  clearChatHistory(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.chatService.clearChatHistory(user.userId, projectId);
  }
}
