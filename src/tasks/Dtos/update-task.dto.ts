import { TaskStatus } from '../tasks.model';
import { IsEnum } from 'class-validator';
export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
