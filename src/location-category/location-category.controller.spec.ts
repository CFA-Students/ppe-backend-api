import { Test, TestingModule } from '@nestjs/testing';
import { LocationCategoryController } from './location-category.controller';

describe('LocationCategoryController', () => {
  let controller: LocationCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationCategoryController],
    }).compile();

    controller = module.get<LocationCategoryController>(LocationCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
