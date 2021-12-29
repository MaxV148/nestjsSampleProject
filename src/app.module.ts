import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.lite',
      entities: [User, Report], //Entities
      synchronize: true, //nur für Dev, auto. migration, falls sich etwas bei den entities wärend der entwicklung ändert
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      //Global Pipe
      provide: APP_PIPE, //alle requests werden durch APP_PIPE an ValidationPipe weitergegeben
      useValue: new ValidationPipe({
        whitelist: true, //erlaubt nur was in den DTO's steht
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('APP_MODULE: ');
    //Global Middleware
    consumer
      .apply(
        cookieSession({
          keys: ['asdadawdawdwf'],
        }),
      )
      .forRoutes('*');
  }
}
