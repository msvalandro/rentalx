import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      dailyRate: 100,
      licensePlate: 'ABC1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'Category ID',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existent license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name 1',
        description: 'Car Description 1',
        dailyRate: 100,
        licensePlate: 'ABC1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'Category ID',
      });

      await createCarUseCase.execute({
        name: 'Car Name 2',
        description: 'Car Description 2',
        dailyRate: 100,
        licensePlate: 'ABC1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'Category ID',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      dailyRate: 100,
      licensePlate: 'ABC1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'Category ID',
    });

    expect(car.available).toBe(true);
  });
});
