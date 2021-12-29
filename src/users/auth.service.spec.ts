import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { stat } from 'fs';
import { User } from './user.entity';
import DoneCallback = jest.DoneCallback;
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IUserService } from './UserInterfaces';

//Beschreibung des Tests
describe('AuthService', () => {
  let service: AuthService;
  let userServiceMock: Partial<IUserService>;

  //Vor jedem Test ausführen
  beforeEach(async () => {
    //Create a fake copy of the users service
    const users: User[] = [];
    userServiceMock = {
      find(email: string): Promise<User[]> {
        const filerUser = users.filter((user) => user.email === email);
        return Promise.resolve(filerUser);
      },
      create(email: string, password: string): Promise<User> {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      //List of things we want to register in our testing DI container
      providers: [
        AuthService,
        {
          provide: UsersService, //AuthService braucht UserService
          useValue: userServiceMock, //Fake methode die für USerService genutzt werden sollen
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const user = await service.signUp('sadasd@sad.com', 'asd');

    expect(user.password).not.toEqual('asd'); //passwort soll hashed sein
    const [salt, hash] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });

  it('should thows an error if user signup with email that is in use', async () => {
    expect.assertions(1);
    await service.signUp('asd@asd.com', '');

    await expect(service.signUp('asd@asd.com', '')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should thow an error if signin is called with an unused email', async () => {
    expect.assertions(1);
    await expect(
      service.signIn('asda@sad.com', 'asfj2'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should thow an error is an invalid password is provided', async () => {
    expect.assertions(1);
    await service.signUp('test@test.com', 'password');
    await expect(
      service.signIn('test@test.com', 'PASSWORD123'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should return a user if correct pasword is provided', async () => {
    expect.assertions(1);
    await service.signUp('asd@asd.com', 'mypassword');
    const user = await service.signIn('asd@asd.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
