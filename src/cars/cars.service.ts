import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corolla' 
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic' 
    },
    {
        id: uuid(),
        brand: 'Jeep',
        model: 'Cherokee' 
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOneById( id: string ): Car {
    const car = this.cars.find( car => car.id === id );
    if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
    
    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push(newCar);

    return newCar;
  }
}
