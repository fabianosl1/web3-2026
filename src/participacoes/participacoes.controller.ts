import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParticipacoesService } from './participacoes.service';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { UpdateParticipacaoDto } from './dto/update-participacao.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorrator';
import { User } from 'src/auth/entities/user';
import { CreateArquivoDto } from 'src/arquivos/dto/create-arquivo.dto';
import { ArquivoResponse } from 'src/arquivos/dto/arquivo.response';

@ApiTags('Participações')
@Controller('participacoes')
export class ParticipacoesController {
  constructor(private readonly participacoesService: ParticipacoesService) {}

  @ApiOperation({ summary: 'Cadastrar uma nova participação' })
  @ApiCreatedResponse({
    description: 'Participação cadastrada com sucesso.',
  })
  @Post()
  create(
    @Body() createParticipacaoDto: CreateParticipacaoDto,
    @CurrentUser() user: User,
  ) {
    return this.participacoesService.create(createParticipacaoDto, user);
  }

  @ApiOperation({
    summary: 'Anexar um arquivo (conteúdo em base64) a uma participação',
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
    const arquivo = await this.participacoesService.anexarArquivo(
      id,
      createArquivoDto,
      user,
    );
    return ArquivoResponse.fromEntity(arquivo);
  }

  @ApiOperation({ summary: 'Listar participações cadastradas' })
  @ApiOkResponse({
    description: 'Lista de participações retornada com sucesso.',
  })
  @Get()
  findAll() {
    return this.participacoesService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma participação pelo ID' })
  @ApiOkResponse({
    description: 'Participação encontrada com sucesso.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participacoesService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar uma participação' })
  @ApiOkResponse({
    description: 'Participação atualizada com sucesso.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipacaoDto: UpdateParticipacaoDto,
  ) {
    return this.participacoesService.update(id, updateParticipacaoDto);
  }

  @ApiOperation({ summary: 'Desativar uma participação' })
  @ApiOkResponse({
    description: 'Participação desativada com sucesso.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participacoesService.remove(id);
  }
}
