import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTask } from './Dtos/create-task.dto';
import { UpdateTaskStatus } from './Dtos/update-task.dto';
import { TasksFilterDto } from './Dtos/get-tasks-filter';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filters: TasksFilterDto): Task[] {
    return this.taskService.getAllTasks(filters);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.taskService.GetTaskById(id);
  }
  @Post()
  createTask(@Body() createTask: CreateTask) {
    console.log('createTask', createTask);
    return this.taskService.AddTask(createTask);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatus,
  ): Task | undefined {
    return this.taskService.UpdateTaskStatus(id, status);
  }
}
