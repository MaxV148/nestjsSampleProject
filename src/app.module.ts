import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true, //nur für Dev, auto. migration, falls sich etwas bei den entities wärend der entwicklung ändert
          entities: [User, Report], //Entities
        };
      },
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
