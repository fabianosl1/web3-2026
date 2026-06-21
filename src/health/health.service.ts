import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { HealthResponse } from './dtos/health.response';
import { AuthService } from 'src/auth/auth.service';
import { HealthComponentResponse } from './dtos/health-component.response';
import { HealthStatus } from './enums/health-status.enum';

@Injectable()
export class HealthService {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  async health(): Promise<HealthResponse> {
    const health = new HealthResponse();
    health.status = HealthStatus.OK;

    health.components = await Promise.all([
      this.checkDatabase(),
      this.checkAuth(),
    ]);

    if (health.components.find((c) => c.status == HealthStatus.DOWN)) {
      health.status = HealthStatus.DOWN;
    }

    return health;
  }

  private async checkDatabase(): Promise<HealthComponentResponse> {
    return check('database', async () => {
      try {
        await this.dataSource.query('SELECT 1');
        return HealthStatus.OK;
      } catch {
        return HealthStatus.DOWN;
      }
    });
  }

  private async checkAuth(): Promise<HealthComponentResponse> {
    return await check('auth', () => this.authService.health());
  }
}

const check = async (component: string, fn: () => Promise<HealthStatus>) => {
  const health = new HealthComponentResponse();
  health.component = component;
  const start = performance.now();

  health.status = await fn();

  const end = performance.now();
  health.response_time = `${Math.round(end - start)}ms`;

  return health;
};
