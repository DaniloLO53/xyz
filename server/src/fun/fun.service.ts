import { Inject, Injectable } from '@nestjs/common';
import { ICustomToken, IFun } from './fun.interface';

@Injectable()
export class FunService {
  private readonly fun: IFun[] = [];
  private customToken: ICustomToken;

  constructor(@Inject('CUSTOMTOKEN') customToken: ICustomToken) {
    this.customToken = customToken;
  }

  findAll() {
    return this.fun;
  }

  findCustomTokenName() {
    return this.customToken;
  }
}
