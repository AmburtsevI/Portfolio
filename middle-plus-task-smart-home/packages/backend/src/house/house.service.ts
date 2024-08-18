import { HouseDto } from './../dto/house.dto';
import { House } from '@entities/house.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House, 'smartHome')
    private readonly houseRepository: Repository<House>,
  ) {}

  async createHome(houseDto: HouseDto): Promise<House> {
    const house = this.houseRepository.create({ ...houseDto });
    return (await this.houseRepository.save(house)) as House;
  }

  async findAllHouses(): Promise<House[]> {
    return (await this.houseRepository.find()) as House[];
  }

  async findOneHouse(id: number): Promise<House> {
    return (await this.houseRepository.findOne({ where: { id } })) as House;
  }

  async remove(id: number): Promise<void> {
    await this.houseRepository.delete({ id });
  }

  async updateHouse(id: number, tagNew: string): Promise<House> {
    await this.houseRepository.update(id, { tag: tagNew });
    return (await this.houseRepository.findOne({
      where: { tag: tagNew },
    })) as House;
  }
}
