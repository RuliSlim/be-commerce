import { AdminRole } from '@common/shared/constant/admin.enum';
import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Store } from '@entity/store/entities/store';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Admin extends DefaultColumn {
  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  @ApiProperty({ required: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  @ApiProperty({ required: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', enum: AdminRole })
  role: AdminRole;

  @OneToMany(() => Store, (store) => store.admins)
  store: Store;
}
