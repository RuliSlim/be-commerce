import { Category } from '@entity/category/entities/category';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];
}
