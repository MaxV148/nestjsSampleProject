import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { IAuthService, IUser, IUserService } from './UserInterfaces';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: Partial<IUserService>;
  let authServiceMock: Partial<Partial<IAuthService>>;

  beforeEach(async () => {
    usersServiceMock = {
      findOne(id: number): Promise<User> {
        return Promise.resolve({
          id,
          email: 'asda@sad.com',
          password: 'sadasd',
        } as User);
      },
      find(email: string): Promise<User[]> {
        return Promise.resolve([{ id: 1, email, password: 'asd' } as User]);
      },
    };
    authServiceMock = {
      signIn(email: string, password: string): Promise<User> {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users return a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });
  it('should find a single user by the id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('should thow an error if id is not found', async () => {
    usersServiceMock.findOne = (id: number) => null;
    await expect(controller.findUser('1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
  it('should signIn user, updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      {
        email: 'ada@asdsa.com',
        password: 'asdw2a23',
      },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
