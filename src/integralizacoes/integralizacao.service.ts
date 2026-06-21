import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, Not } from 'typeorm';

import { CreateIntegralizacaoDto } from './dto/create-integralizacao.dto';
import { UpdateIntegralizacaoDto } from './dto/update-integralizacao.dto';

import { Integralizacao } from './entities/integralizacao.entity';

import { StatusIntegralizacao } from './enums/status-integralizacao.enum';

import { User } from 'src/auth/entities/user';

import { ParticipacoesService } from '../participacoes/participacoes.service';

@Injectable()
export class IntegralizacoesService {
  constructor(
    @InjectRepository(Integralizacao)
    private readonly integralizacoesRepository: Repository<Integralizacao>,

    private readonly participacoesService: ParticipacoesService,
  ) {}

  async create(
    createIntegralizacaoDto: CreateIntegralizacaoDto,
    user: User,
  ): Promise<Integralizacao> {

    const participacao =
      await this.participacoesService.findOne(
        createIntegralizacaoDto.participacaoId,
      );

    if (participacao.alunoId !== user.id) {
      throw new BadRequestException(
        'Você não pode integralizar uma participação de outro aluno.',
      );
    }

    const integralizacaoExistente =
      await this.integralizacoesRepository.findOne({
        where: {
          participacaoId:
            createIntegralizacaoDto.participacaoId,
          ativo: true,
        },
      });

    if (integralizacaoExistente) {
      throw new BadRequestException(
        'Já existe uma integralização para esta participação.',
      );
    }

    const integralizacao =
      this.integralizacoesRepository.create({
        ...createIntegralizacaoDto,
        alunoId: user.id,
        status: StatusIntegralizacao.EM_ABERTO,
        ativo: true,
      });

    return this.integralizacoesRepository.save(
      integralizacao,
    );
  }

  async findAll(): Promise<Integralizacao[]> {
    return this.integralizacoesRepository.find({
      where: {
        ativo: true,
        status: Not(
          StatusIntegralizacao.DESATIVADO,
        ),
      },
      order: {
        criadoEm: 'DESC',
      },
    });
  }

  async findOne(
    id: string,
  ): Promise<Integralizacao> {
    const integralizacao =
      await this.integralizacoesRepository.findOne({
        where: {
          id,
          ativo: true,
        },
      });

    if (!integralizacao) {
      throw new NotFoundException(
        'Integralização não encontrada.',
      );
    }

    return integralizacao;
  }

  async update(
    id: string,
    updateIntegralizacaoDto: UpdateIntegralizacaoDto,
  ): Promise<Integralizacao> {
    const integralizacao =
      await this.findOne(id);

    if (
      integralizacao.status ===
      StatusIntegralizacao.CONCLUIDO
    ) {
      throw new BadRequestException(
        'Não é possível alterar uma integralização concluída.',
      );
    }

    if (
      integralizacao.status ===
      StatusIntegralizacao.DESATIVADO
    ) {
      throw new BadRequestException(
        'Não é possível alterar uma integralização desativada.',
      );
    }

    Object.assign(
      integralizacao,
      updateIntegralizacaoDto,
    );

    return this.integralizacoesRepository.save(
      integralizacao,
    );
  }
}