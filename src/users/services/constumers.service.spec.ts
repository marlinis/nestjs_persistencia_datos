import { Test, TestingModule } from '@nestjs/testing';
import { ConstumersService } from './constumers.service';

describe('ConstumersService', () => {
  let service: ConstumersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstumersService],
    }).compile();

    service = module.get<ConstumersService>(ConstumersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
