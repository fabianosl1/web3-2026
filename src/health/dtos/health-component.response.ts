import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus } from '../enums/health-status.enum';

export class HealthComponentResponse {
  @ApiProperty({ description: 'nome do componente' })
  component: string;

  @ApiProperty({ description: 'status do componente' })
  status: HealthStatus;

  @ApiProperty({ description: 'tempo de resposta' })
  response_time: string;
}
