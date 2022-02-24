import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter(car => car.available === true);

    if (brand) {
      cars = cars.filter(car => brand && car.brand === brand);
    }

    if (categoryId) {
      cars = cars.filter(car => categoryId && car.categoryId === categoryId);
    }

    if (name) {
      cars = cars.filter(car => name && car.name === name);
    }

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }
}

export { CarsRepositoryInMemory };
