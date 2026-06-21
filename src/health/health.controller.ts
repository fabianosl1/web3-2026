import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from './dtos/health.response';
import { HealthService } from './health.service';
import { Public } from 'src/auth/decorators/public.decorrator';

@ApiTags('Health')
@Controller('/health')
@Public()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    description: 'Indica se o serviço está online ',
    summary: 'Status do serviço',
  })
  @ApiOkResponse({ type: HealthResponse })
  @Get()
  health() {
    return this.healthService.health();
  }
}
