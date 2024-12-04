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
    try {
      const user = await this.userService.findByEmail(email);
  
      if (user) {
        // Configurar el tiempo de expiración (por ejemplo, 24 horas)
        // const expirationTime = 60 * 1000 * 60 * 24;
        const expiresAt = new Date(Date.now() + createReportDto.expirationTime);
  
        // Generar el campo geoespacial `location`
        const location = {
          type: 'Point',
          coordinates: [createReportDto.longitude, createReportDto.latitude],
        };
  
        // Crear el reporte con `location` y `expiresAt`
        const report = await this.reportModel.create({
          ...createReportDto,
          user: user._id,
          expiresAt,
          location, // Añadimos el campo de ubicación geoespacial
        });
  
        return await report.save();
      }
      return null;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
  
  async findNearby(longitude: number, latitude: number, maxDistance: number = 5000) {
    try {
      return await this.reportModel.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance, // Distancia máxima en metros
          },
        },
      }).exec();
    } catch (error) {
      throw new HttpException('Error finding nearby reports: ' + error.message, 500);
    }
  }

  findAll() {
    return this.reportModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(id)) throw new HttpException('report not found', 404);
      
      const report = await this.reportModel.findById(id).exec();
      if (!report) throw new HttpException('report not found', 404);

      const user = await this.userService.findOne(report.user.toString());
      if (!user) throw new HttpException('user not found', 404);

      return {...report.toObject(), emailUser: user.email };
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Report not found', 404);
      }
  
      // Crear el objeto `location` a partir de latitude y longitude
      const location = {
        type: 'Point',
        coordinates: [updateReportDto.longitude, updateReportDto.latitude], // Usar las coordenadas proporcionadas
      };
  
      // Construir el objeto con los nuevos datos, incluyendo `expiresAt` y `location`
      const updatedData = {
        ...updateReportDto,
        location, // Asignar el objeto `location` creado
      };
  
      // Actualizar el reporte en la base de datos
      const result = await this.reportModel.updateOne({ _id: id }, updatedData);
  
      if (result.modifiedCount === 0) {
        throw new HttpException('Report not found or not modified', 404);
      }
  
      return { message: 'Report updated successfully', updated: result };
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
