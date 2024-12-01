import { Task, TaskId, TaskPriority, TaskStatus } from './types';

export class TaskEntity implements Task {
  public readonly id: TaskId;
  public title: string;
  public description?: string;
  public status: TaskStatus;
  public priority: TaskPriority;
  public dueDate?: Date;
  public tags?: Tag[];
  public readonly createdAt: Date;
  public updatedAt: Date;
  public assigneeId?: string;
  public readonly creatorId: string;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.priority = task.priority;
    this.dueDate = task.dueDate;
    this.tags = task.tags;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.assigneeId = task.assigneeId;
    this.creatorId = task.creatorId;
  }

  public update(updates: Partial<Omit<Task, 'id' | 'createdAt' | 'creatorId'>>) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }
} 