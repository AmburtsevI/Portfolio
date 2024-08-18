import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '@dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Body() userDto: UserDto) {
    return this.userService.findUser(userDto.username);
  }
}
