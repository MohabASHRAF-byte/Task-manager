import { TaskStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';
export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
