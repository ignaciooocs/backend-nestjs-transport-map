import { HttpException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from './entities/report.entity';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<Report>,
    private readonly userService: UserService,
    private readonly commentService: CommentService
  ) {}
  async create(createReportDto: CreateReportDto, email: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    if (user) {
      const report = await this.reportModel.create({ ...createReportDto, user: user._id });
      console.log(report);
      return await report.save();
    }
    return null;
  }

  findAll() {
    return this.reportModel.find().exec();
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('report not found', 404);
      
      const report = await this.reportModel.findById(id).exec();
      if (!report) throw new HttpException('report not found', 404);

      const user = await this.userService.findOne(report.user.toString());
      if (!user) throw new HttpException('user not found', 404);

      return {...report.toObject(), emailUser: user.email};
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('report not found', 404);

      const report = await this.reportModel.updateOne({ _id: id }, updateReportDto);
      if (!report) throw new HttpException('report not found', 404);
      return report;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('report not found', 404);

      const report = await this.reportModel.deleteOne({ _id: id });
      if (report.deletedCount === 1) {
        return await this.commentService.remove(id);
      }
      return report;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
