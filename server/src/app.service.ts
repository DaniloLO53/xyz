import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './cats.dto';

@Injectable()
export class AppService {
  getBreeds(): string {
    return 'Hello World!';
  }

  createCats(createCat: CreateCatDto): CreateCatDto {
    return createCat;
  }
}
