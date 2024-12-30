import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from '../../item-type/entities/item-type.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ItemType, { nullable: false, eager: true }) // Relazione con item_types
  itemType: ItemType;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  internalCode: string;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  model: string;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  serviceTag: string;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  company: string;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  contract: string;

  @Column({ type: 'boolean', default: false }) // Campo booleano con default
  dockingStation: boolean;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  productNumber: string;

  @Column({ type: 'text', nullable: true }) // Campo nullable
  macAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Default a CURRENT_TIMESTAMP
  creationDate: Date;

  @Column({ type: 'timestamp', nullable: true }) // Campo nullable
  modificationDate: Date;

  @ManyToOne(() => Company, { nullable: false, eager: true }) // Relazione con company
  idCompany: Company;
}
