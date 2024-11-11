import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { ReportModule } from './report/report.module';
import { CommentModule } from './comment/comment.module';
import { envs } from 'config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(envs.databaseUri),
    UserModule,
    FirebaseAdminModule,
    ReportModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
