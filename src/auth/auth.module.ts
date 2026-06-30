import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PROVIDER } from './auth.provider';
// import { MockAuthService } from './providers/mock-auth.service';
import { HttpModule } from '@nestjs/axios';
import { ApiAuthService } from './providers/api-auth.service';

@Module({
    imports: [HttpModule],
    providers: [
        AuthService,
        {
            provide: PROVIDER,
            useClass: ApiAuthService,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
