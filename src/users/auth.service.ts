import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import * as Buffer from 'buffer';

//oder bycrypt
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //See if email is in use
    const user = await this.userService.find(email);
    if (user.length > 0) {
      throw new BadRequestException('email in use');
    }

    //Hash users password

    //Genrate a salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    //create a new user and save it
    const newUser = await this.userService.create(email, result);

    //return the user
    return newUser;
  }
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');

    //rehash

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
