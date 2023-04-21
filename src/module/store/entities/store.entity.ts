import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from '@entity/category/entities/category';
import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Admin } from '@entity/admin/entities/admin';
import { ApiProperty } from '@nestjs/swagger';

@Entity('store')
export class Store extends DefaultColumn {
  @Column()
  @ApiProperty({ required: true, nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  description: string;

  @OneToMany(() => Category, (category) => category.store)
  @ApiProperty({
    type: [Category],
    nullable: true,
  })
  categories: Category[];

  @OneToMany(() => Admin, (admin) => admin.store)
  @ApiProperty({
    type: [Admin],
    nullable: true,
  })
  admins: Admin[];
}
