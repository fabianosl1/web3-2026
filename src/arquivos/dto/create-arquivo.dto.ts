import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArquivoDto {
  @ApiProperty({ example: 'comprovante.pdf' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  mimeType: string;

  @ApiProperty({
    description: 'Conteúdo do arquivo codificado em base64',
    example: 'JVBERi0xLjQK...',
  })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  conteudoBase64: string;
}
