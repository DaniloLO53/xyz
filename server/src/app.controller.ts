import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './cats.dto';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('docs')
  @Redirect('https://nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    return { url: `https://docs.nestjs.com/v/${version || 'latest'}` };
  }

  @Get('breeds/:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} breed`;
  }

  @Get('breeds')
  getCats(): string {
    return this.appService.getBreeds();
  }

  @Post()
  createCats(@Body() createCat: CreateCatDto): CreateCatDto {
    return this.appService.createCats(createCat);
  }
}
