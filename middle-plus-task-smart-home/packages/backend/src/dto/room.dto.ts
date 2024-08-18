export class RoomDto {
  id: number;
  name: string;
  houseId: number;
  devices: Record<string, string | boolean | number>[];
}
