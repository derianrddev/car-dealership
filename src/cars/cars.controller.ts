import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dtos';

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
  createCar( @Body() createCarDto: CreateCarDto ) {
    return this.carsService.create(createCarDto);
  }
}
