import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

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
  providers: [AppService],
})
export class AppModule {}
