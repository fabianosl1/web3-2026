import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({ description: 'status do serviço' })
  status: 'ok' | 'partial';

  @ApiProperty({ description: 'status do banco de dados' })
  database_status: 'ok' | 'down';

  @ApiProperty({ description: 'tempo de resposta do banco' })
  response_time: string;
}
