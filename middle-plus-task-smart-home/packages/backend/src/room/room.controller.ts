import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { HouseService } from 'house/house.service';
import { RoomDto } from '@dto/room.dto';
import { Room } from '@entities/room.entity';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly houseService: HouseService,
  ) {}

  @Post('create')
  async createRoom(@Body() roomDto: RoomDto): Promise<Room> {
    const house = await this.houseService.findOneHouse(roomDto.houseId);
    return (await this.roomService.createRoom(roomDto, house)) as Room;
  }

  @Get('allinhouse/:id')
  async findAllRoomsInHouse(@Param('id') id: number): Promise<Room[]> {
    return (await this.roomService.findAllRooms(id)) as Room[];
  }

  @Get('findOne/:id')
  async findOneRoom(@Param('id') id: number): Promise<Room> {
    return (await this.roomService.findOneRoom(id)) as Room;
  }

  @Put('update/:id')
  async updateRoom(
    @Param('id') id: number,
    @Body() roomDto: RoomDto,
  ): Promise<Room> {
    const house = await this.houseService.findOneHouse(roomDto.houseId);
    return (await this.roomService.updateRoom(
      id,
      house.id,
      roomDto.name,
    )) as Room;
  }

  @Delete('delete/:id')
  async removeRoom(@Param('id') id: number): Promise<void> {
    await this.roomService.removeRoom(id);
  }
}
