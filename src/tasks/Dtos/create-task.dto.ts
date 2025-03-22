import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTask {
  @IsNotEmpty()
  @ApiProperty({ example: 'Learn Moamen How to code' })
  title: string;
  @ApiProperty({
    example:
      'private session for eng moamen who works in beyond creation to learn how to code ',
  })
  @IsNotEmpty()
  description: string;
}
