import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '@dto/user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(userDto);
    const { accessToken, refreshToken } = await this.authService.login(user);
    if (!accessToken && !refreshToken) {
      res.json({
        status: 0,
        message: 'Unauthorized',
      });
    }
    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({
      status: 1,
      message: {
        accessToken: accessToken,
        user: user,
      },
    });
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { refreshToken } = req.cookies;
    const tokens = await this.authService.refreshToken(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json(tokens.accessToken);
  }
}
