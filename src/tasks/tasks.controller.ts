import { Body, Controller, Param, Post, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { CreateTask } from './Dtos/create-task.dto';
// import { UpdateTaskStatus } from './Dtos/update-task.dto';
import { TasksFilterDto } from './Dtos/get-tasks-filter';
import { Task } from './tasks.entity';
@Controller('tasks')
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
}
