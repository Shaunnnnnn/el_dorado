import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { AiModule } from './modules/ai/ai.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ProjectModule, AiModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
