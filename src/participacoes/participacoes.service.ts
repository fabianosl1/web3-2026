import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participacao } from './entities/participacao.entity';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { UpdateParticipacaoDto } from './dto/update-participacao.dto';
import { StatusParticipacao } from './enums/status-participacao.enum';

@Injectable()
export class ParticipacoesService {
  constructor(
    @InjectRepository(Participacao)
    private readonly participacoesRepository: Repository<Participacao>,
  ) {}

  async create(createParticipacaoDto: CreateParticipacaoDto): Promise<Participacao> {
    const participacao = this.participacoesRepository.create(createParticipacaoDto);
    return this.participacoesRepository.save(participacao);
  }

  async findAll(): Promise<Participacao[]> {
    return this.participacoesRepository.find({
      where: { ativo: true },
      order: { criadoEm: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Participacao> {
    const participacao = await this.participacoesRepository.findOne({
      where: { id, ativo: true },
    });

    if (!participacao) {
      throw new NotFoundException('Participação não encontrada');
    }

    return participacao;
  }

  async update(
    id: string,
    updateParticipacaoDto: UpdateParticipacaoDto,
  ): Promise<Participacao> {
    const participacao = await this.findOne(id);

    Object.assign(participacao, updateParticipacaoDto);

    return this.participacoesRepository.save(participacao);
  }

  async remove(id: string): Promise<void> {
    const participacao = await this.findOne(id);

    participacao.ativo = false;
    participacao.status = StatusParticipacao.DESATIVADO;

    await this.participacoesRepository.save(participacao);
  }
}