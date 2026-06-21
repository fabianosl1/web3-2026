import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER, type AuthProvider } from './auth.provider';

@Injectable()
export class AuthService {
  constructor(@Inject(PROVIDER) private readonly provider: AuthProvider) {}

  validate(token: string) {
    return this.provider.validate(token);
  }

  health() {
    return this.provider.health();
  }
}
