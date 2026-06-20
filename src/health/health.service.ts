import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { HealthResponse } from './dtos/health.response';

@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async health(): Promise<HealthResponse> {
    const health = new HealthResponse();
    const start = performance.now();

    try {
      await this.dataSource.query('SELECT 1');
      health.status = 'ok';
      health.database_status = 'ok';
    } catch {
      health.status = 'partial';
      health.database_status = 'down';
    } finally {
      const end = performance.now();
      health.response_time = `${Math.round(end - start)}ms`;
    }

    return health;
  }
}
