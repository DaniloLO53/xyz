import { Controller, Get } from '@nestjs/common';
import { FunService } from './fun.service';
import { IFun } from './fun.interface';

@Controller('fun')
export class FunController {
  constructor(private funService: FunService) {}

  @Get()
  async findAll(): Promise<IFun[]> {
    return this.funService.findAll();
  }
}
