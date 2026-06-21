import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusIntegralizacao } from '../enums/status-integralizacao.enum';

@Entity('integralizacoes')
export class Integralizacao {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  participacaoId!: string;

  @Column()
  alunoId!: string;

  @Column({ type: 'int' })
  cargaHorariaReal!: number;

  @Column()
  certificadoPdf!: string;

  @Column({
    type: 'enum',
    enum: StatusIntegralizacao,
    default: StatusIntegralizacao.EM_ABERTO,
  })
  status!: StatusIntegralizacao;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;

  @DeleteDateColumn()
  deletadoEm?: Date;
}