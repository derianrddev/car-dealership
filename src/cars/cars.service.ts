import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    /* {
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
    }, */
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOneById( id: string ): Car {
    const car = this.cars.find( car => car.id === id );
    if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
    
    return car;
  }

  create( createCarDto: CreateCarDto ): Car {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push(newCar);

    return newCar;
  }

  update( id: string, updateCarDto: UpdateCarDto ): Car {
    let carDB = this.findOneById( id );
        
    if( updateCarDto.id && updateCarDto.id !== id ) {
      throw new BadRequestException(`Route id and body id do not match`);
    }

    this.cars = this.cars.map( car => {
      if ( car.id === id ) {
        carDB = { ...carDB, ...updateCarDto, id }
        return carDB;
      }

      return car;
    });
    
    return carDB;
  }

  delete( id: string ): void {
    this.findOneById( id );
    this.cars = this.cars.filter( car => car.id !== id );
  }

  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
  }
}
