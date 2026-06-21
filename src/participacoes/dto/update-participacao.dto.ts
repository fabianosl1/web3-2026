import { PartialType } from '@nestjs/swagger';
import { CreateParticipacaoDto } from './create-participacao.dto';

export class UpdateParticipacaoDto extends PartialType(CreateParticipacaoDto) {}
