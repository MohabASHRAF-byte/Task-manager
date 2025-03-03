import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTask } from './Dtos/create-task.dto';
import { UpdateTaskStatus } from './Dtos/update-task.dto';
import { TasksFilterDto } from './Dtos/get-tasks-filter';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(filters: TasksFilterDto): Task[] {
    let tasks = this.tasks;
    const { status, search } = filters;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  AddTask(createTask: CreateTask): Task {
    const { title, description } = createTask;
    console.log('title', title);
    console.log('description', description);
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  GetTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id == id);
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  UpdateTaskStatus(updateTaskStatus: UpdateTaskStatus): Task | undefined {
    const { id, status } = updateTaskStatus;
    const task = this.GetTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }
}
