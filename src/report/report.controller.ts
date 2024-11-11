import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(
    @Body() createReportDto: CreateReportDto, 
    @Req() { user }: { user: { email: string } }
  ) {
    return this.reportService.create(createReportDto, user.email);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  // @UseGuards(FirebaseAuthGuard)
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }
}
