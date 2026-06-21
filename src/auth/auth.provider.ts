import { HealthStatus } from 'src/health/enums/health-status.enum';
import { User } from './entities/user';

export interface AuthProvider {
  validate(token: string): Promise<User>;
  health(): Promise<HealthStatus>;
}

export const PROVIDER = Symbol('PROVIDER');
