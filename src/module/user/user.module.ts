import { Module } from '@nestjs/common';
import { AdminService } from './services/user.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/user.admin.entity';
import { AdminRepository } from './repositories/user.admin.repository';
import { AdminController } from './controllers/user.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
