import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '@entities/room.entity';
import { House } from '@entities/house.entity';
import { HouseService } from 'house/house.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, House], 'smartHome')],
  providers: [RoomService, HouseService],
  controllers: [RoomController],
})
export class RoomModule {}
