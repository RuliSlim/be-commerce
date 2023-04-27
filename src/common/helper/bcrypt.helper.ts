import * as bcrypt from 'bcrypt';

export class BCrypt {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async isMatch(
    inputPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashPassword);
  }
}
