import { ApiProperty } from '@nestjs/swagger';
import { Arquivo } from '../entities/arquivo.entity';

export class ArquivoResponse {
  @ApiProperty({ description: 'identificador do arquivo' })
  id: string;

  @ApiProperty({ description: 'nome do arquivo' })
  nome: string;

  @ApiProperty({ description: 'tipo MIME do arquivo' })
  mimeType: string;

  @ApiProperty({ description: 'tamanho do arquivo em bytes' })
  tamanho: number;

  @ApiProperty({ description: 'data de criação' })
  criadoEm: Date;

  static fromEntity(arquivo: Arquivo): ArquivoResponse {
    const response = new ArquivoResponse();
    response.id = arquivo.id;
    response.nome = arquivo.nome;
    response.mimeType = arquivo.mimeType;
    response.tamanho = arquivo.tamanho;
    response.criadoEm = arquivo.criadoEm;
    return response;
  }
}
