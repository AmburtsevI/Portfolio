import { DeviceDto } from '@dto/device.dto';
import { RoomService } from './../room/room.service';
import { DeviceService } from './device.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly roomService: RoomService,
  ) {}

  @Post('create')
  async createDevice(@Body() deviceDto: DeviceDto) {
    const room = await this.roomService.findOneRoom(deviceDto.roomId);
    return await this.deviceService.createDevice(deviceDto, room);
  }

  @Post('createCustomDevice')
  async createCustomDevice(@Body() deviceDto: DeviceDto) {
    return await this.deviceService.createCustomDevice(deviceDto);
  }

  @Get('findAllCustomDevices')
  async getCustomDevices() {
    return await this.deviceService.getCustomDevices();
  }

  @Get('findAll/:id')
  async findAllDevices(@Param('id') id: number) {
    return await this.deviceService.findAllDevices(id);
  }

  @Get('findOne/:id')
  async findOneDevice(@Param('id') id: number) {
    return await this.deviceService.findOneDevice(id);
  }

  @Put('update/:id')
  async updateDevice(@Param('id') id: number, @Body() deviceDto: DeviceDto) {
    return await this.deviceService.updateDevice(id, deviceDto);
  }

  @Delete('delete/:id')
  async deleteDevice(@Param('id') id: number) {
    return await this.deviceService.deleteDevice(id);
  }
}
