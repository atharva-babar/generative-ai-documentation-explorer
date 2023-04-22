import { Test, TestingModule } from '@nestjs/testing';
import { ChatgptApiController } from './chatgpt-api.controller';

describe('ChatgptApiController', () => {
  let controller: ChatgptApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatgptApiController],
    }).compile();

    controller = module.get<ChatgptApiController>(ChatgptApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
