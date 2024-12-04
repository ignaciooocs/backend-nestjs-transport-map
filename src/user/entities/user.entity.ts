import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({ required: false })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: false})
    username: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: 5000 })
    maxDistance: number
}

export const UserSchema = SchemaFactory.createForClass(User)