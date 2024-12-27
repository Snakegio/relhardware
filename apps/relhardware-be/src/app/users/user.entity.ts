import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('users') // Nome della tabella come nel database
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  surname: string;

  @CreateDateColumn({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @UpdateDateColumn({ name: 'modification_date', type: 'timestamp' })
  modificationDate: Date;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: false })
  enable: boolean;

  @Column({ name: 'enable_internet', type: 'boolean', default: false })
  enableInternet: boolean;

  @Column({ name: 'pdf_report', type: 'bigint', nullable: true })
  pdfReport: number | null;

  @ManyToMany(() => Role, (role) => role.users, { eager: true, cascade: true })
  @JoinTable({
    name: 'user_roles', // Nome della tabella di join
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
