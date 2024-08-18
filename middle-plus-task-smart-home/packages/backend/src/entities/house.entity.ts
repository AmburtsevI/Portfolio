import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('house')
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tag: string;

  @OneToMany(() => Room, (room) => room.house)
  rooms: Room[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
