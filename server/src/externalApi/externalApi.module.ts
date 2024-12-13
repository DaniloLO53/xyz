import { Module } from '@nestjs/common';
import { ExternalApiController } from './externalApi.controller';
import { ExternalApiService } from './externalApi.service';

@Module({
  controllers: [ExternalApiController],
  providers: [ExternalApiService],
})
export class ExternalApiModule {}
