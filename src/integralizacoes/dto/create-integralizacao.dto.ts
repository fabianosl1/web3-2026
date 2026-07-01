import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateIntegralizacaoDto {
  @ApiProperty({
    example: 'c5db5c9d-f839-40d7-95ca-c918f66f4b4f',
  })
  @IsString()
  @IsNotEmpty()
  participacaoId: string;

  @ApiProperty({
    example: 40,
  })
  @IsInt()
  @Min(1)
  cargaHorariaReal: number;
}
