import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipacoesService } from './participacoes.service';
import { ParticipacoesController } from './participacoes.controller';
import { Participacao } from './entities/participacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participacao])],
  controllers: [ParticipacoesController],
  providers: [ParticipacoesService],
  exports: [ParticipacoesService],
})
export class ParticipacoesModule {}
