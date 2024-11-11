import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseAdminService {
    constructor(
        @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App
    ){}

    async verifyIdToken(token: string) {
        return await this.firebaseApp.auth().verifyIdToken(token);
    }
}
