import { HealthStatus } from 'src/health/enums/health-status.enum';
import { AuthProvider } from '../auth.provider';
import { User } from '../entities/user';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class MockAuthService implements AuthProvider {
  validate(token: string): Promise<User> {
    const user = new User();

    const [userId, role] = token.split(':');

    if (userId.trim() == '') {
      throw new UnauthorizedException();
    }

    user.id = userId;
    user.role = Role.ALUNO;

    if (role === 'comissao') {
      user.role = Role.COMISSAO;
    }

    return Promise.resolve(user);
  }

  health(): Promise<HealthStatus> {
    return Promise.resolve(HealthStatus.DOWN);
  }
}
