import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PROVIDER } from './auth.provider';
import { MockAuthService } from './providers/mock-auth.service';

@Module({
  providers: [
    AuthService,
    {
      provide: PROVIDER,
      useClass: MockAuthService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
