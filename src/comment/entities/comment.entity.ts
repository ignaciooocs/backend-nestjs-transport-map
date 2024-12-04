import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, ref: 'User' })
    user: Types.ObjectId;

    @Prop({ required: true, ref: 'Report' })
    report: Types.ObjectId;

    @Prop({ required: true })
    expiresAt: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

// Crear índice TTL en el campo expiresAt para eliminación automática
CommentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export { CommentSchema };
