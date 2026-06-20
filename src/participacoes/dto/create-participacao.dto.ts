import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateParticipacaoDto {
  @ApiProperty({
    example: 15,
    description: 'ID do aluno autenticado',
  })
  @IsInt()
  @IsPositive()
  alunoId: number;

  @ApiProperty({
    example: 'Curso de Informática Básica',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  titulo: string;

  @ApiProperty({
    example: 'Curso oferecido para a comunidade.',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    example: 'Preparar aulas, ministrar conteúdo e acompanhar alunos.',
  })
  @IsString()
  @IsNotEmpty()
  atribuicoesPrevistas: string;

  @ApiProperty({
    example: 40,
  })
  @IsInt()
  @Min(1)
  cargaHorariaPrevista: number;
}