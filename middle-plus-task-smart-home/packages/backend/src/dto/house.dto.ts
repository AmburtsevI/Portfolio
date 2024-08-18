import { Room } from '@entities/room.entity';
export class HouseDto {
  id: number;
  tag: string;
  rooms: Room[];
  createdDate: Date;
  updatedDate: Date;
}
