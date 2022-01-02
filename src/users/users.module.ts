import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //Erstellt das Repository
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    /*    {
      provide: APP_INTERCEPTOR, //globaler interceptor wird in jedem controller aufgerufen
      useClass: CurrentUserInterceptor,
    },*/
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
