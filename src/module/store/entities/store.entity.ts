import {
  BeforeInsert,
  Column,
  Entity,
  InsertEvent,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '@entity/category/entities/category';
import { DefaultColumn } from '@common/shared/entities/default.entity';

@Entity('store')
export class Store extends DefaultColumn {
  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];
}
