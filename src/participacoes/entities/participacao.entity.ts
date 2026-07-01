import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusParticipacao } from '../enums/status-participacao.enum';

@Entity('participacoes')
export class Participacao {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  alunoId!: string;

  @Column({ length: 120 })
  titulo!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ type: 'text' })
  atribuicoesPrevistas!: string;

  @Column({ type: 'int' })
  cargaHorariaPrevista!: number;

  @Column({ nullable: true })
  arquivoId?: string;

  @Column({
    type: 'enum',
    enum: StatusParticipacao,
    default: StatusParticipacao.EM_ABERTO,
  })
  status!: StatusParticipacao;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  criadoEm!: Date;

  @UpdateDateColumn()
  atualizadoEm!: Date;

  @DeleteDateColumn()
  deletadoEm?: Date;
}
