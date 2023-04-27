import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.admin.service';
import { AuthController } from './controller/auth.admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '@module/user/user';

@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: {
        expiresIn: '30 days',
      },
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
