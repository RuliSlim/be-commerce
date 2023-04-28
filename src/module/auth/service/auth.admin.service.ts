import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { AdminService } from '@root/module/user/services/user.admin.service';
import { Admin } from '@entity/user/entities/user.admin';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { BCrypt } from '@helper/bcrypt';
import { ApiBody } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    email: string,
    password: string,
    type: 'ADMIN' | 'CUSTOMER',
  ): Promise<Admin | null> {
    let user: Admin;
    if (type === 'ADMIN') {
      user = await this.adminService.findByEmail(email);
    }

    if (user && (await BCrypt.isMatch(password, user.password))) {
      return user;
    }

    return null;
  }

  @ApiBody({ type: CreateAuthDto })
  async create(createAuthDto: CreateAuthDto): Promise<string> {
    const user = await this.validateUserCredentials(
      createAuthDto.email,
      createAuthDto.password,
      'ADMIN',
    );
    if (!user) {
      throw new BadRequestException('email or password wrong');
    }

    console.log(user, 'ini apa?');
    // create jwt service
    const payloadJwt = {
      userName: user.email,
      sub: user.id,
    };

    const jwtOption: JwtSignOptions = {
      secret: 'secret',
      expiresIn: '30d',
    };

    const token = this.jwtService.sign(payloadJwt, jwtOption);
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
