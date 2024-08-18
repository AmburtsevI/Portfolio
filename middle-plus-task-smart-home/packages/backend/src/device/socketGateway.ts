import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WebSocketGateway,
} from '@nestjs/websockets';
import { DeviceDto } from '@dto/device.dto';
import { DeviceService } from './device.service';
import { Logger } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
  },
})
export class SocketGateway implements OnModuleInit {
  constructor(private readonly deviceService: DeviceService) {}
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      Logger.log('connected', socket.id);
    });
  }

  @SubscribeMessage('update')
  async updateDevice(@MessageBody() deviceDto: DeviceDto) {
    const device = await this.deviceService.updateDevice(
      deviceDto.id,
      deviceDto,
    );

    this.server.emit('updated', device);
  }
}
