/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({ email, password }: CreateUserDto) {
    const [existingUser] = await this.userService.findUserByEmail(email);

    if (!existingUser) {
      throw new HttpException("Incorrect user's data", HttpStatus.UNAUTHORIZED);
    }
    const passwordIsValid = this.validPassword(
      password,
      existingUser.password,
      existingUser.salt,
    );

    if (passwordIsValid) {
      const { password, salt, id, ...user } = existingUser;
      return { accessToken: this.jwtService.sign(user) };
    }
    throw new HttpException("Incorrect user's data", HttpStatus.UNAUTHORIZED);
  }

  validPassword(password: string, hash: string, salt: string) {
    const checkHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return hash === checkHash;
  }
}
