import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateCourseDto {
  @Length(3, 32)
  name: string;

  @Length(10, 255)
  description: string;

  @Length(3, 32)
  level: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
