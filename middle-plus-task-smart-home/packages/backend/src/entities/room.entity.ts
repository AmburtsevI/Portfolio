import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { House } from './house.entity';
import { Device } from './device.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => House, (house) => house.rooms)
  house: House;

  @OneToMany(() => Device, (device) => device.room)
  devices: Device[];
}
