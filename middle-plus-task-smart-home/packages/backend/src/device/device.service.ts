import { DeviceDto } from '@dto/device.dto';
import { CustomDevice } from '@entities/customDevices.entity';
import { Device } from '@entities/device.entity';
import { Room } from '@entities/room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device, 'smartHome')
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(CustomDevice, 'smartHome')
    private readonly customDeviceRepository: Repository<CustomDevice>,
  ) {}

  async createCustomDevice(deviceData: DeviceDto): Promise<CustomDevice> {
    const newDevice = this.customDeviceRepository.create({ ...deviceData });
    return (await this.customDeviceRepository.save(newDevice)) as CustomDevice;
  }

  async getCustomDevices(): Promise<CustomDevice[]> {
    return (await this.customDeviceRepository.find()) as CustomDevice[];
  }

  async createDevice(deviceData: DeviceDto, room: Room): Promise<Device> {
    const newDevice = this.deviceRepository.create({ ...deviceData, room });
    return (await this.deviceRepository.save(newDevice)) as Device;
  }

  async findAllDevices(id: number): Promise<Device[]> {
    return (await this.deviceRepository.find({
      where: { room: { house: { id } } },
      relations: ['room', 'room.house'],
    })) as Device[];
  }

  async findOneDevice(id: number): Promise<Device> {
    return (await this.deviceRepository.findOne({
      where: { id },
      relations: ['room'],
    })) as Device;
  }

  async updateDevice(id: number, deviceDto: DeviceDto): Promise<Device> {
    await this.deviceRepository.update({ id }, { ...deviceDto });
    return (await this.findOneDevice(deviceDto.id)) as Device;
  }

  async deleteDevice(id: number): Promise<void> {
    await this.deviceRepository.delete({ id });
  }
}
