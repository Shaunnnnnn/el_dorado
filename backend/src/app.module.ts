import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
