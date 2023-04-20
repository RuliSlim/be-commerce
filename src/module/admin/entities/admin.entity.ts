import { AdminRole } from '@common/shared/constant/admin.enum';
import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Store } from '@entity/store/entities/store';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Admin extends DefaultColumn {
  @Column({
    nullable: false,
    type: 'string',
    unique: true,
  })
  email: string;

  @Column('string')
  password: string;

  @Column('string')
  name: string;

  @Column({ type: 'string', enum: AdminRole })
  role: AdminRole;

  @OneToMany(() => Store, (store) => store.admins)
  store: Store;
}
