import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestContext } from 'nestjs-request-context';

export class DefaultColumn extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Column({ nullable: true, type: 'timestamp' })
  updatedAt: string;

  @Column({ nullable: true, type: 'timestamp' })
  createdByCustomerId: string;

  @Column({ nullable: true, type: 'timestamp' })
  createdByAdminId: string;

  @BeforeInsert()
  beforeInsert() {
    const request = RequestContext.currentContext;
    if (request.req.decoded) {
      // if admin put in adminid
      // if customer put in customerid
    }
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
