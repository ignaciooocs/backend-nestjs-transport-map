import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Report extends Document {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  // Campo geoespacial para las consultas
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    default: 'OTRO',
    enum: ['BUS', 'MICRO', 'METRO', 'BUSMETRO', 'TAXI', 'OTRO'],
  })
  type: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true, default: false })
  seats: boolean;

  @Prop({ required: true, default: 0 })
  quantitySeats: number;

  @Prop()
  numberVehicle: number;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true })
  expirationTime: number;

  // Campo de expiración
  @Prop({ required: true })
  expiresAt: Date;
}

const ReportSchema = SchemaFactory.createForClass(Report);

// Crear índice TTL para expiración
ReportSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Crear índice geoespacial
ReportSchema.index({ location: '2dsphere' });

export { ReportSchema };
