import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { faker } from '@faker-js/faker';
import { DRIZZLE } from '../drizzle/drizzle.module';

describe('UsersController', () => {
  const createUserDto: CreateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const updateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const id = faker.number.int().toString();
  let usersService: UsersService;

  const mockUsersService = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    hashPassword: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
  };
  const db = {
    insert: {
      values: jest.fn(),
    },
    update: {
      set: jest.fn(),
    },
    delete: {
      where: jest.fn(),
    },
    select: {
      from: {
        where: jest.fn(),
      },
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: DRIZZLE, useValue: db }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  // describe('createUser', () => {
  //   it('should verify if user already exists', async () => {
  //     await usersService.createUser(createUserDto);
  //   });
  // });
});
