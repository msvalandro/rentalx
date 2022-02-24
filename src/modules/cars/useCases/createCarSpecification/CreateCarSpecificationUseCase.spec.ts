import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Description',
      dailyRate: 100,
      licensePlate: 'ABC1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'Category ID',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification Name',
      description: 'Specification Description',
    });

    const specificationsId = [specification.id];

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(carWithSpecifications).toHaveProperty('specifications');
    expect(carWithSpecifications.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const carId = '1234';
      const specificationsId = ['5', '6', '7', '8'];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
