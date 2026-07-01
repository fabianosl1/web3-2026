import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { IntegralizacoesService } from './integralizacao.service';

import { CreateIntegralizacaoDto } from './dto/create-integralizacao.dto';
import { UpdateIntegralizacaoDto } from './dto/update-integralizacao.dto';

import { CurrentUser } from 'src/auth/decorators/current-user.decorrator';
import { User } from 'src/auth/entities/user';
import { CreateArquivoDto } from 'src/arquivos/dto/create-arquivo.dto';
import { ArquivoResponse } from 'src/arquivos/dto/arquivo.response';

@ApiTags('Integralizações')
@Controller('integralizacoes')
export class IntegralizacoesController {
  constructor(
    private readonly integralizacoesService: IntegralizacoesService,
  ) {}

  @ApiOperation({
    summary: 'Cadastrar uma nova solicitação de integralização',
  })
  @ApiCreatedResponse({
    description: 'Solicitação criada com sucesso.',
  })
  @Post()
  create(
    @Body() createIntegralizacaoDto: CreateIntegralizacaoDto,
    @CurrentUser() user: User,
  ) {
    return this.integralizacoesService.create(createIntegralizacaoDto, user);
  }

  @ApiOperation({
    summary: 'Anexar um arquivo (conteúdo em base64) a uma integralização',
  })
  @ApiCreatedResponse({
    description: 'Arquivo anexado com sucesso.',
    type: ArquivoResponse,
  })
  @Post(':id/arquivo')
  async anexarArquivo(
    @Param('id') id: string,
    @Body() createArquivoDto: CreateArquivoDto,
    @CurrentUser() user: User,
  ): Promise<ArquivoResponse> {
    const arquivo = await this.integralizacoesService.anexarArquivo(
      id,
      createArquivoDto,
      user,
    );
    return ArquivoResponse.fromEntity(arquivo);
  }

  @ApiOperation({
    summary: 'Listar integralizações',
  })
  @ApiOkResponse({
    description: 'Lista retornada com sucesso.',
  })
  @Get()
  findAll() {
    return this.integralizacoesService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar integralização por ID',
  })
  @ApiOkResponse({
    description: 'Integralização encontrada.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.integralizacoesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar integralização',
  })
  @ApiOkResponse({
    description: 'Integralização atualizada.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateIntegralizacaoDto: UpdateIntegralizacaoDto,
  ) {
    return this.integralizacoesService.update(id, updateIntegralizacaoDto);
  }
}
