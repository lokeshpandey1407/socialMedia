import { Test, TestingModule } from '@nestjs/testing';
import { Comments } from './comments';

describe('Comments', () => {
  let provider: Comments;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Comments],
    }).compile();

    provider = module.get<Comments>(Comments);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
