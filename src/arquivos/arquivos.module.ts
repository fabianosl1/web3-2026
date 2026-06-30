import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivosService } from './arquivos.service';
import { ArquivosController } from './arquivos.controller';
import { Arquivo } from './entities/arquivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arquivo])],
  controllers: [ArquivosController],
  providers: [ArquivosService],
  exports: [ArquivosService],
})
export class ArquivosModule {}
