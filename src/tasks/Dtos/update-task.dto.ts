import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';
export class UpdateTaskStatus {
  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
