import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from '@entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseDto } from '@dto/house.dto';
import { RoomDto } from '@dto/room.dto';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room, 'smartHome')
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(roomDto: RoomDto, houseDto: HouseDto): Promise<Room> {
    const room = this.roomRepository.create({ ...roomDto, house: houseDto });
    return (await this.roomRepository.save(room)) as Room;
  }

  async findAllRooms(id: number): Promise<Room[]> {
    return (await this.roomRepository.find({
      where: { house: { id } },
      relations: ['house', 'devices'],
    })) as Room[];
  }

  async findOneRoom(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['devices', 'house'],
    });
  }

  async updateRoom(id: number, houseId: number, name: string): Promise<Room> {
    await this.roomRepository.update({ id, house: { id: houseId } }, { name });
    return await this.roomRepository.findOne({
      where: { id, house: { id: houseId } },
      relations: ['devices', 'house'],
    });
  }

  async removeRoom(id: number): Promise<void> {
    await this.roomRepository.delete({ id });
  }
}
