import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from '@entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([House], 'smartHome')],
  providers: [HouseService],
  controllers: [HouseController],
})
export class HouseModule {}
