import { Module, Global, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAdminService } from './firebase-admin.service';
import * as fs from 'fs';
@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = JSON.parse(
          fs.readFileSync('./transport-map-31a5f-firebase-adminsdk-94fwk-a0ca4580ff.json', 'utf8')
        );
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
      } 
    },
    FirebaseAdminService
  ],
  exports: ['FIREBASE_ADMIN', FirebaseAdminService]
})
export class FirebaseAdminModule {}
