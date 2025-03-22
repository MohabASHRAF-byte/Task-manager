import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../tasks-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class TasksFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
