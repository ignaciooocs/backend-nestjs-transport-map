import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Report extends Document {

    @Prop({ required: true })
    longitude: number

    @Prop({ required: true })
    latitude: number

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop({ 
        required: true, 
        default: 'OTRO', 
        enum: ['BUS', 'MICRO', 'METRO', 'BUSMETRO', 'TAXI', 'OTRO'] 
    })
    type: string

    @Prop({ required: true })
    date: Date

    @Prop({ required: true, ref: 'User' })
    user: Types.ObjectId

    @Prop({ required: true })
    from: string

    @Prop({ required: true })
    to: string

    @Prop({ required: true, default: false })
    seats: boolean

    @Prop({ required: true, default: 0 })
    quantitySeats: number

    @Prop()
    numberVehicle: number

    @Prop({ required: true })
    direccion: string
}

export const ReportSchema = SchemaFactory.createForClass(Report)