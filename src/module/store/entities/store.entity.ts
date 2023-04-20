import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from '@entity/category/entities/category';
import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Admin } from '@entity/admin/entities/admin';

@Entity('store')
export class Store extends DefaultColumn {
  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];

  @OneToMany(() => Admin, (admin) => admin.store)
  admins: Admin[];
}
