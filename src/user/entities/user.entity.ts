import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({ required: false })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: false})
    username: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)