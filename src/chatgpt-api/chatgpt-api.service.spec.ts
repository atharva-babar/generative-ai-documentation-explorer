import { Test, TestingModule } from '@nestjs/testing';
import { ChatgptApiService } from './chatgpt-api.service';

describe('ChatgptApiService', () => {
  let service: ChatgptApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatgptApiService],
    }).compile();

    service = module.get<ChatgptApiService>(ChatgptApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
