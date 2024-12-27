import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'boolean', default: false })
  modify: boolean;

  @Column({ type: 'boolean', default: false })
  read_pdf: boolean;

  @Column({ type: 'boolean', default: false })
  read_history: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
