import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { faker } from '@faker-js/faker';

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
  let usersController: UsersController;

  const mockUsersService = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    hashPassword: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('create', async () => {
    await usersController.create(createUserDto);

    expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('update', async () => {
    await usersController.update(updateUserDto, id);

    expect(mockUsersService.updateUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.updateUser).toHaveBeenCalledWith({
      id,
      ...updateUserDto,
    });
  });

  it('delete', async () => {
    await usersController.delete(id);

    expect(mockUsersService.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith(id);
  });
});
