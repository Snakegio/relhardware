import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  surname: string;

  @Column({
    name: 'creation_date',
    default: () => 'NOW()',
  })
  creationDate: Date;

  @Column({
    name: 'modification_date',
    default: () => 'NOW()',
  })
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

  @ManyToMany(() => Roles, (role) => role.users, { eager: true, cascade: true })
  @JoinTable({
    name: 'user_roles', // Nome della tabella di join
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Roles[];
}
