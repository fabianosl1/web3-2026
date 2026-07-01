import { PartialType } from '@nestjs/swagger';
import { CreateIntegralizacaoDto } from './create-integralizacao.dto';

export class UpdateIntegralizacaoDto extends PartialType(
  CreateIntegralizacaoDto,
) {}
