import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { IUser } from '../UserInterfaces';
//update interface
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    //Gehe zu Express lib finde Request interface
    interface Request {
      currentUser?: IUser; //falls currentUser ist def. ist es vom type User
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);

      req.currentUser = user;
    }
    next();
  }
}
