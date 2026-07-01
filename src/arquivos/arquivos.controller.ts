import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ArquivosService } from './arquivos.service';
import { ArquivoResponse } from './dto/arquivo.response';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly arquivosService: ArquivosService) {}

  @ApiOperation({ summary: 'Buscar os metadados de um arquivo pelo ID' })
  @ApiOkResponse({
    description: 'Arquivo encontrado com sucesso.',
    type: ArquivoResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArquivoResponse> {
    const arquivo = await this.arquivosService.findOne(id);
    return ArquivoResponse.fromEntity(arquivo);
  }

  @ApiOperation({ summary: 'Visualizar o conteúdo de um arquivo' })
  @ApiOkResponse({
    description: 'Conteúdo do arquivo retornado com sucesso.',
  })
  @Get(':id/visualizar')
  async visualizar(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const arquivo = await this.arquivosService.findOne(id);
    const buffer = Buffer.from(arquivo.conteudoBase64, 'base64');

    res.set({
      'Content-Type': arquivo.mimeType,
      'Content-Disposition': `inline; filename="${arquivo.nome}"`,
    });

    return new StreamableFile(buffer);
  }
}
