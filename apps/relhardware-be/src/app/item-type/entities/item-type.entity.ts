import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_types')
export class ItemType {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar' })
  name: string;
}
