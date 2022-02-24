import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Available Cars', () => {
  beforeAll(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );

    await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 description',
      dailyRate: 100,
      licensePlate: 'ABC1234',
      fineAmount: 10,
      brand: 'Brand 1',
      categoryId: '1',
    });

    await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car 2 description',
      dailyRate: 200,
      licensePlate: 'DEF1234',
      fineAmount: 20,
      brand: 'Brand 2',
      categoryId: '2',
    });

    await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car 3 description',
      dailyRate: 300,
      licensePlate: 'ABC5678',
      fineAmount: 30,
      brand: 'Brand 3',
      categoryId: '3',
    });
  });

  it('should be able to list all available cars', async () => {
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(3);
  });

  it('should be able to list all available cars by brand', async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: 'Brand 1' });

    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars by name', async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: 'Car 2' });

    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars by categoryId', async () => {
    const cars = await listAvailableCarsUseCase.execute({ categoryId: '3' });

    expect(cars.length).toBe(1);
  });
});
