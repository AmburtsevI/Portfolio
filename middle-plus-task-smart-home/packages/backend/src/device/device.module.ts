import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '@entities/device.entity';
import { CustomDevice } from '@entities/customDevices.entity';
import { RoomService } from '../room/room.service';
import { Room } from '@entities/room.entity';
import { SocketGateway } from './socketGateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device, CustomDevice, Room], 'smartHome'),
  ],
  providers: [DeviceService, RoomService, SocketGateway],
  controllers: [DeviceController],
})
export class DeviceModule {}
