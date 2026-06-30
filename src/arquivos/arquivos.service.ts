import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { Arquivo } from './entities/arquivo.entity';
import { User } from 'src/auth/entities/user';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(Arquivo)
    private readonly arquivosRepository: Repository<Arquivo>,
  ) {}

  async create(
    createArquivoDto: CreateArquivoDto,
    user: User,
  ): Promise<Arquivo> {
    const tamanho = Buffer.from(
      createArquivoDto.conteudoBase64,
      'base64',
    ).length;

    const arquivo = this.arquivosRepository.create({
      ...createArquivoDto,
      tamanho,
      proprietarioId: user.id,
    });

    return this.arquivosRepository.save(arquivo);
  }

  async findOne(id: string): Promise<Arquivo> {
    const arquivo = await this.arquivosRepository.findOne({
      where: { id },
    });

    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    return arquivo;
  }
}
