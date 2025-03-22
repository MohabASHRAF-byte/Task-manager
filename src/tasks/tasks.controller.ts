import {
  Body,
  Controller,
  Param,
  Post,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { CreateTask } from './Dtos/create-task.dto';
import { UpdateTaskStatus } from './Dtos/update-task.dto';
import { TasksFilterDto } from './Dtos/get-tasks-filter';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.GetTaskById(id);
  }
  @Post()
  async createTask(@Body() createTask: CreateTask) {
    return await this.taskService.AddTask(createTask);
  }
  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.taskService.DeleteTask(id);
  }
  @Get()
  async getTasks(@Query() filter: TasksFilterDto): Promise<Task[]> {
    return await this.taskService.GetTasks(filter);
  }
  @Put('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
  ): Promise<Task> {
    return await this.taskService.UpdateTaskStatus(id, updateTaskStatus.status);
  }
}
