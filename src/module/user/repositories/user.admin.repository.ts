import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Admin } from '../entities/user.admin.entity';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.findOneBy({
      email,
    });

    return admin;
  }
}
