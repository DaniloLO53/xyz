import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('ON VALIDATE - local.strategy');
    const jwtToken = await this.authService.signIn({
      email,
      password,
    });
    console.log({ jwtToken });
    return jwtToken;
  }
}
