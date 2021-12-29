import { User } from './user.entity';
export interface IUser {
  id: number;
  email: string;
  password: string;
}
export interface IUserService {
  create(email: string, password: string): Promise<User>;
  findOne(id: number): Promise<User>;
  find(email: string): Promise<User[]>;
  update(id: number, attrs: Partial<User>): Promise<User>;
  remove(id: number): Promise<User>;
}

export interface IAuthService {
  signUp(email: string, password: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
}
