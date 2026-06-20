import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({ description: 'status do serviço' })
  status: 'ok' | 'partial';
}
