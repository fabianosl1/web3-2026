import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { UpdateParticipacaoDto } from './dto/update-participacao.dto';
import { Participacao } from './entities/participacao.entity';
import { StatusParticipacao } from './enums/status-participacao.enum';
import { User } from 'src/auth/entities/user';
import { ArquivosService } from '../arquivos/arquivos.service';
import { CreateArquivoDto } from '../arquivos/dto/create-arquivo.dto';
import { Arquivo } from '../arquivos/entities/arquivo.entity';

@Injectable()
export class ParticipacoesService {
  constructor(
    @InjectRepository(Participacao)
    private readonly participacoesRepository: Repository<Participacao>,
    private readonly arquivosService: ArquivosService,
  ) {}

  async create(
    createParticipacaoDto: CreateParticipacaoDto,
    user: User,
  ): Promise<Participacao> {
    const participacao = this.participacoesRepository.create({
      ...createParticipacaoDto,
      alunoId: user.id,
      status: StatusParticipacao.EM_ABERTO,
      ativo: true,
    });

    return this.participacoesRepository.save(participacao);
  }

  async findAll(): Promise<Participacao[]> {
    return this.participacoesRepository.find({
      where: {
        ativo: true,
        status: Not(StatusParticipacao.DESATIVADO),
      },
      order: { criadoEm: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Participacao> {
    const participacao = await this.participacoesRepository.findOne({
      where: {
        id,
        ativo: true,
      },
    });

    if (!participacao) {
      throw new NotFoundException('Participação não encontrada.');
    }

    return participacao;
  }

  async update(
    id: string,
    updateParticipacaoDto: UpdateParticipacaoDto,
  ): Promise<Participacao> {
    const participacao = await this.findOne(id);

    if (participacao.status === StatusParticipacao.CONCLUIDO) {
      throw new BadRequestException(
        'Não é possível alterar uma participação concluída.',
      );
    }

    if (participacao.status === StatusParticipacao.DESATIVADO) {
      throw new BadRequestException(
        'Não é possível alterar uma participação desativada.',
      );
    }

    Object.assign(participacao, updateParticipacaoDto);

    return this.participacoesRepository.save(participacao);
  }

  async anexarArquivo(
    id: string,
    createArquivoDto: CreateArquivoDto,
    user: User,
  ): Promise<Arquivo> {
    const participacao = await this.findOne(id);

    if (participacao.alunoId !== user.id) {
      throw new BadRequestException(
        'Você não pode anexar um arquivo em uma participação de outro aluno.',
      );
    }

    const arquivo = await this.arquivosService.create(createArquivoDto, user);

    participacao.arquivoId = arquivo.id;
    await this.participacoesRepository.save(participacao);

    return arquivo;
  }

  async remove(id: string): Promise<void> {
    const participacao = await this.findOne(id);

    if (participacao.status === StatusParticipacao.CONCLUIDO) {
      throw new BadRequestException(
        'Não é possível desativar uma participação concluída.',
      );
    }

    participacao.ativo = false;
    participacao.status = StatusParticipacao.DESATIVADO;

    await this.participacoesRepository.save(participacao);
  }
}
