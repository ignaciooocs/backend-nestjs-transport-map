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
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
