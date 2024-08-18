import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '@entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token, 'smartHome')
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async createToken(
    userId: number,
    accessToken: string,
    refreshToken: string,
  ): Promise<any> {
    const token = new Token();
    token.userId = userId;
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    await this.tokenRepository.save(token);
    return token;
  }

  async updateAccessToken(userId: number, accessToken: string): Promise<void> {
    await this.tokenRepository.update({ userId }, { accessToken });
  }

  async deleteTokens(userId: number): Promise<void> {
    await this.tokenRepository.delete({ userId });
  }
}
