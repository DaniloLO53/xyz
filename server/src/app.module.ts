import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { FunModule } from './fun/fun.module';

@Module({
  imports: [DrizzleModule, FunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
