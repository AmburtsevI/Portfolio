import { HouseService } from './house.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { House } from '@entities/house.entity';
import { HouseDto } from '@dto/house.dto';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post('create')
  async createHome(@Body() houseDto: HouseDto): Promise<House> {
    return await this.houseService.createHome(houseDto);
  }

  @Get('findAll')
  async findAllHouses(): Promise<House[]> {
    return await this.houseService.findAllHouses();
  }

  @Get('findOne/:id')
  async findOneHouse(@Param('id') id: number): Promise<House> {
    return await this.houseService.findOneHouse(id);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.houseService.remove(id);
  }

  @Put('update/:id')
  async updateHouse(
    @Param('id') id: number,
    @Body() tagNew: string,
  ): Promise<House> {
    return await this.houseService.updateHouse(id, tagNew);
  }
}
