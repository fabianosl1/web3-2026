import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from './dtos/health.response';

@ApiTags('Health')
@Controller('/health')
export class HealthController {
  @ApiOperation({
    description: 'Indica se o serviço está online ',
    summary: 'Status do serviço',
  })
  @ApiOkResponse({ type: HealthResponse })
  @Get()
  health() {
    const health = new HealthResponse();
    health.status = 'ok';
    return health;
  }
}
