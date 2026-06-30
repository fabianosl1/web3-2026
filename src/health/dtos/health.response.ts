import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus } from '../enums/health-status.enum';
import { HealthComponentResponse } from './health-component.response';

export class HealthResponse {
  @ApiProperty({ description: 'status do serviço' })
  status: HealthStatus;

  @ApiProperty({
    description: 'status dos componentes',
    type: [HealthComponentResponse],
  })
  components: HealthComponentResponse[];
}
