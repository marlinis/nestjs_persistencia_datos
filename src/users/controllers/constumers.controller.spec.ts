import { Test, TestingModule } from '@nestjs/testing';
import { ConstumersController } from './constumers.controller';

describe('ConstumersController', () => {
  let controller: ConstumersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstumersController],
    }).compile();

    controller = module.get<ConstumersController>(ConstumersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
