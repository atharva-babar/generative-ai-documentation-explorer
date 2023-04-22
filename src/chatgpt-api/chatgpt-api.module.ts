import { Module } from '@nestjs/common';
import { ChatgptApiController } from './chatgpt-api.controller';
import { ChatgptApiService } from './chatgpt-api.service';

@Module({
  controllers: [ChatgptApiController],
  providers: [ChatgptApiService],
})
export class ChatgptApiModule {}
