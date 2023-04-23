import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptApiModule } from './chatgpt-api/chatgpt-api.module';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [ChatgptApiModule, ConfigModule.forRoot(), UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
