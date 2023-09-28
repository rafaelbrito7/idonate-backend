import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IJwtConfig {
  rt: string;
  at: string;
}

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get jwtSecrets(): IJwtConfig {
    return this.configService.get<IJwtConfig>('secrets.jwt');
  }
}
