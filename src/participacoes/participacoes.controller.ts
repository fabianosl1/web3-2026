import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipacoesService } from './participacoes.service';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { UpdateParticipacaoDto } from './dto/update-participacao.dto';

@ApiTags('Participações')
@Controller('participacoes')
export class ParticipacoesController {
  constructor(private readonly participacoesService: ParticipacoesService) {}

  @ApiOperation({
  summary: 'Cadastrar uma nova participação',
  })
  @ApiCreatedResponse({
    description: 'Participação cadastrada com sucesso.',
  })
  @Post()
  create(
    @Body()
    createParticipacaoDto: CreateParticipacaoDto,
  ) {
    return this.participacoesService.create(createParticipacaoDto);
  }

  @Get()
  findAll() {
    return this.participacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participacoesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipacaoDto: UpdateParticipacaoDto,
  ) {
    return this.participacoesService.update(id, updateParticipacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participacoesService.remove(id);
  }
}