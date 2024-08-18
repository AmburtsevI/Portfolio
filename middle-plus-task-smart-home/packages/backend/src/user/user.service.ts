import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '@dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'smartHome')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDto.password, salt);
    userDto.password = hash;
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async findUser(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async validate(userDto: UserDto) {
    const user = await this.findUser(userDto.username);
    if (!user) {
      return null;
    }
    const comparedPassword = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (comparedPassword) {
      return user;
    }

    return null;
  }
}
