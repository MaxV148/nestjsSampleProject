import { Injectable, NotFoundException } from '@nestjs/common';
import { IReportService } from './report_interfaces';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService implements IReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    //Association intern wird nur die ID genutzt
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
