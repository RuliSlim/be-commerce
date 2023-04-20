import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Store } from '@entity/store/entities/store';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends DefaultColumn {
  @ManyToOne(() => Store, (store) => store.categories)
  store: Store;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @Column()
  name: string;

  @Column('text')
  description: string;
}
