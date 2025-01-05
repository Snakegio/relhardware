import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity('assignations')
export class Assignation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  user: string;

  @OneToMany(() => Item, (item) => item.assignation)
  items: Item[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  modificationDate: Date;

  @Column({ type: 'text', default: '' }) // Campo con default
  note: string;
}
