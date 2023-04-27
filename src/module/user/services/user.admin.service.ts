import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminRepository } from '../repositories/user.admin.repository';
import { Admin } from '../entities/user.admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const store = await this.adminRepository.create(createAdminDto);
    await this.adminRepository.save(store);
    return store;
  }

  async findAll(): Promise<Admin[]> {
    const users = await this.adminRepository.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findByEmail(email);
    return admin;
  }
}
