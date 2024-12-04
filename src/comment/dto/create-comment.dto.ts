import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    report: string;

    @IsNotEmpty()
    date: Date
}
