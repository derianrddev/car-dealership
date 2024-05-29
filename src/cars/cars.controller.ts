import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Controller('cars')
@UsePipes( ValidationPipe )
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById( @Param('id', ParseUUIDPipe) id: string ): Car {
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar( @Body() createCarDto: CreateCarDto ): Car {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  updateCar( @Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto ): Car {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar( @Param('id', ParseUUIDPipe ) id: string ): void {
    return this.carsService.delete(id);
  }
}
