import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @IsLatitude()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsLongitude()
    @IsNotEmpty()
    longitude: number;

    @IsNotEmpty()
    @IsString()
    title: string
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(
        ['BUS', 'MICRO', 'METRO', 'BUSMETRO', 'TAXI', 'OTRO'], 
        { message: 'El tipo de vehiculo no es válido' }
    )
    type: string;

    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    @IsNotEmpty()
    @IsBoolean()
    seats: boolean;

    @IsNotEmpty()
    @IsNumber()
    quantitySeats: number;

    @IsNotEmpty()
    @IsNumber()
    numberVehicle: number;

    @IsNotEmpty()
    @IsString()
    direccion: string;

    @IsNotEmpty()
    date: Date
}
