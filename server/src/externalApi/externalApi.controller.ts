import { Controller, Get } from '@nestjs/common';
import { ExternalApiService } from './externalApi.service';

@Controller('external')
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get('fear_and_greed')
  fearAndGreed() {
    return this.externalApiService.fearAndGreed();
  }
}
