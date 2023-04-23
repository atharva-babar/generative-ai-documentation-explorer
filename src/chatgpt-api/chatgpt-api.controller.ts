import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptApiService } from './chatgpt-api.service';

@Controller('chatgpt-api')
export class ChatgptApiController {
  constructor(private chatGptApiService: ChatgptApiService) {}
  @Post('/chat')
  async chat(@Body() body) {
    return this.chatGptApiService.chat(body.question, []);
  }
}
