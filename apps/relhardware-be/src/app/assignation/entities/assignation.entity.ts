import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../item/entities/item.entity';

@Entity('assignations')
export class Assignation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, eager: true })
  user: User;

  @ManyToOne(() => Item, { nullable: false, eager: true })
  item: Item;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  modificationDate: Date;

  @Column({ type: 'text', default: '' }) // Campo con default
  note: string;
}
