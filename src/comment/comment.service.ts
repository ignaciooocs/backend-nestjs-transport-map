import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class CommentService {

  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ReportService))
    private readonly reportService: ReportService,
  ) {}
  
  async create(createCommentDto: CreateCommentDto, email: string) {
    try {
      const userFound = await this.userService.findByEmail(email);
      if (!userFound) throw new HttpException('user not found', 404);
  
      // Obtener el reporte utilizando el ID que viene en createCommentDto
      const report = await this.reportService.findOne(createCommentDto.report);
      if (!report) throw new HttpException('report not found', 404);
  
      // Crear el comentario, incluyendo el expiresAt del reporte
      const comment = await this.commentModel.create({
        ...createCommentDto,
        user: userFound._id,
        expiresAt: report.expiresAt, // Asignamos el expiresAt del reporte
      });
  
      // Guardamos el comentario
      return await comment.save();
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
  

  find() {
    return this.commentModel.find().exec();
  }

  async findAll(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('messages not found', 404);
      const comments = await this.commentModel.find({ report: id }).sort({ date: -1 }).exec();
      return comments;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('message not found', 404);
      return this.commentModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('message not found', 404);
      return this.commentModel.updateOne({ _id: id }, updateCommentDto);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('message not found', 404);
      return this.commentModel.deleteMany({ report: id });
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
