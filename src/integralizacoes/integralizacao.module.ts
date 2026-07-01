import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegralizacoesService } from './integralizacao.service';
import { IntegralizacoesController } from './integralizacao.controller';

import { Integralizacao } from './entities/integralizacao.entity';

import { ParticipacoesModule } from '../participacoes/participacoes.module';
import { ArquivosModule } from '../arquivos/arquivos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integralizacao]),
    ParticipacoesModule,
    ArquivosModule,
  ],
  controllers: [IntegralizacoesController],
  providers: [IntegralizacoesService],
  exports: [IntegralizacoesService],
})
export class IntegralizacoesModule {}
