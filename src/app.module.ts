import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { ReportModule } from './report/report.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@127.0.0.1:27017/test?authSource=admin'),
    UserModule,
    FirebaseAdminModule,
    ReportModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
