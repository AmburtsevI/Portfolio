import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '@dto/user.dto';
import { TokenService } from '../token/token.service';

interface JwtPayload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.userService.validate(userDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(userDto: UserDto) {
    const payload: JwtPayload = { username: userDto.username, sub: userDto.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    const tokens = await this.tokenService.createToken(
      userDto.id,
      access_token,
      refresh_token,
    );
    return tokens;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken) as JwtPayload;
      const user = await this.userService.findUser(payload.username);

      if (!user) {
        throw new UnauthorizedException();
      }

      await this.tokenService.updateAccessToken(user.id, refreshToken);

      return this.login(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
