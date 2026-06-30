import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('arquivos')
export class Arquivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 150 })
  mimeType: string;

  @Column({ type: 'int' })
  tamanho: number;

  @Column({ type: 'text' })
  conteudoBase64: string;

  @Column({ nullable: true })
  proprietarioId?: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  deletadoEm?: Date;
}
