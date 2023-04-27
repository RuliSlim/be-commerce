import { AdminRole } from '@common/shared/constant/admin.enum';
import { DefaultColumn } from '@common/shared/entities/default.entity';
import { Store } from '@entity/store/entities/store';
import { BCrypt } from '@helper/bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Store, (store) => store.admins)
  store: Store;

  @BeforeInsert()
  async hashingPassword() {
    const hashedPassword = await BCrypt.hashPassword(this.password);
    this.password = hashedPassword;
  }
}
