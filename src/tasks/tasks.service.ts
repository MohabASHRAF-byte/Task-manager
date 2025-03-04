import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { CreateTask } from './Dtos/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksFilterDto } from './Dtos/get-tasks-filter';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async GetTasks(filter: TasksFilterDto): Promise<Task[]> {
    const { status, search } = filter;
    const query = this.taskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
  async AddTask(createTask: CreateTask): Promise<Task> {
    const { title, description } = createTask;

    const task: Task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
  async GetTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }
  async DeleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
  async UpdateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.GetTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
