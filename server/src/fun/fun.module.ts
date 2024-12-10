import { Module } from '@nestjs/common';
// import { FunService } from './fun.service';
import { FunController } from './fun.controller';

const customToken = Symbol('CUSTOMTOKEN');
const customValue = {
  name: 'custom',
  version: '1.10',
};

@Module({
  controllers: [FunController],
  providers: [
    {
      provide: customToken,
      useValue: customValue,
      //   useClass: FunService,
    },
  ],
})
export class FunModule {}
