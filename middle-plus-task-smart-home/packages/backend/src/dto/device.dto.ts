export class DeviceDto {
  id: number;
  name: string;
  type: string;
  params: Record<string, string | boolean | number>;
  roomId: number;
}
